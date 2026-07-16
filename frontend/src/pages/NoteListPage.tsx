import { useEffect, useState } from "react";

import { getNotes } from "../api/notes";
import type { NoteListItem } from "../types/note";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function NoteListPage() {
  const [notes, setNotes] = useState<NoteListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadNotes() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getNotes();

        if (isMounted) {
          setNotes(data.items);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load notes. Please make sure the backend is running.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Notes</h2>
        <p className="mt-1 text-sm text-slate-500">Saved knowledge notes from AI conversations.</p>
      </div>

      {isLoading && (
        <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
          Loading notes...
        </div>
      )}

      {error && !isLoading && (
        <div className="rounded-md border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      )}

      {!isLoading && !error && notes.length === 0 && (
        <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
          No notes yet. Create your first knowledge note to see it here.
        </div>
      )}

      {!isLoading && !error && notes.length > 0 && (
        <div className="grid gap-4">
          {notes.map((note) => (
            <article key={note.id} className="rounded-md border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{note.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{note.summary || "No summary yet."}</p>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <div>{note.source || "Unknown source"}</div>
                  <time dateTime={note.created_at}>{formatDate(note.created_at)}</time>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {note.tags.length > 0 ? (
                  note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">No tags</span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
