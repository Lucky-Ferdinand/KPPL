import { useState, useEffect } from "react";
import { companyAPI } from "../services/companyAPI";
import { uploadToSupabase } from "../utils/supabaseUpload";
import AlertBox from "../components/components-Generic/AlertBox";
import EmptyState from "../components/components-Generic/EmptyState";
import GenericTable from "../components/components-Generic/GenericTable";
import LoadingSpinner from "../components/components-Generic/LoadingSpinner";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function CompanyProfile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);

  const [dataForm, setDataForm] = useState({
    company_name: "",
    description: "",
    logo: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEdit = (company) => {
    setIsEditMode(true);
    setEditId(company.id);
    setDataForm({ ...company });
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      let logoUrl = dataForm.logo;
      if (file) {
        logoUrl = await uploadToSupabase(file);
      }

      const payload = { ...dataForm, logo: logoUrl };

      if (isEditMode && editId) {
        await companyAPI.updateCompany(editId, payload);
        setSuccess("Data perusahaan berhasil diperbarui!");
      } else {
        await companyAPI.createCompany(payload);
        setSuccess("Data perusahaan berhasil ditambahkan!");
      }

      setDataForm({ company_name: "", description: "", logo: "", address: "" });
      setFile(null);
      setIsEditMode(false);
      setEditId(null);
      setTimeout(() => setSuccess(""), 3000);
      loadCompanies();
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
      await companyAPI.deleteCompany(id);
      loadCompanies();
    } catch (err) {
      setError("Gagal menghapus data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyAPI.fetchCompanies();
      setCompanies(data);
    } catch (err) {
      setError("Gagal memuat data perusahaan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-gradient-to-br from-purple-50 to-green-50 rounded-3xl shadow-md border border-purple-200 ring-1 ring-purple-100">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Profil Perusahaan</h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 grid grid-cols-2 gap-4"
      >
        <input
          name="company_name"
          placeholder="Nama Perusahaan"
          value={dataForm.company_name}
          onChange={handleChange}
          className="col-span-2 w-full px-4 py-2 border border-purple-200 rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400 text-gray-800 transition"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-purple-200 rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <input
          name="address"
          placeholder="Alamat"
          value={dataForm.address}
          onChange={handleChange}
          className="col-span-2 w-full px-4 py-2 border border-purple-200 rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400 text-gray-800 transition"
        />
        <textarea
          name="description"
          placeholder="Deskripsi Perusahaan"
          value={dataForm.description}
          onChange={handleChange}
          rows={3}
          className="col-span-2 w-full px-4 py-2 border border-purple-200 rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400 text-gray-800 transition"
        ></textarea>

        <div className="col-span-2 flex gap-4 mt-2">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
          >
            {loading ? "Menyimpan..." : isEditMode ? "Simpan Perubahan" : "Tambah"}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={() => {
                setIsEditMode(false);
                setEditId(null);
                setDataForm({ company_name: "", description: "", logo: "", address: "" });
                setFile(null);
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Daftar Perusahaan ({companies.length})</h3>

        {loading && <LoadingSpinner text="Memuat data..." />}
        {!loading && companies.length === 0 && <EmptyState text="Belum ada data perusahaan." />}
        {!loading && companies.length > 0 && (
          <GenericTable
            columns={["#", "Nama", "Alamat", "Logo", "#", "#"]}
            data={companies}
            renderRow={(item, index) => (
              <>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-semibold">{item.company_name}</td>
                <td className="px-4 py-2">{item.address}</td>
                <td className="px-4 py-2">
                  {item.logo && <img src={item.logo} alt="logo" className="w-10 h-10 object-contain rounded" />}
                </td>
                <td className="px-4 py-2">
                  {/* 👇 Tambahkan aria-label="edit" */}
                  <button onClick={() => handleEdit(item)} aria-label="edit">
                    <AiFillEdit className="text-purple-500 hover:text-purple-700 text-xl" />
                  </button>
                </td>
                <td className="px-4 py-2">
                  {/* 👇 Tambahkan aria-label="delete" */}
                  <button onClick={() => handleDelete(item.id)} aria-label="delete">
                    <AiFillDelete className="text-red-500 hover:text-red-700 text-xl" />
                  </button>
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
