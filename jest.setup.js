// jest.setup.js (VERSI BENAR)

// Polyfill untuk TextEncoder (hanya dibutuhkan sekali)
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock untuk IntersectionObserver (hanya dibutuhkan sekali)
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Import matchers untuk jest-dom (hanya dibutuhkan sekali)
import '@testing-library/jest-dom';