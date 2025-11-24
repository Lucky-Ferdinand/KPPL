import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Jobs from './Jobs';
import { jobAPI } from '../../services/jobAPI';

jest.mock('../../services/jobAPI');

describe('Pengujian Komponen Guest Jobs', () => {
  // TC-GUEST-02: Filter lowongan
  test('TC-GUEST-02: Pengunjung harus bisa memfilter lowongan berdasarkan kategori', async () => {
    const mockJobsData = [
      { id: 1, title_job: 'UI Designer', category: 'Desain' },
      { id: 2, title_job: 'Sales Executive', category: 'Marketing' },
      { id: 3, title_job: 'SEO Specialist', category: 'Marketing' },
    ];
    jobAPI.fetchJobs.mockResolvedValue(mockJobsData);

    render(<Jobs />);
    
    // Tunggu tombol filter muncul
    const marketingButton = await screen.findByRole('button', { name: /marketing/i });
    fireEvent.click(marketingButton);

    await waitFor(() => {
      // Pastikan lowongan yang sesuai ditampilkan
      expect(screen.getByText('Sales Executive')).toBeInTheDocument();
      expect(screen.getByText('SEO Specialist')).toBeInTheDocument();
      // Pastikan lowongan yang tidak sesuai hilang
      expect(screen.queryByText('UI Designer')).not.toBeInTheDocument();
    });
  });
});