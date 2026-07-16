import type { NoteDetail, NoteListResponse } from "../types/note";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getNotes(): Promise<NoteListResponse> {
  const response = await fetch(`${API_BASE_URL}/api/notes`);

  if (!response.ok) {
    throw new Error("Failed to load notes");
  }

  return response.json();
}

export async function getNoteById(noteId: number): Promise<NoteDetail> {
  const response = await fetch(`${API_BASE_URL}/api/notes/${noteId}`);

  if (response.status === 404) {
    throw new Error("Note not found");
  }

  if (!response.ok) {
    throw new Error("Failed to load note");
  }

  return response.json();
}
