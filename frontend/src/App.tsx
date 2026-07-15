import { useState } from "react";

import { AppNav, type PageKey } from "./components/AppNav";
import { NoteCreatePage } from "./pages/NoteCreatePage";
import { NoteDetailPage } from "./pages/NoteDetailPage";
import { NoteListPage } from "./pages/NoteListPage";

const pages: Record<PageKey, JSX.Element> = {
  list: <NoteListPage />,
  create: <NoteCreatePage />,
  detail: <NoteDetailPage />,
};

function App() {
  const [activePage, setActivePage] = useState<PageKey>("list");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AppNav activePage={activePage} onPageChange={setActivePage} />
      <main className="mx-auto max-w-5xl px-6 py-8">{pages[activePage]}</main>
    </div>
  );
}

export default App;
