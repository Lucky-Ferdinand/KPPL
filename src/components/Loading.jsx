export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="relative w-16 h-16">
        {/* Spinner ungu normal */}
        <div className="absolute inset-0 border-4 border-purple-300 border-t-transparent rounded-full animate-spin"></div>

        {/* Spinner biru reverse */}
        <div
          className="absolute inset-2 border-4 border-blue-300 border-b-transparent rounded-full animate-spin"
          style={{ animationDirection: "reverse" }}
        ></div>
      </div>
      <p className="mt-6 text-purple-600 text-lg font-semibold">Memuat data...</p>
    </div>
  );
}
