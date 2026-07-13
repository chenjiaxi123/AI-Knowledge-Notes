# AI Knowledge Notes

AI Knowledge Notes 是一个用于整理 AI 对话内容的个人知识笔记系统。

用户可以将与 AI 的对话内容粘贴到系统中，系统会自动生成标题、摘要、知识点和标签，并将整理后的内容保存为知识笔记，方便后续搜索、筛选和复习。

## Core Features

MVP 阶段计划实现以下功能：

- 粘贴 AI 对话内容
- AI 自动生成标题
- AI 自动生成摘要
- AI 提取知识点
- AI 生成标签
- 保存知识笔记
- 查看笔记列表
- 查看笔记详情
- 搜索笔记
- 按标签和时间筛选笔记

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS

### Backend

- Python
- FastAPI
- SQLite
- SQLAlchemy

### AI

- OpenAI API or other LLM API

## Project Structure

```text
AI-Knowledge-Notes/
├── backend/
├── frontend/
├── docs/
├── AGENTS.md
├── README.md
└── .gitignore
```

## Development Plan

### Phase 1: Project Initialization

- Create project structure
- Add README
- Add AGENTS.md
- Add PRD document
- Add API design document
- Add database design document

### Phase 2: Backend MVP

- Initialize FastAPI project
- Add health check API
- Add SQLite database connection
- Add note data model
- Add note CRUD APIs

### Phase 3: Frontend MVP

- Initialize React project
- Build note list page
- Build note detail page
- Build note creation page
- Connect frontend with backend APIs

### Phase 4: AI Summary

- Add AI summary API
- Generate title, summary, knowledge points and tags from pasted conversations
- Allow users to edit generated content before saving

### Phase 5: Search and Filter

- Search notes by title, summary, knowledge points, tags and original content
- Filter notes by date and tags

## MVP Scope

The first version should focus on local use and core knowledge note management.

Included:

- Single-user local system
- Manual paste of AI conversations
- AI-generated structured notes
- Note CRUD
- Search and filter

Not included in MVP:

- User login
- Cloud sync
- Browser extension
- Automatic ChatGPT import
- Knowledge graph
- RAG chatbot
- Mobile app
- Multi-user collaboration

## Project Status

Current stage: Project initialization.