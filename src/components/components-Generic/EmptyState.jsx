import { BsDatabaseExclamation } from "react-icons/bs";

export default function EmptyState({ text = "Belum ada data tersedia" }) {
    return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300 shadow-inner">
            <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-gray-100 text-gray-400">
                <BsDatabaseExclamation size={36} />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
                Tidak Ada Data
            </h2>
            <p className="text-sm text-gray-500">{text}</p>
        </div>
    );
}
