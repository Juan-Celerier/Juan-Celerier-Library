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
    <nav className="bg-white border-b border-gray-200 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
