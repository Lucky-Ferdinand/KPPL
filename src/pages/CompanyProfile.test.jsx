import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import CompanyProfile from './CompanyProfile';
import { companyAPI } from '../services/companyAPI';
import { uploadToSupabase } from '../utils/supabaseUpload';

// Mock dependencies
jest.mock('../services/companyAPI');
jest.mock('../utils/supabaseUpload');
global.confirm = jest.fn(() => true); // Mock the confirmation dialog

describe('Pengujian Halaman Company Profile', () => {
  const mockCompanies = [{
    id: 1,
    company_name: 'Inovasi Digital',
    description: 'Perusahaan IT...',
    logo: 'logo.svg',
    address: 'Jl. Sudirman, Jakarta'
  }];

  beforeEach(() => {
    // Reset mocks before each test
    companyAPI.fetchCompanies.mockResolvedValue(mockCompanies);
    companyAPI.createCompany.mockClear();
    companyAPI.updateCompany.mockClear();
    companyAPI.deleteCompany.mockClear();
    global.confirm.mockClear();
    uploadToSupabase.mockResolvedValue('http://mockurl.com/new-logo.svg');
  });

  // TC-COMP-01: Test for adding a new company profile
  test('TC-COMP-01: Admin harus bisa menambahkan profil perusahaan baru', async () => {
    render(<CompanyProfile />);
    await screen.findByText(/daftar perusahaan/i);

    // Fill the form according to test data
    fireEvent.change(screen.getByPlaceholderText(/nama perusahaan/i), { target: { value: 'Inovasi Digital' } });
    fireEvent.change(screen.getByPlaceholderText(/alamat/i), { target: { value: 'Jl. Sudirman, Jakarta' } });
    fireEvent.change(screen.getByPlaceholderText(/deskripsi perusahaan/i), { target: { value: 'Perusahaan IT...' } });
    fireEvent.click(screen.getByRole('button', { name: /tambah/i }));

    await waitFor(() => {
      expect(companyAPI.createCompany).toHaveBeenCalled();
      expect(screen.getByText(/data perusahaan berhasil ditambahkan!/i)).toBeInTheDocument();
    });
  });

  // TC-COMP-02: Test for validation when company name is empty
  test('TC-COMP-02: Form tidak boleh tersimpan jika nama perusahaan kosong', async () => {
    render(<CompanyProfile />);
    await screen.findByText(/daftar perusahaan/i);

    // Leave the company name empty
    fireEvent.change(screen.getByPlaceholderText(/alamat/i), { target: { value: 'Alamat' } });
    fireEvent.click(screen.getByRole('button', { name: /tambah/i }));

    await waitFor(() => {
      // The API should not be called due to the 'required' attribute on the input
      expect(companyAPI.createCompany).not.toHaveBeenCalled();
    });
  });

  // TC-COMP-03: Test for editing an existing company profile
  test('TC-COMP-03: Admin harus bisa mengedit alamat perusahaan', async () => {
    render(<CompanyProfile />);
    const row = await screen.findByText('Inovasi Digital'); // Find the row by company name
    const rowElement = row.closest('tr'); // Get the parent <tr> element
    
    // Find the edit button within that specific row and click it
    const editButton = within(rowElement).getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const addressInput = screen.getByPlaceholderText(/alamat/i);
    fireEvent.change(addressInput, { target: { value: 'Jl. Gatot Subroto, Jakarta Selatan' } });
    fireEvent.click(screen.getByRole('button', { name: /simpan perubahan/i }));

    await waitFor(() => {
      expect(companyAPI.updateCompany).toHaveBeenCalledWith(1, expect.objectContaining({
        address: 'Jl. Gatot Subroto, Jakarta Selatan'
      }));
    });
  });

  // TC-COMP-04: Test for deleting a company profile
  test('TC-COMP-04: Admin harus bisa menghapus profil perusahaan', async () => {
    companyAPI.fetchCompanies.mockResolvedValue([{ ...mockCompanies[0], id: 5 }]); // Use ID 5 as per the test case
    render(<CompanyProfile />);
    
    const row = await screen.findByText('Inovasi Digital');
    const rowElement = row.closest('tr');

    // Find the delete button within that row and click it
    const deleteButton = within(rowElement).getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    expect(global.confirm).toHaveBeenCalledWith('Yakin ingin menghapus data ini?');
    await waitFor(() => {
      expect(companyAPI.deleteCompany).toHaveBeenCalledWith(5);
    });
  });
});