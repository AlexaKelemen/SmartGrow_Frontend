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

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
