// src/pages/Blog.test.jsx

import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Blog from './Blog';
import { blogAPI } from '../services/blogAPI';
import { uploadToSupabase } from '../utils/supabaseUpload';

// Mock dependensi eksternal
jest.mock('../services/blogAPI');
jest.mock('../utils/supabaseUpload');
global.confirm = jest.fn(() => true); // Mock untuk window.confirm

describe('Pengujian Halaman Manajemen Blog', () => {
  const mockBlogs = [{
    id: 1,
    title_blog: "Judul Lama",
    author_name: "Penulis Awal",
    published_at: "2025-10-10",
    content: "Konten awal...",
    image: "image.jpg"
  }];

  beforeEach(() => {
    // Reset semua mock sebelum setiap tes dijalankan
    blogAPI.fetchBlogs.mockResolvedValue(mockBlogs);
    blogAPI.createBlog.mockClear();
    blogAPI.updateBlog.mockClear();
    blogAPI.deleteBlog.mockClear();
    global.confirm.mockClear();
    uploadToSupabase.mockResolvedValue('http://mockurl.com/new-image.jpg');
  });

  // TC-BLOG-01: Menambahkan artikel blog baru
  test('TC-BLOG-01: Admin harus bisa menambahkan artikel blog baru', async () => {
    render(<Blog />);
    await screen.findByText(/Daftar Blog/i);

    // ACT: Mengisi form sesuai data uji
    fireEvent.change(screen.getByPlaceholderText(/judul blog/i), { target: { value: 'Panduan Mencari Kerja 2025' } });
    fireEvent.change(screen.getByPlaceholderText(/nama penulis/i), { target: { value: 'Admin Tim' } });
    fireEvent.change(screen.getByPlaceholderText(/isi blog/i), { target: { value: 'Berikut adalah panduan...' } });
    fireEvent.click(screen.getByRole('button', { name: /tambah/i }));

    // ASSERT
    await waitFor(() => {
      expect(blogAPI.createBlog).toHaveBeenCalled();
      // ✅ PERBAIKAN: Sesuaikan teks agar cocok dengan pesan sukses yang sebenarnya
      expect(screen.getByText(/Blog berhasil ditambahkan!/i)).toBeInTheDocument();
    });
  });

  // TC-BLOG-02: Validasi judul blog kosong
  test('TC-BLOG-02: Form tidak boleh tersimpan jika judul blog kosong', async () => {
    render(<Blog />);
    await screen.findByText(/Daftar Blog/i);
    
    fireEvent.change(screen.getByPlaceholderText(/nama penulis/i), { target: { value: 'Admin Tim' } });
    fireEvent.click(screen.getByRole('button', { name: /tambah/i }));

    await waitFor(() => {
      expect(blogAPI.createBlog).not.toHaveBeenCalled();
    });
  });

  // TC-BLOG-03: Mengedit artikel blog
  test('TC-BLOG-03: Admin harus bisa mengedit konten artikel', async () => {
    render(<Blog />);
    const row = await screen.findByText('Judul Lama');
    const rowElement = row.closest('tr');

    const editButton = within(rowElement).getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const contentInput = screen.getByPlaceholderText(/isi blog/i);
    fireEvent.change(contentInput, { target: { value: 'Konten artikel telah diperbarui...' } });
    fireEvent.click(screen.getByRole('button', { name: /simpan perubahan/i }));
    
    await waitFor(() => {
      expect(blogAPI.updateBlog).toHaveBeenCalledWith(1, expect.objectContaining({
        content: 'Konten artikel telah diperbarui...'
      }));
    });
  });

  // TC-BLOG-04: Menghapus artikel blog
  test('TC-BLOG-04: Admin harus bisa menghapus artikel blog', async () => {
    blogAPI.fetchBlogs.mockResolvedValue([{ ...mockBlogs[0], id: 3 }]);
    render(<Blog />);
    const row = await screen.findByText('Judul Lama');
    const rowElement = row.closest('tr');
    
    const deleteButton = within(rowElement).getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // ✅ PERBAIKAN: Sesuaikan teks konfirmasi agar cocok
    expect(global.confirm).toHaveBeenCalledWith('Yakin ingin menghapus blog ini?');
    
    await waitFor(() => {
      expect(blogAPI.deleteBlog).toHaveBeenCalledWith(3);
    });
  });
});