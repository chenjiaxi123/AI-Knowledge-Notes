from datetime import datetime
from typing import Any, List, Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator


class NoteBase(BaseModel):
    title: str
    summary: Optional[str] = None
    original_content: str
    source: Optional[str] = None
    knowledge_points: List[str] = Field(default_factory=list)
    tags: List[str] = Field(default_factory=list)


class NoteCreate(NoteBase):
    pass


class NoteUpdate(BaseModel):
    title: Optional[str] = None
    summary: Optional[str] = None
    original_content: Optional[str] = None
    source: Optional[str] = None
    knowledge_points: Optional[List[str]] = None
    tags: Optional[List[str]] = None


def tag_names(tags: Any) -> Any:
    if tags is None:
        return []
    if isinstance(tags, list):
        return [tag.name if hasattr(tag, "name") else tag for tag in tags]
    return tags


class KnowledgePointRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    content: str
    order_index: int


class NoteRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    summary: Optional[str] = None
    original_content: str
    source: Optional[str] = None
    knowledge_points: List[KnowledgePointRead] = Field(default_factory=list)
    tags: List[str] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime

    @field_validator("tags", mode="before")
    @classmethod
    def validate_tags(cls, tags: Any) -> Any:
        return tag_names(tags)


class NoteListItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    summary: Optional[str] = None
    source: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime

    @field_validator("tags", mode="before")
    @classmethod
    def validate_tags(cls, tags: Any) -> Any:
        return tag_names(tags)


class NoteListResponse(BaseModel):
    items: List[NoteListItem]
    total: int
    page: int
    page_size: int
