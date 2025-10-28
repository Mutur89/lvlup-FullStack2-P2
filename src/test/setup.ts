// src/test/setup.ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extiende los matchers de Vitest con los de testing-library
expect.extend(matchers);

// Limpia después de cada test
afterEach(() => {
  cleanup();
});