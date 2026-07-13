# AGENTS.md

## Project Overview

This project is called AI Knowledge Notes.

It is a personal knowledge note system for AI conversations. Users paste AI conversation content, and the system extracts a structured note including title, summary, knowledge points, tags, and original content.

## Tech Stack

Frontend:

- React
- TypeScript
- Tailwind CSS

Backend:

- Python
- FastAPI
- SQLite
- SQLAlchemy

## Development Rules

1. Do not make large unrelated changes.
2. Do not delete existing files or features unless explicitly asked.
3. Before implementing a feature, briefly explain the implementation plan.
4. Keep each feature small and testable.
5. Prefer simple and readable code.
6. Add or update tests when backend logic changes.
7. Keep API responses structured and consistent.
8. Do not hard-code API keys.
9. Use environment variables for secrets.
10. If a requirement is unclear, make a reasonable assumption and document it.

## Project Structure

```text
backend/
  app/
    main.py
    models/
    schemas/
    services/
    routers/
    database.py

frontend/
  src/
    components/
    pages/
    api/
    types/

docs/
  PRD.md
  API.md
  DATABASE.md