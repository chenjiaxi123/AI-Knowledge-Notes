export type PageKey = "list" | "create" | "detail";

type NavItem = {
  key: PageKey;
  label: string;
};

const navItems: NavItem[] = [
  { key: "list", label: "Notes" },
  { key: "create", label: "Create" },
  { key: "detail", label: "Detail" },
];

type AppNavProps = {
  activePage: PageKey;
  onPageChange: (page: PageKey) => void;
};

export function AppNav({ activePage, onPageChange }: AppNavProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold">AI Knowledge Notes</h1>
          <p className="text-sm text-slate-500">Organize useful AI conversations.</p>
        </div>
        <nav className="flex gap-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onPageChange(item.key)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                activePage === item.key
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
