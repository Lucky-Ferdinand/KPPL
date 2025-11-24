import { useState, useEffect } from "react";
import { jobAPI } from "../services/jobAPI";
import { uploadToSupabase } from "../utils/supabaseUpload";
import AlertBox from "../components/components-Generic/AlertBox";
import EmptyState from "../components/components-Generic/EmptyState";
import GenericTable from "../components/components-Generic/GenericTable";
import LoadingSpinner from "../components/components-Generic/LoadingSpinner";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { motion } from "framer-motion";

export default function Job() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);

  const [dataForm, setDataForm] = useState({
    title_job: "",
    company_name: "",
    job_type: "",
    location: "",
    salary_min: "",
    salary_max: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEdit = (job) => {
    setIsEditMode(true);
    setEditId(job.id);
    setDataForm({ ...job });
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      let imageUrl = dataForm.image;
      if (file) {
        imageUrl = await uploadToSupabase(file);
      }

      const payload = {
        ...dataForm,
        image: imageUrl,
      };

      if (isEditMode && editId) {
        await jobAPI.updateJob(editId, payload);
        setSuccess("Lowongan berhasil diperbarui!");
      } else {
        await jobAPI.createJob(payload);
        setSuccess("Lowongan berhasil ditambahkan!");
      }

      setDataForm({
        title_job: "",
        company_name: "",
        job_type: "",
        location: "",
        salary_min: "",
        salary_max: "",
        category: "",
        description: "",
        image: "",
      });
      setFile(null);
      setIsEditMode(false);
      setEditId(null);
      setTimeout(() => setSuccess(""), 3000);
      loadJobs();
    } catch (err) {
      setError("Gagal menyimpan data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      setLoading(true);
      await jobAPI.deleteJob(id);
      loadJobs();
    } catch (err) {
      setError("Gagal menghapus data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await jobAPI.fetchJobs();
      setJobs(data);

      const formatted = data.map((job) => ({
        id: job.id,
        title: job.title_job,
        Pembuat: job.company_name,
        time: "Baru saja",
        image: job.image || "/img/guest/default.jpg",
        location: job.location,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        avatar: "https://avatar.iran.liara.run/public/28",
        isFulltime: job.job_type?.toLowerCase() === "fulltime",
        isUrgent: job.category?.toLowerCase().includes("urgent"),
      }));

      localStorage.setItem("jobs", JSON.stringify(formatted));
    } catch (err) {
      setError("Gagal memuat data lowongan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* === Header top === */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 bg-white shadow-sm rounded-xl px-4 py-2 w-1/2">
          <input
            type="text"
            placeholder="Cari lowongan..."
            className="flex-1 outline-none text-gray-700"
          />
          <button className="text-gray-400 hover:text-gray-600">🔍</button>
        </div>
        <div className="flex gap-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-100">
            🔧 Filter
          </button>
          <button
            onClick={() => {
              setIsEditMode(false);
              setEditId(null);
              setDataForm({
                title_job: "",
                company_name: "",
                job_type: "",
                location: "",
                salary_min: "",
                salary_max: "",
                category: "",
                description: "",
                image: "",
              });
            }}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-xl shadow hover:from-purple-600 hover:to-blue-600"
          >
            + Tambah Lowongan
          </button>
        </div>
      </div>

      <div className="mb-4 space-y-2">
        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
      </div>

      {/* === Form === */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/70 p-8 rounded-2xl shadow-md backdrop-blur-md border border-purple-100 grid grid-cols-2 gap-4 mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          name="title_job"
          placeholder="Judul Pekerjaan"
          value={dataForm.title_job}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-purple-200 rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400 text-gray-800 transition"
        />
        <input
          name="company_name"
          placeholder="Nama Perusahaan"
          value={dataForm.company_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-purple-200 rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400 text-gray-800 transition"
        />
        <input
          name="job_type"
          placeholder="Jenis Pekerjaan"
          value={dataForm.job_type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-purple-200 rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400 text-gray-800 transition"
        />
        <input
          name="location"
          placeholder="Lokasi"
          value={dataForm.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-purple-200 rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400 text-gray-800 transition"
        />
        <input
          name="salary_min"
          type="number"
          placeholder="Gaji Minimum"
          value={dataForm.salary_min}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-purple-200 rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400 text-gray-800 transition"
        />
        <input
          name="salary_max"
          type="number"
          placeholder="Gaji Maksimum"
          value={dataForm.salary_max}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-purple-200 rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400 text-gray-800 transition"
        />
        <input
          name="category"
          placeholder="Kategori"
          value={dataForm.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-purple-200 rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400 text-gray-800 transition"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-purple-200 rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400 text-gray-800 transition"
        />
        <textarea
          name="description"
          placeholder="Deskripsi"
          value={dataForm.description}
          onChange={handleChange}
          rows={3}
          className="col-span-2 w-full px-4 py-2 border border-purple-200 rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400 text-gray-800 transition"
        ></textarea>

        <div className="col-span-2 flex gap-4 mt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
          >
            {loading ? "Menyimpan..." : isEditMode ? "Simpan Perubahan" : "Tambah"}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={() => {
                setIsEditMode(false);
                setEditId(null);
                setDataForm({
                  title_job: "",
                  company_name: "",
                  job_type: "",
                  location: "",
                  salary_min: "",
                  salary_max: "",
                  category: "",
                  description: "",
                  image: "",
                });
                setFile(null);
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
            >
              Batal
            </button>
          )}
        </div>
      </motion.form>

      {/* === Tabel === */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
            <tr>
              <th className="px-6 py-3">Logo</th>
              <th className="px-6 py-3">Judul</th>
              <th className="px-6 py-3">Perusahaan</th>
              <th className="px-6 py-3">Lokasi</th>
              <th className="px-6 py-3">Kategori</th>
              <th className="px-6 py-3">Gaji</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <motion.tr
                key={job.id}
                className="border-b hover:bg-gray-50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <td className="px-6 py-3">
                  {job.image && (
                    <img
                      src={job.image}
                      alt="logo"
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  )}
                </td>
                <td className="px-6 py-3 font-semibold text-gray-800">
                  {job.title_job}
                </td>
                <td className="px-6 py-3">{job.company_name}</td>
                <td className="px-6 py-3">{job.location}</td>
                <td className="px-6 py-3">
                  <span className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700">
                    {job.category}
                  </span>
                </td>
                <td className="px-6 py-3">
                  {job.salary_min} - {job.salary_max}
                </td>
                <td className="px-6 py-3 flex items-center gap-3 justify-center">
                  <button
                    onClick={() => handleEdit(job)}
                    className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-2 bg-red-100 hover:bg-red-200 rounded-full"
                  >
                    🗑️
                  </button>
                </td>
              </motion.tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center px-6 py-8 text-gray-400">
                  Belum ada data lowongan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
