# Database Design

## 1. Overview

This document defines the initial database design for AI Knowledge Notes.

The MVP uses SQLite as the database.

The system stores both original AI conversation content and structured knowledge note content.

## 2. Tables

The initial database contains four main tables:

1. notes
2. knowledge_points
3. tags
4. note_tags

## 3. notes

The `notes` table stores the main note content.

| Field | Type | Description |
|---|---|---|
| id | integer | Primary key |
| title | string | Note title |
| summary | text | AI-generated or user-edited summary |
| original_content | text | Original pasted conversation |
| source | string | Source platform, such as ChatGPT, Claude or Other |
| created_at | datetime | Creation time |
| updated_at | datetime | Last update time |

Example:

```text
id: 1
title: Transformer Attention 原理
summary: 这篇笔记总结了 Self-Attention 的计算过程。
original_content: User: ... Assistant: ...
source: ChatGPT
created_at: 2026-07-11T10:00:00
updated_at: 2026-07-11T10:00:00
```

## 4. knowledge_points

The `knowledge_points` table stores structured knowledge points for each note.

| Field | Type | Description |
|---|---|---|
| id | integer | Primary key |
| note_id | integer | Related note ID |
| content | text | Knowledge point content |
| order_index | integer | Display order |

Relationship:

```text
notes.id -> knowledge_points.note_id
```

Example:

```text
id: 1
note_id: 1
content: QKV 的计算方式
order_index: 0
```

## 5. tags

The `tags` table stores tag names.

| Field | Type | Description |
|---|---|---|
| id | integer | Primary key |
| name | string | Tag name |

Example:

```text
id: 1
name: AI
```

## 6. note_tags

The `note_tags` table stores the many-to-many relationship between notes and tags.

| Field | Type | Description |
|---|---|---|
| note_id | integer | Related note ID |
| tag_id | integer | Related tag ID |

Relationships:

```text
notes.id -> note_tags.note_id
tags.id -> note_tags.tag_id
```

Example:

```text
note_id: 1
tag_id: 1
```

## 7. Relationships

A note can have many knowledge points.

```text
notes 1 ---- many knowledge_points
```

A note can have many tags.

```text
notes many ---- many tags
```

The many-to-many relationship is implemented by `note_tags`.

```text
notes ---- note_tags ---- tags
```

## 8. Initial SQL Draft

This SQL is only a draft for reference. The actual project may use SQLAlchemy models.

```sql
CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    original_content TEXT NOT NULL,
    source VARCHAR(100),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE knowledge_points (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    FOREIGN KEY (note_id) REFERENCES notes(id)
);

CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE note_tags (
    note_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);
```

## 9. Future Improvements

Possible future database improvements:

- Add full-text search index
- Add embedding table for semantic search
- Add note relations table
- Add archived field
- Add favorite field
- Add soft delete
- Add source URL
- Add conversation metadata
- Add user table if multi-user support is needed