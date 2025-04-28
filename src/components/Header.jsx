/*
 * Copyright © 2025 Taggerkov
 * Licensed under the MIT License. See LICENSE file in: https://github.com/Taggerkov/openpokedex, for full license information.
 */

import {Link, useNavigate} from 'react-router-dom';

/**
 * Header component for site navigation.
 *
 * @author Taggerkov,AlexaKelemen
 * @returns {JSX.Element} The Header component with navigation links and search input.
 */
function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="nav-main">
                <Link to="/" className="site-title">SmartGrow</Link>
                <nav className="nav-links">
                    <Link to="/">X</Link>
                    <Link to="/about">Y</Link>
                     <Link to="/sensor-readings">Sensor Readings</Link>
                    // TODO
                </nav>
                // TODO
            </div>
        </header>
    );
}

export default Header;