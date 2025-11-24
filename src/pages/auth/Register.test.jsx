import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';
import { supabase } from '../../utils/supabaseClient';
import bcrypt from 'bcryptjs';

jest.mock('../../utils/supabaseClient');
jest.mock('bcryptjs');
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Pengujian Halaman Register', () => {
  // TC-AUTH-04: Registrasi berhasil
  test('TC-AUTH-04: Admin baru harus berhasil mendaftar dengan data yang valid', async () => {
    supabase.from.mockReturnValue({
      insert: jest.fn().mockResolvedValue({ error: null }),
    });
    bcrypt.hash.mockResolvedValue('hashed_password');

    render(<MemoryRouter><Register /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText(/masukkan nama admin/i), { target: { value: 'admin2' } });
    fireEvent.change(screen.getByPlaceholderText(/^masukkan password/i), { target: { value: 'baru123' } });
    fireEvent.change(screen.getByPlaceholderText(/ulangi password/i), { target: { value: 'baru123' } });
    fireEvent.click(screen.getByRole('button', { name: /daftar sekarang/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  // TC-AUTH-05: Konfirmasi password salah
  test('TC-AUTH-05: Harus menampilkan error jika konfirmasi password tidak cocok', async () => {
    render(<MemoryRouter><Register /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText(/masukkan nama admin/i), { target: { value: 'admin3' } });
    fireEvent.change(screen.getByPlaceholderText(/^masukkan password/i), { target: { value: 'testing' } });
    fireEvent.change(screen.getByPlaceholderText(/ulangi password/i), { target: { value: 'salah' } });
    fireEvent.click(screen.getByRole('button', { name: /daftar sekarang/i }));
    
    const errorMessage = await screen.findByText(/password dan konfirmasi tidak sama/i);
    expect(errorMessage).toBeInTheDocument();
  });
});