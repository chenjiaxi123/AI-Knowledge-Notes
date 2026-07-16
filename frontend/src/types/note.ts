export type NoteListItem = {
  id: number;
  title: string;
  summary: string | null;
  source: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type NoteListResponse = {
  items: NoteListItem[];
  total: number;
  page: number;
  page_size: number;
};

