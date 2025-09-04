import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  // Mock matchMedia
  const matchMediaMock = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
  vi.stubGlobal('matchMedia', matchMediaMock);

  // Mock getComputedStyle
  const computedStyleMock = vi.fn().mockImplementation(() => ({}));
  vi.stubGlobal('getComputedStyle', computedStyleMock);
});
