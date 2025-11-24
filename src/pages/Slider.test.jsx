import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Slider from './Slider';
import { sliderAPI } from '../services/sliderAPI';
import { uploadToSupabase } from '../utils/supabaseUpload';

// Mock dependencies
jest.mock('../services/sliderAPI');
jest.mock('../utils/supabaseUpload');
global.confirm = jest.fn(() => true);

describe('Pengujian Halaman Manajemen Slider', () => {
  const mockSliders = [{
    id: 1,
    title_slider: "Judul Slider Lama",
    image: "image-lama.png"
  }];

  beforeEach(() => {
    sliderAPI.fetchSliders.mockResolvedValue(mockSliders);
    sliderAPI.createSlider.mockClear();
    sliderAPI.updateSlider.mockClear();
    sliderAPI.deleteSlider.mockClear();
    global.confirm.mockClear();
    uploadToSupabase.mockResolvedValue('http://mockurl.com/new-slider.png');
  });

  // TC-SLIDER-01: Test for adding a new slider [cite: 821]
  test('TC-SLIDER-01: Admin harus bisa menambahkan slider baru', async () => {
    render(<Slider />);
    await screen.findByText(/daftar slider/i);

    // Fill the form with test data [cite: 889]
    fireEvent.change(screen.getByPlaceholderText(/judul slider/i), { target: { value: 'Promo Awal Bulan' } });
    fireEvent.click(screen.getByRole('button', { name: /tambah/i }));

    await waitFor(() => {
      expect(sliderAPI.createSlider).toHaveBeenCalled();
      expect(screen.getByText(/slider berhasil ditambahkan!/i)).toBeInTheDocument();
    });
  });

  // TC-SLIDER-02: Test for validation when slider title is empty [cite: 821]
  test('TC-SLIDER-02: Form tidak boleh tersimpan jika judul slider kosong', async () => {
    render(<Slider />);
    await screen.findByText(/daftar slider/i);

    // Leave the title empty and click submit
    fireEvent.click(screen.getByRole('button', { name: /tambah/i }));

    await waitFor(() => {
      expect(sliderAPI.createSlider).not.toHaveBeenCalled();
    });
  });

  // TC-SLIDER-03: Test for editing an existing slider [cite: 821]
  test('TC-SLIDER-03: Admin harus bisa mengedit judul slider', async () => {
    render(<Slider />);
    const row = await screen.findByText('Judul Slider Lama');
    const rowElement = row.closest('tr');
    
    const editButton = within(rowElement).getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const titleInput = screen.getByPlaceholderText(/judul slider/i);
    fireEvent.change(titleInput, { target: { value: 'Diskon Spesial Hari Ini' } });
    fireEvent.click(screen.getByRole('button', { name: /simpan perubahan/i }));

    await waitFor(() => {
      expect(sliderAPI.updateSlider).toHaveBeenCalledWith(1, expect.objectContaining({
        title_slider: 'Diskon Spesial Hari Ini'
      }));
    });
  });

  // TC-SLIDER-04: Test for deleting a slider [cite: 827]
  test('TC-SLIDER-04: Admin harus bisa menghapus slider', async () => {
    sliderAPI.fetchSliders.mockResolvedValue([{ ...mockSliders[0], id: 4 }]);
    render(<Slider />);
    const row = await screen.findByText('Judul Slider Lama');
    const rowElement = row.closest('tr');
    
    const deleteButton = within(rowElement).getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(global.confirm).toHaveBeenCalledWith('Yakin ingin menghapus data ini?');
    await waitFor(() => {
      expect(sliderAPI.deleteSlider).toHaveBeenCalledWith(4);
    });
  });
});