import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import bcrypt from "bcryptjs";

export default function Forgot() {
  const [step, setStep] = useState(1);
  const [nama, setNama] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase
      .from("admin")
      .select("id")
      .eq("nama", nama)
      .single();

    if (error || !data) {
      setError("Nama admin tidak ditemukan");
    } else {
      setStep(2); // lanjut ke form reset password
    }

    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const hashed = await bcrypt.hash(newPassword, 10);

      const { error } = await supabase
        .from("admin")
        .update({ password: hashed })
        .eq("nama", nama);

      if (error) {
        setError("Gagal mengganti password");
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("Terjadi kesalahan: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-xl p-10 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
        Lupa Password Admin?
      </h2>

      <p className="text-sm text-gray-500 mb-6 text-center">
        Masukkan nama admin untuk mengganti password baru.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded mb-4 text-sm">
          Password berhasil diganti! Silakan login kembali.
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Admin
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama admin"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            {loading ? "Memeriksa..." : "Lanjut Ganti Password"}
          </button>
        </form>
      )}

      {step === 2 && !success && (
        <form onSubmit={handleResetPassword} className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Baru
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Masukkan password baru"
              className="w-full px-4 py-3 border border-yellow-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            {loading ? "Mengganti..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}
