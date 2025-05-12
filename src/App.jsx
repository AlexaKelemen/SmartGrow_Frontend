/*
 * Copyright © 2025 Taggerkov
 * Licensed under the MIT License. See LICENSE file in: https://github.com/Taggerkov/openpokedex, for full license information.
 */

import { Outlet } from 'react-router-dom'
import Header from "@/components/Header"
import Footer from "@/components/Footer";

// Main application layout.
// Renders Header and switches pages via React Router's Outlet.

/**
 * Application layout component.
 * Renders the header, the current page content based on the route, and a global footer.
 *
 * @author Taggerkov
 * @returns {JSX.Element} The full application layout.
 */
function App() {
    return (
        <div className="app">
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App