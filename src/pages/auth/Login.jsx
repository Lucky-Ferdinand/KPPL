import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Import Link
import { supabase } from "../../utils/supabaseClient";
import bcrypt from "bcryptjs";

export default function Login() {
  const [dataForm, setDataForm] = useState({ nama: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("admin")
        .select("*")
        .eq("nama", dataForm.nama)
        .single();

      if (error || !data) {
        setError("Nama admin tidak ditemukan");
        return;
      }

      const isMatch = await bcrypt.compare(dataForm.password, data.password);
      if (!isMatch) {
        setError("Password salah");
        return;
      }

      localStorage.setItem("admin", JSON.stringify({ id: data.id, nama: data.nama }));
      navigate("/");
    } catch (err) {
      setError("Gagal login. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-xl p-10">
      <div className="text-center mb-8">
        <div className="text-4xl md:text-5xl font-extrabold text-purple-600 flex flex-col items-center gap-2">
          <span>👋</span>
          <span>Halo Admin</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">Silakan login untuk mengelola portal</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded mb-4 text-sm animate-pulse">
          Mohon tunggu...
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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl text-white text-base font-semibold bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:opacity-90 transition duration-300"
        >
          {loading ? "Memproses..." : "Login Sekarang"}
        </button>

        {/* ✅ Tambahkan tombol menuju halaman register */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-purple-600 font-semibold hover:underline transition"
            >
              Daftar di sini
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Lupa password?{" "}
            <Link to="/forgot" className="text-yellow-600 font-semibold hover:underline transition">
              Reset di sini
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
