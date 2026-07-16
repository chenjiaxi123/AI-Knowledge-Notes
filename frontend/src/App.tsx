import { Navigate, Route, Routes } from "react-router-dom";

import { AppNav } from "./components/AppNav";
import { NoteCreatePage } from "./pages/NoteCreatePage";
import { NoteDetailPage } from "./pages/NoteDetailPage";
import { NoteListPage } from "./pages/NoteListPage";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AppNav />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/notes" replace />} />
          <Route path="/notes" element={<NoteListPage />} />
          <Route path="/notes/:noteId" element={<NoteDetailPage />} />
          <Route path="/create" element={<NoteCreatePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
