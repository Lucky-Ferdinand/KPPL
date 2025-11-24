import { FaBell, FaSearch } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        <div
            id="header-container"
            className="flex items-center justify-between px-6 py-4 bg-white shadow-sm rounded-md"
        >
            {/* Search */}
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-md">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search for jobs, blogs, companies..."
                    className="bg-transparent outline-none w-full text-sm"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-6 ml-4">
                {/* Notification */}
                <div className="relative">
                    <FaBell className="text-gray-600 text-lg cursor-pointer hover:text-hijau" />
                    <span className="absolute -top-2 -right-2 bg-hijau text-white text-xs rounded-full px-1.5">
                        3
                    </span>
                </div>

                {/* Settings */}
                <SlSettings className="text-gray-600 text-lg cursor-pointer hover:text-hijau" />

                {/* Profile */}
                <div className="flex items-center space-x-3 border-l pl-4 border-gray-300">
                    <div className="text-sm text-gray-700">
                        <p className="leading-none">Hi,</p>
                        <p className="font-semibold">Lucky</p>
                    </div>
                    <img
                        src="https://avatar.iran.liara.run/public/28"
                        alt="avatar"
                        className="w-9 h-9 rounded-full border-2 border-hijau shadow-sm"
                    />
                </div>
            </div>
        </div>
    );
}
