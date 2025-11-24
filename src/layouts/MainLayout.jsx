import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar"; // isinya akan jadi horizontal
// Header bisa dihapus atau digabung ke Sidebar jika diinginkan

export default function MainLayout() {
    return (
        <div id="app-root" className="flex flex-col min-h-screen bg-gray-100">
            {/* Navigation Bar (Horizontal Sidebar) */}
            <header className="w-full bg-white shadow-md z-10">
                <Sidebar /> {/* akan dirender secara horizontal */}
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
            </main>
        </div>
    );
}
