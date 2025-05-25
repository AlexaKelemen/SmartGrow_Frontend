/*
 * Copyright © 2025 Taggerkov
 * Licensed under the MIT License. See LICENSE file in: https://github.com/Taggerkov/openpokedex, for full license information.
 */

/**
 * @file main.jsx
 * @description Entry point for the SmartGrow React application.
 *
 * Responsible for:
 * - Mounting the React app into the root DOM element
 * - Initializing the router via <RouterProvider>
 * - Applying global styles and themes
 * - Wrapping the app in React.StrictMode for dev safety
 *
 * This is the first code executed when the frontend starts.
 *
 * @see router.jsx
 * @see App.jsx
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.0.1
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {AuthProvider} from "@/context/authContext";
import router from '@/router';
import '@/styles/global.css';
import '@/styles/anime.css';
import '@/styles/themes/light.css';

// Locate the root DOM element for React to mount into.
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found.');

// Render the app inside <StrictMode> for highlighting potential problems.
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>
);