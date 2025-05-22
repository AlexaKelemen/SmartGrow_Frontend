/*
 * Copyright © 2025 Taggerkov
 * Licensed under the MIT License. See LICENSE file in: https://github.com/Taggerkov/openpokedex, for full license information.
 */

/**
 * @file App.jsx
 * @description Root layout component for the SmartGrow application.
 *
 * This file defines the top-level structure of the app, including the header,
 * footer, and main content area (which is populated via React Router's <Outlet>).
 *
 * All routed views are rendered inside this layout.
 *
 * @see router.jsx for route definitions
 * @see Header.jsx
 * @see Footer.jsx
 * @version 1.2.0
 * @since 0.0.1
 * @author Taggerkov and SophiaJustin
 */

import { Outlet, useLocation } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePush } from "@/hooks/push/usePush";
import { useEffect } from "react";

/**
 * Application layout component.
 * Renders the header, the current page content based on the route, and a global footer.
 *
 * Also loads available ServiceWorkers if compatible.
 *
 * @returns {JSX.Element} The full application layout.
 */

function App() {
    const { runPush } = usePush();
    const location = useLocation();

    useEffect(() => {
        const setupPush = async () => await runPush();
        setupPush();
    }, []);

    const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
    const hideLayout = !isLoggedIn && location.pathname === "/";

    return (
        <div className="app">
            {!hideLayout && <Header />}
            <main className="main">
                <Outlet />
            </main>
            {!hideLayout && <Footer />}
        </div>
    );
}

export default App;