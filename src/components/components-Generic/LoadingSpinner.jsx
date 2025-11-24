export default function LoadingSpinner({ text = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            {/* Spinner Baru */}
            <div className="relative w-12 h-12 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-t-purple-400 border-b-blue-400 border-l-green-400 border-r-transparent animate-spin"></div>
            </div>

            {/* Teks */}
            <p className="text-sm text-gray-600 font-medium animate-pulse">{text}</p>
        </div>
    );
}
