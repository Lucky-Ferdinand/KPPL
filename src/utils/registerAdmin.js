import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

// Ganti dengan nilai Anda sendiri
const supabaseUrl = "https://cxfpfizkkktfngagqvxr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

// Inisialisasi client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simulasi data input admin
const form = {
  nama: "admin1",
  password: "rahasia123",
};

// Fungsi untuk mendaftarkan admin baru
async function registerAdmin() {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(form.password, 10);

    // Insert ke tabel 'admin'
    const { data, error } = await supabase.from("admin").insert([
      {
        nama: form.nama,
        password: hashedPassword,
      },
    ]);

    if (error) {
      console.error("❌ Gagal insert:", error.message);
    } else {
      console.log("✅ Berhasil insert:", data);
    }
  } catch (err) {
    console.error("🔥 Terjadi kesalahan:", err);
  }
}

// Jalankan fungsi
registerAdmin();
