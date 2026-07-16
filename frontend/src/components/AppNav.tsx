import { NavLink } from "react-router-dom";

type NavItem = {
  to: string;
  label: string;
};

const navItems: NavItem[] = [
  { to: "/notes", label: "Notes" },
  { to: "/create", label: "Create" },
];

export function AppNav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold">AI Knowledge Notes</h1>
          <p className="text-sm text-slate-500">Organize useful AI conversations.</p>
        </div>
        <nav className="flex gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
