import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Hero from './Hero';
import { companyAPI } from '../../services/companyAPI';

// Mock companyAPI
jest.mock('../../services/companyAPI');

describe('Pengujian Komponen Hero', () => {

  // Implementasi dari TC-GUEST-01
  test('TC-GUEST-01: Pengunjung harus bisa mencari nama perusahaan', async () => {
    // 1. ARRANGE
    const mockCompanies = [
      { id: 1, company_name: 'Google Inc.', address: 'USA', description: 'Search Engine' }
    ];
    companyAPI.searchCompanies.mockResolvedValue(mockCompanies);
    
    render(<Hero />);

    // 2. ACT: Simulasikan input dan klik cari sesuai dokumen
    const searchInput = screen.getByPlaceholderText(/search company name.../i);
    fireEvent.change(searchInput, { target: { value: 'Google' } });

    const searchButton = screen.getByRole('button', { name: /find now/i });
    fireEvent.click(searchButton);

    // 3. ASSERT: Periksa apakah hasilnya muncul di layar
    await waitFor(() => {
      // Pastikan API dipanggil dengan kata kunci yang benar
      expect(companyAPI.searchCompanies).toHaveBeenCalledWith('Google');
      
      // Pastikan hasil pencarian ditampilkan
      expect(screen.getByText(/google inc./i)).toBeInTheDocument();
    });
  });
});