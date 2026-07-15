export function NoteCreatePage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Create Note</h2>
        <p className="mt-1 text-sm text-slate-500">Paste an AI conversation and prepare a note draft.</p>
      </div>
      <form className="space-y-4 rounded-md border border-slate-200 bg-white p-5">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Title</span>
          <input
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="Transformer Attention"
            type="text"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Conversation</span>
          <textarea
            className="mt-1 min-h-40 w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="User: ... Assistant: ..."
          />
        </label>
        <button
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          type="button"
        >
          Save draft
        </button>
      </form>
    </section>
  );
}
