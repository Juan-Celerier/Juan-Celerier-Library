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
    <nav className="bg-white border-b border-neutral-200 mb-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-xl">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
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
