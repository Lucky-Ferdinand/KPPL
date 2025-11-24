export default function GenericTable({ columns, data, renderRow }) {
    return (
        <div className="overflow-x-auto rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 shadow-xl">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-purple-100/60 text-purple-900 text-left">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className="px-6 py-4 font-semibold uppercase tracking-wide text-xs"
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-purple-50">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr
                                key={index}
                                className="hover:bg-purple-50/50 transition-all duration-200"
                            >
                                {renderRow(item, index)}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="text-center px-6 py-6 text-gray-400 italic"
                            >
                                Tidak ada data tersedia
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
