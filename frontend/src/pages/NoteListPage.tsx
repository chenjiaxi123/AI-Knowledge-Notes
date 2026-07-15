const sampleNotes = [
  {
    title: "Transformer Attention",
    summary: "A short summary of QKV, attention scores, and softmax.",
    source: "ChatGPT",
    tags: ["AI", "Transformer"],
  },
  {
    title: "SQLite Basics",
    summary: "Notes about tables, relationships, and simple persistence.",
    source: "Claude",
    tags: ["Database"],
  },
];

export function NoteListPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Notes</h2>
        <p className="mt-1 text-sm text-slate-500">A placeholder list for saved knowledge notes.</p>
      </div>
      <div className="grid gap-4">
        {sampleNotes.map((note) => (
          <article key={note.title} className="rounded-md border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{note.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{note.summary}</p>
              </div>
              <span className="text-sm text-slate-500">{note.source}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
