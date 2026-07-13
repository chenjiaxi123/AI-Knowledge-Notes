# PRD: AI Knowledge Notes

## 1. Background

AI conversations often contain valuable knowledge, but raw chat history is difficult to organize, search and reuse.

Users may discuss programming, papers, study plans, technical problems or product ideas with AI. These conversations can be useful later, but they are usually scattered across different chat sessions and lack structure.

AI Knowledge Notes aims to convert AI conversations into structured knowledge notes.

## 2. Product Goal

The goal of this project is to help users turn AI conversations into searchable and reusable personal knowledge notes.

The system should allow users to:

1. Paste AI conversation content.
2. Generate a structured note automatically.
3. Review and edit the generated note.
4. Save the note.
5. Search and filter notes later.

## 3. Target Users

Target users include:

- Students
- Developers
- Researchers
- People who frequently use AI tools for learning and work
- Users who want to build a personal knowledge base from AI conversations

## 4. Core User Flow

The main user flow is:

1. User opens the note creation page.
2. User pastes an AI conversation.
3. User clicks "Generate Note".
4. The system generates:
   - title
   - summary
   - knowledge points
   - tags
5. User reviews and edits the generated result.
6. User saves the note.
7. User searches or filters saved notes later.

## 5. MVP Features

### 5.1 Create Note

The user can create a note manually or from an AI-generated result.

A note should contain:

- title
- summary
- original conversation content
- knowledge points
- tags
- source
- created time
- updated time

### 5.2 AI Summary

The user can paste conversation text and generate a structured note.

Generated fields:

- title
- summary
- knowledge_points
- tags

The generated result should be editable before saving.

### 5.3 Note List

The user can view all saved notes.

Each note card should show:

- title
- summary preview
- tags
- created time
- source

### 5.4 Note Detail

The user can view the full content of a note.

The detail page should show:

- title
- summary
- knowledge points
- tags
- source
- original conversation
- created time
- updated time

### 5.5 Update Note

The user can edit an existing note.

Editable fields include:

- title
- summary
- knowledge points
- tags
- source
- original conversation

### 5.6 Delete Note

The user can delete a note.

In the MVP stage, hard delete is acceptable.

### 5.7 Search

The user can search notes by:

- title
- summary
- knowledge points
- original content
- tags

In the MVP stage, keyword search is enough.

Semantic search is not required in MVP.

### 5.8 Filter

The user can filter notes by:

- date range
- tags
- source

## 6. Non-goals for MVP

The following features are not included in the MVP:

- User login
- Cloud sync
- Browser extension
- Automatic ChatGPT import
- Knowledge graph
- RAG chatbot
- Multi-user collaboration
- Mobile app
- Payment system
- Public sharing

## 7. Data Requirements

Each note should store both structured content and the original conversation.

The original conversation should not be removed because AI-generated summaries may miss important details.

A note should include:

- title
- summary
- original_content
- source
- knowledge_points
- tags
- created_at
- updated_at

## 8. AI Processing Requirements

The AI summary feature should convert raw conversation text into structured data.

Input:

```json
{
  "conversation": "User: ... Assistant: ..."
}
```

Expected output:

```json
{
  "title": "Transformer Attention 原理",
  "summary": "这次对话介绍了 Transformer 中 Attention 机制的基本原理。",
  "knowledge_points": [
    "Self-Attention 的输入和输出",
    "QKV 的计算方式",
    "Scaled Dot-Product Attention 的计算过程"
  ],
  "tags": ["AI", "Transformer", "Deep Learning"]
}
```

## 9. MVP Success Criteria

The MVP is considered complete when users can:

1. Paste an AI conversation.
2. Generate a structured note.
3. Save the note.
4. View all notes.
5. View note details.
6. Edit a note.
7. Delete a note.
8. Search notes.
9. Filter notes by tag or date.

## 10. Future Features

Possible future features include:

- Semantic search
- Vector database
- Related notes recommendation
- Knowledge graph
- RAG-based personal knowledge assistant
- Browser extension
- ChatGPT conversation import
- Multi-device sync
- Export to Markdown
- Export to PDF