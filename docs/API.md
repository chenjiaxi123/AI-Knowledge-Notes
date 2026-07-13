# API Design

## 1. Overview

This document defines the initial API design for AI Knowledge Notes.

Base API prefix:

```text
/api
```

Health check endpoint:

```text
/health
```

## 2. Health Check

### GET /health

Check whether the backend service is running.

Response:

```json
{
  "status": "ok"
}
```

## 3. Notes API

### 3.1 Create Note

Create a new note.

Endpoint:

```text
POST /api/notes
```

Request:

```json
{
  "title": "Transformer Attention 原理",
  "summary": "这篇笔记总结了 Self-Attention 的计算过程。",
  "original_content": "User: ... Assistant: ...",
  "source": "ChatGPT",
  "knowledge_points": [
    "QKV 的计算方式",
    "Attention Score 的计算",
    "Softmax 的作用"
  ],
  "tags": ["AI", "Transformer"]
}
```

Response:

```json
{
  "id": 1,
  "title": "Transformer Attention 原理",
  "summary": "这篇笔记总结了 Self-Attention 的计算过程。",
  "original_content": "User: ... Assistant: ...",
  "source": "ChatGPT",
  "knowledge_points": [
    {
      "id": 1,
      "content": "QKV 的计算方式",
      "order_index": 0
    },
    {
      "id": 2,
      "content": "Attention Score 的计算",
      "order_index": 1
    }
  ],
  "tags": ["AI", "Transformer"],
  "created_at": "2026-07-11T10:00:00",
  "updated_at": "2026-07-11T10:00:00"
}
```

### 3.2 List Notes

Get a list of notes.

Endpoint:

```text
GET /api/notes
```

Query parameters:

| Name | Type | Required | Description |
|---|---|---|---|
| q | string | no | Search keyword |
| tag | string | no | Filter by tag |
| source | string | no | Filter by source |
| start_date | string | no | Filter by start date |
| end_date | string | no | Filter by end date |
| page | integer | no | Page number |
| page_size | integer | no | Page size |

Example:

```text
GET /api/notes?q=Transformer&tag=AI&page=1&page_size=10
```

Response:

```json
{
  "items": [
    {
      "id": 1,
      "title": "Transformer Attention 原理",
      "summary": "这篇笔记总结了 Self-Attention 的计算过程。",
      "source": "ChatGPT",
      "tags": ["AI", "Transformer"],
      "created_at": "2026-07-11T10:00:00",
      "updated_at": "2026-07-11T10:00:00"
    }
  ],
  "total": 1,
  "page": 1,
  "page_size": 10
}
```

### 3.3 Get Note Detail

Get a single note by ID.

Endpoint:

```text
GET /api/notes/{note_id}
```

Response:

```json
{
  "id": 1,
  "title": "Transformer Attention 原理",
  "summary": "这篇笔记总结了 Self-Attention 的计算过程。",
  "original_content": "User: ... Assistant: ...",
  "source": "ChatGPT",
  "knowledge_points": [
    {
      "id": 1,
      "content": "QKV 的计算方式",
      "order_index": 0
    },
    {
      "id": 2,
      "content": "Attention Score 的计算",
      "order_index": 1
    }
  ],
  "tags": ["AI", "Transformer"],
  "created_at": "2026-07-11T10:00:00",
  "updated_at": "2026-07-11T10:00:00"
}
```

### 3.4 Update Note

Update an existing note.

Endpoint:

```text
PUT /api/notes/{note_id}
```

Request:

```json
{
  "title": "Transformer 中 Self-Attention 的原理",
  "summary": "更新后的摘要内容。",
  "original_content": "User: ... Assistant: ...",
  "source": "ChatGPT",
  "knowledge_points": [
    "QKV 的计算方式",
    "Scaled Dot-Product Attention",
    "Multi-Head Attention"
  ],
  "tags": ["AI", "Transformer", "Deep Learning"]
}
```

Response:

```json
{
  "id": 1,
  "title": "Transformer 中 Self-Attention 的原理",
  "summary": "更新后的摘要内容。",
  "original_content": "User: ... Assistant: ...",
  "source": "ChatGPT",
  "knowledge_points": [
    {
      "id": 1,
      "content": "QKV 的计算方式",
      "order_index": 0
    },
    {
      "id": 2,
      "content": "Scaled Dot-Product Attention",
      "order_index": 1
    },
    {
      "id": 3,
      "content": "Multi-Head Attention",
      "order_index": 2
    }
  ],
  "tags": ["AI", "Transformer", "Deep Learning"],
  "created_at": "2026-07-11T10:00:00",
  "updated_at": "2026-07-11T11:00:00"
}
```

### 3.5 Delete Note

Delete a note.

Endpoint:

```text
DELETE /api/notes/{note_id}
```

Response:

```json
{
  "message": "Note deleted successfully"
}
```

## 4. AI API

### 4.1 Generate Structured Note

Generate a structured note from pasted AI conversation content.

Endpoint:

```text
POST /api/ai/summarize
```

Request:

```json
{
  "conversation": "User: 什么是 Transformer？ Assistant: Transformer 是一种神经网络架构……"
}
```

Response:

```json
{
  "title": "Transformer 基础概念",
  "summary": "这次对话介绍了 Transformer 的基本概念、核心结构和应用场景。",
  "knowledge_points": [
    "Transformer 是一种基于 Attention 机制的神经网络架构",
    "Self-Attention 用于建模序列内部元素之间的关系",
    "Transformer 被广泛应用于自然语言处理和大模型"
  ],
  "tags": ["AI", "Transformer", "Deep Learning"]
}
```

## 5. Error Response Format

All API errors should use a consistent format.

Example:

```json
{
  "detail": "Note not found"
}
```

Common status codes:

| Status Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |