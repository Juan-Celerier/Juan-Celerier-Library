import { Link, useLocation } from "react-router-dom";

const AdminNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/admin", label: "Inicio", icon: "🏠" },
    { path: "/admin/books", label: "Libros", icon: "📚" },
    { path: "/admin/categories", label: "Categorías", icon: "🏷️" },
    { path: "/admin/authors", label: "Autores", icon: "✍️" },
    { path: "/admin/publishers", label: "Editores", icon: "🏢" },
  ];

  return (
    <nav className="bg-neutral-50 border-b border-neutral-200 mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-transparent text-neutral-600 hover:border-neutral-300 hover:bg-white hover:text-neutral-900"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;
