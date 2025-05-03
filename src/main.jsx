/*
 * Copyright © 2025 Taggerkov
 * Licensed under the MIT License. See LICENSE file in: https://github.com/Taggerkov/openpokedex, for full license information.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import '@/styles/global.css'
import '@/styles/anime.css'
import '@/styles/themes/light.css'

// Main entry point for the React application.
// Attaches React to the root DOM node and sets up routing.

// Locate the root DOM element for React to mount into.
const root = document.getElementById('root');
if (!root) {
    throw new Error('Root element not found.');
}

// Render the app inside <StrictMode> for highlighting potential problems.
ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)