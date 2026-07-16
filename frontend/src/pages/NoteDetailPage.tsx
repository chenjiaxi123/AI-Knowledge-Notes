import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getNoteById } from "../api/notes";
import type { NoteDetail } from "../types/note";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function NoteDetailPage() {
  const { noteId } = useParams();
  const [note, setNote] = useState<NoteDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const parsedNoteId = Number(noteId);

    async function loadNote() {
      if (!Number.isInteger(parsedNoteId) || parsedNoteId <= 0) {
        setError("This note does not exist.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const data = await getNoteById(parsedNoteId);

        if (isMounted) {
          setNote(data);
        }
      } catch (err) {
        if (isMounted) {
          const message =
            err instanceof Error && err.message === "Note not found"
              ? "This note does not exist."
              : "Failed to load note. Please make sure the backend is running.";

          setError(message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadNote();

    return () => {
      isMounted = false;
    };
  }, [noteId]);

  return (
    <section className="space-y-6">
      <Link className="text-sm font-medium text-slate-600 hover:text-slate-900" to="/notes">
        Back to notes
      </Link>

      {isLoading && (
        <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
          Loading note...
        </div>
      )}

      {error && !isLoading && (
        <div className="rounded-md border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      )}

      {!isLoading && !error && note && (
        <>
          <div>
            <h2 className="text-2xl font-semibold">{note.title}</h2>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
              <span>{note.source || "Unknown source"}</span>
              <span>Created: {formatDate(note.created_at)}</span>
              <span>Updated: {formatDate(note.updated_at)}</span>
            </div>
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-5">
            <div className="space-y-6">
              <section>
                <h3 className="text-sm font-semibold uppercase text-slate-500">Summary</h3>
                <p className="mt-2 whitespace-pre-wrap text-slate-700">
                  {note.summary || "No summary yet."}
                </p>
              </section>

              <section>
                <h3 className="text-sm font-semibold uppercase text-slate-500">Knowledge Points</h3>
                {note.knowledge_points.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                    {note.knowledge_points.map((point) => (
                      <li key={point.id}>{point.content}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">No knowledge points yet.</p>
                )}
              </section>

              <section>
                <h3 className="text-sm font-semibold uppercase text-slate-500">Tags</h3>
                <div className="mt-2 flex flex-wrap gap-2">
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
                    <span className="text-sm text-slate-500">No tags</span>
                  )}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold uppercase text-slate-500">Original Content</h3>
                <p className="mt-2 whitespace-pre-wrap rounded-md bg-slate-50 p-4 text-sm text-slate-700">
                  {note.original_content}
                </p>
              </section>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
