import { Outlet, Navigate, Link, useLocation } from "react-router";
import { LogOut, Home, Car, ParkingCircle, FileText } from "lucide-react";

export function AppLayout() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home, show: true },
    { name: "Parkings", path: "/parkings", icon: ParkingCircle, show: true },
    { name: "Entries/Exits", path: "/entries", icon: Car, show: true },
    { name: "Reports", path: "/reports", icon: FileText, show: role === "ADMIN" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">XWZ Parking</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{role} Portal</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.filter(item => item.show).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" 
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white capitalize">
            {location.pathname.split("/")[1] || "Dashboard"}
          </h2>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
