import ListMenu from "./ListMenu";

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 border-b border-purple-100 rounded-b-2xl shadow-sm"
    >
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-purple-600">J.</span>
        <span className="text-sm text-purple-500 font-medium">Job Portal</span>
      </div>

      {/* Menu Horizontal */}
      <ListMenu horizontal />

      {/* Profile */}
      <div className="flex items-center space-x-3">
        <img
          src="https://avatar.iran.liara.run/public/28"
          alt="Admin Avatar"
          className="w-9 h-9 rounded-full border-2 border-purple-300 shadow"
        />
        <span className="text-sm text-purple-600 font-medium">Admin</span>
      </div>
    </div>
  );
}
