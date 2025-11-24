import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { supabase } from '../../utils/supabaseClient';
import bcrypt from 'bcryptjs';

// Mock dependensi
jest.mock('../../utils/supabaseClient');
jest.mock('bcryptjs');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Pengujian Halaman Login', () => {
  // TC-AUTH-01: Login berhasil
  test('TC-AUTH-01: Admin harus berhasil login dengan kredensial yang valid', async () => {
    const mockAdminData = { id: 1, nama: 'luki', password: 'hashed_password' };
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockAdminData, error: null }),
    });
    bcrypt.compare.mockResolvedValue(true);

    render(<MemoryRouter><Login /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText(/masukkan nama admin/i), { target: { value: 'luki' } });
    fireEvent.change(screen.getByPlaceholderText(/masukkan password/i), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByRole('button', { name: /login sekarang/i }));

    await waitFor(() => {
      expect(screen.queryByText(/password salah/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/nama admin tidak ditemukan/i)).not.toBeInTheDocument();
    });
  });

  // TC-AUTH-02: Password salah
  test('TC-AUTH-02: Harus menampilkan pesan error saat password salah', async () => {
    const mockAdminData = { id: 1, nama: 'luki', password: 'hashed_password' };
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockAdminData, error: null }),
    });
    bcrypt.compare.mockResolvedValue(false);

    render(<MemoryRouter><Login /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText(/masukkan nama admin/i), { target: { value: 'luki' } });
    fireEvent.change(screen.getByPlaceholderText(/masukkan password/i), { target: { value: 'admin1211' } });
    fireEvent.click(screen.getByRole('button', { name: /login sekarang/i }));

    const errorMessage = await screen.findByText(/password salah/i);
    expect(errorMessage).toBeInTheDocument();
  });
  
  // TC-AUTH-03: Nama tidak ditemukan
  test('TC-AUTH-03: Harus menampilkan pesan error saat nama admin salah', async () => {
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: new Error('not found') }),
    });

    render(<MemoryRouter><Login /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText(/masukkan nama admin/i), { target: { value: 'tes' } });
    fireEvent.change(screen.getByPlaceholderText(/masukkan password/i), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByRole('button', { name: /login sekarang/i }));

    const errorMessage = await screen.findByText(/nama admin tidak ditemukan/i);
    expect(errorMessage).toBeInTheDocument();
  });
});