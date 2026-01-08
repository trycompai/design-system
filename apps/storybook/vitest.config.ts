import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        '../../packages/design-system/src/components/**/*.tsx',
        '../../packages/design-system/lib/**/*.ts',
      ],
      exclude: [
        '**/*.stories.tsx',
        '**/index.ts',
        '**/*.test.{ts,tsx}',
      ],
      thresholds: {
        statements: 70,
        branches: 60,
        functions: 70,
        lines: 70,
      },
    },
    projects: [
      // Storybook tests - runs tests from stories in a real browser
      {
        extends: true,
        plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['./.storybook/vitest.setup.ts'],
        },
      },
      // Unit tests - runs .test.tsx files with jsdom
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['**/*.test.{ts,tsx}'],
          exclude: ['node_modules', 'dist'],
          setupFiles: ['./vitest.setup.ts'],
        },
      },
    ],
  },
});
