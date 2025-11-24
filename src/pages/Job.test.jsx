import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Job from './Job';
import { jobAPI } from '../services/jobAPI';
import { uploadToSupabase } from '../utils/supabaseUpload';

// Mock
jest.mock('../services/jobAPI');
jest.mock('../utils/supabaseUpload');
global.confirm = jest.fn(() => true); // Mock konfirmasi hapus

describe('Pengujian Halaman Manajemen Job', () => {
  const mockJobs = [{ 
    id: 1, 
    title_job: 'Developer', 
    company_name: 'PCR',
    job_type: 'Full-time',
    location: 'Pekanbaru',
    salary_min: '5000000',
    salary_max: '7000000',
    category: 'IT',
    description: 'Deskripsi singkat',
    image: 'image.png',
  }];

  beforeEach(() => {
    jobAPI.fetchJobs.mockResolvedValue(mockJobs);
    jobAPI.createJob.mockClear();
    jobAPI.updateJob.mockClear();
    jobAPI.deleteJob.mockClear();
    global.confirm.mockClear();
  });

  // TC-JOB-01: Tambah lowongan
  test('TC-JOB-01: Admin harus bisa menambahkan lowongan baru dengan data valid', async () => {
    render(<Job />);
    await screen.findByRole('button', { name: /tambah lowongan/i });

    jobAPI.createJob.mockResolvedValue({ success: true });
    uploadToSupabase.mockResolvedValue('http://mockurl.com/image.png');

    fireEvent.change(screen.getByPlaceholderText(/judul pekerjaan/i), { target: { value: 'Software Engineer' } });
    fireEvent.change(screen.getByPlaceholderText(/nama perusahaan/i), { target: { value: 'Tech Corp' } });
    fireEvent.click(screen.getByRole('button', { name: /tambah$/i }));

    await waitFor(() => {
      expect(jobAPI.createJob).toHaveBeenCalled();
    });
  });

  // TC-JOB-02: Validasi tambah lowongan
  test('TC-JOB-02: Form tidak boleh tersimpan jika judul pekerjaan kosong', async () => {
    render(<Job />);
    await screen.findByRole('button', { name: /tambah lowongan/i });
    fireEvent.change(screen.getByPlaceholderText(/nama perusahaan/i), { target: { value: 'Another Corp' } });
    fireEvent.click(screen.getByRole('button', { name: /tambah$/i }));

    await waitFor(() => {
      expect(jobAPI.createJob).not.toHaveBeenCalled();
    });
  });

  // TC-JOB-03: Edit lowongan
  test('TC-JOB-03: Admin harus bisa mengedit data lowongan yang ada', async () => {
    render(<Job />);
    const editButton = await screen.findByRole('button', { name: /✏️/i });
    fireEvent.click(editButton);

    const titleInput = screen.getByPlaceholderText(/judul pekerjaan/i);
    fireEvent.change(titleInput, { target: { value: 'Senior Software Engineer' } });
    fireEvent.click(screen.getByRole('button', { name: /simpan perubahan/i }));

    await waitFor(() => {
      expect(jobAPI.updateJob).toHaveBeenCalledWith(1, expect.objectContaining({
        title_job: 'Senior Software Engineer'
      }));
    });
  });

  // TC-JOB-04: Hapus lowongan
  test('TC-JOB-04: Admin harus bisa menghapus data lowongan', async () => {
    render(<Job />);
    const deleteButton = await screen.findByRole('button', { name: /🗑️/i });
    fireEvent.click(deleteButton);

    expect(global.confirm).toHaveBeenCalledWith('Yakin ingin menghapus data ini?');
    await waitFor(() => {
      expect(jobAPI.deleteJob).toHaveBeenCalledWith(1);
    });
  });
});