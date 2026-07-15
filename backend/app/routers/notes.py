from datetime import date, datetime, time
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_
from sqlalchemy.orm import Session, selectinload

from app.database import get_db
from app.models.note import KnowledgePoint, Note, Tag
from app.schemas.note import NoteCreate, NoteListResponse, NoteRead, NoteUpdate

router = APIRouter(prefix="/api/notes", tags=["notes"])


def get_note_or_404(db: Session, note_id: int) -> Note:
    note = (
        db.query(Note)
        .options(selectinload(Note.knowledge_points), selectinload(Note.tags))
        .filter(Note.id == note_id)
        .first()
    )
    if note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    return note


def get_or_create_tags(db: Session, tag_names: List[str]) -> List[Tag]:
    tags: List[Tag] = []
    seen_names: set[str] = set()

    for name in tag_names:
        tag_name = name.strip()
        if not tag_name or tag_name in seen_names:
            continue

        tag = db.query(Tag).filter(Tag.name == tag_name).first()
        if tag is None:
            tag = Tag(name=tag_name)
            db.add(tag)
            db.flush()

        tags.append(tag)
        seen_names.add(tag_name)

    return tags


def build_knowledge_points(contents: List[str]) -> List[KnowledgePoint]:
    return [
        KnowledgePoint(content=content, order_index=index)
        for index, content in enumerate(contents)
        if content.strip()
    ]


@router.post("", response_model=NoteRead, status_code=status.HTTP_201_CREATED)
def create_note(note_in: NoteCreate, db: Session = Depends(get_db)) -> Note:
    note = Note(
        title=note_in.title,
        summary=note_in.summary,
        original_content=note_in.original_content,
        source=note_in.source,
        knowledge_points=build_knowledge_points(note_in.knowledge_points),
        tags=get_or_create_tags(db, note_in.tags),
    )

    db.add(note)
    db.commit()
    return get_note_or_404(db, note.id)


@router.get("", response_model=NoteListResponse)
def list_notes(
    q: Optional[str] = None,
    tag: Optional[str] = None,
    source: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=100),
    db: Session = Depends(get_db),
) -> NoteListResponse:
    query = db.query(Note)

    if q:
        keyword_text = q.strip()
        if keyword_text:
            keyword = f"%{keyword_text}%"
            query = query.filter(
                or_(
                    Note.title.ilike(keyword),
                    Note.summary.ilike(keyword),
                    Note.original_content.ilike(keyword),
                    Note.knowledge_points.any(KnowledgePoint.content.ilike(keyword)),
                    Note.tags.any(Tag.name.ilike(keyword)),
                )
            )

    if tag:
        query = query.filter(Note.tags.any(Tag.name == tag.strip()))

    if source:
        query = query.filter(Note.source == source.strip())

    if start_date:
        query = query.filter(Note.created_at >= datetime.combine(start_date, time.min))

    if end_date:
        query = query.filter(Note.created_at <= datetime.combine(end_date, time.max))

    total = query.with_entities(func.count(Note.id)).scalar() or 0
    notes = (
        query
        .options(selectinload(Note.tags))
        .order_by(Note.created_at.desc(), Note.id.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )

    return NoteListResponse(items=notes, total=total, page=page, page_size=page_size)


@router.get("/{note_id}", response_model=NoteRead)
def get_note(note_id: int, db: Session = Depends(get_db)) -> Note:
    return get_note_or_404(db, note_id)


@router.put("/{note_id}", response_model=NoteRead)
def update_note(note_id: int, note_in: NoteUpdate, db: Session = Depends(get_db)) -> Note:
    note = get_note_or_404(db, note_id)
    update_data = note_in.model_dump(exclude_unset=True)

    for field in ("title", "summary", "original_content", "source"):
        if field in update_data:
            setattr(note, field, update_data[field])

    if "knowledge_points" in update_data:
        note.knowledge_points = build_knowledge_points(update_data["knowledge_points"] or [])

    if "tags" in update_data:
        note.tags = get_or_create_tags(db, update_data["tags"] or [])

    db.commit()
    return get_note_or_404(db, note.id)


@router.delete("/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)) -> dict[str, str]:
    note = get_note_or_404(db, note_id)
    db.delete(note)
    db.commit()
    return {"message": "Note deleted successfully"}
