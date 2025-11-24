import React from 'react';

export default function NotFound({ errorCode, description}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4">
      <img
        src={"../public/img/404.jpg"}
        alt={`Error ${errorCode}`}
        className="w-64 h-64 object-contain mb-6"
      />
      <h1 className="text-6xl font-bold mb-4">{errorCode}</h1>
      <p className="text-lg text-center max-w-md mb-6">{description}</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
}
