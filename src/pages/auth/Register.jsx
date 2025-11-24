import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import bcrypt from "bcryptjs";

export default function Register() {
  const [dataForm, setDataForm] = useState({
    nama: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (dataForm.password !== dataForm.confirm_password) {
      setError("Password dan Konfirmasi tidak sama");
      setLoading(false);
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(dataForm.password, 10);

      const { error } = await supabase.from("admin").insert([
        {
          nama: dataForm.nama,
          password: hashedPassword,
        },
      ]);

      if (error) {
        setError("Gagal mendaftar: " + error.message);
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError("Kesalahan server: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-xl p-10">
      <div className="text-center mb-8">
        <div className="text-4xl md:text-5xl font-extrabold text-purple-600 flex flex-col items-center gap-2">
          <span>📝</span>
          <span>Buat Akun Admin</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">Isi data dengan benar untuk mendaftar</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded mb-4 text-sm animate-pulse">
          Sedang mendaftar...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Admin</label>
          <input
            type="text"
            name="nama"
            value={dataForm.nama}
            onChange={handleChange}
            placeholder="Masukkan nama admin"
            className="w-full px-4 py-3 border border-purple-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            className="w-full px-4 py-3 border border-yellow-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
          <input
            type="password"
            name="confirm_password"
            value={dataForm.confirm_password}
            onChange={handleChange}
            placeholder="Ulangi password"
            className="w-full px-4 py-3 border border-green-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl text-white text-base font-semibold bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:opacity-90 transition duration-300"
        >
          {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-purple-600 font-semibold hover:underline transition"
            >
              Login di sini
            </Link>
          </p>
        </div>
      </form>

      <p className="text-center text-xs text-gray-500 mt-8">
        © 2025 Job Portal. All rights reserved.
      </p>
    </div>
  );
}
