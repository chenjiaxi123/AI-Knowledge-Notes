export function NoteDetailPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Transformer Attention</h2>
        <p className="mt-1 text-sm text-slate-500">Detail page placeholder.</p>
      </div>
      <div className="rounded-md border border-slate-200 bg-white p-5">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Summary</h3>
            <p className="mt-2 text-slate-700">
              This note will show the generated summary, knowledge points, tags, source, and original
              conversation content.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Knowledge Points
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
              <li>Self-attention compares tokens within a sequence.</li>
              <li>Q, K, and V vectors are used to calculate attention.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
