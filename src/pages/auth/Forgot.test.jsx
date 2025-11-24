import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Forgot from './Forgot';
import { supabase } from '../../utils/supabaseClient';

jest.mock('../../utils/supabaseClient');

describe('Pengujian Halaman Forgot Password', () => {
  // TC-AUTH-06: Verifikasi nama berhasil
  test('TC-AUTH-06: Harus menampilkan form password baru setelah nama diverifikasi', async () => {
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { id: 1 }, error: null }),
    });

    render(<Forgot />);
    fireEvent.change(screen.getByPlaceholderText(/masukkan nama admin/i), { target: { value: 'admin2' } });
    fireEvent.click(screen.getByRole('button', { name: /lanjut ganti password/i }));

    // Cek apakah form password baru muncul
    const newPasswordInput = await screen.findByPlaceholderText(/masukkan password baru/i);
    expect(newPasswordInput).toBeInTheDocument();
  });
});