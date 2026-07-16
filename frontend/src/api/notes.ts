import type { NoteListResponse } from "../types/note";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getNotes(): Promise<NoteListResponse> {
  const response = await fetch(`${API_BASE_URL}/api/notes`);

  if (!response.ok) {
    throw new Error("Failed to load notes");
  }

  return response.json();
}

