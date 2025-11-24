import { CheckCircle, Info, AlertCircle } from "lucide-react";

export default function AlertBox({ type = "info", children }) {
    const baseClass =
        "flex items-start gap-3 p-4 rounded-2xl border text-sm shadow-md";

    const variants = {
        success: {
            icon: <CheckCircle className="text-green-600 mt-0.5" size={20} />,
            style: "bg-green-50 border-green-200 text-green-800",
        },
        error: {
            icon: <AlertCircle className="text-red-600 mt-0.5" size={20} />,
            style: "bg-red-50 border-red-200 text-red-800",
        },
        info: {
            icon: <Info className="text-blue-600 mt-0.5" size={20} />,
            style: "bg-blue-50 border-blue-200 text-blue-800",
        },
    };

    const current = variants[type] || variants.info;

    return (
        <div className={`${baseClass} ${current.style}`}>
            <div>{current.icon}</div>
            <div className="flex-1">{children}</div>
        </div>
    );
}
