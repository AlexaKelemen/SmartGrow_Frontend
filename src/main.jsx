/*
 * Copyright © 2025 Taggerkov
 * Licensed under the MIT License. See LICENSE file in: https://github.com/Taggerkov/openpokedex, for full license information.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';
import '@/styles/global.css';
import '@/styles/anime.css';
import '@/styles/themes/light.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found.');

/**
 * Mounts the React app.
 */
function renderApp() {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

/**
 * Starts MSW in development and then renders the app.
 */
async function enableMockingAndRender() {
  if (process.env.NODE_ENV === 'development') {
    try {
      const { worker } = await import('@/mocks/browser');
      await worker.start({
        onUnhandledRequest: 'warn'
      });
      console.info('[MSW] Mock Service Worker started.');
    } catch (error) {
      console.warn('[MSW] Failed to start the mock service worker:', error);
    }
  } else {
    console.info('[MSW] Skipped (using real backend).');
  }

  renderApp();
}

// ✅ This must be placed AFTER the function definition
enableMockingAndRender();
