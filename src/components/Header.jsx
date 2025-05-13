import {Link} from 'react-router-dom';
import {routes} from "@/router"
import { useState } from 'react';

/**
 * Header component for site navigation.
 *
 * Dynamically loads `routes` configuration and populates the navigation menu based on the `navLabel` metadata.
 *
 * @author Taggerkov
 * @returns {JSX.Element} The Header component with navigation links.
 */
function Header() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const toggleDropdown = (label) => {
        setOpenDropdown(prev => (prev === label ? null : label));
    };

    const flattenedRoutes = routes.flatMap(route => route.children || []).filter(r => r.navLabel);
    const methodsLabels = ['Lighting', 'Soil Humidity Levels', 'Fertilization', 'Watering'];

    const mainLinks = flattenedRoutes.filter(link => !methodsLabels.includes(link.navLabel));
    const methodLinks = flattenedRoutes.filter(link => methodsLabels.includes(link.navLabel));

    return (
        <header className="header">
            <div className="nav-main">
                <Link to="/" className="site-title">SmartGrow</Link>
                <nav className="nav-links">
                    {mainLinks.map((link, i) => (
                        <Link key={i} to={`/${link.path}`}>{link.navLabel}</Link>
                    ))}
                    {/* METHODS DROPDOWN */}
                    <div className="dropdown">
                        <span className="dropdown-toggle" onClick={() => toggleDropdown('Methods')}>
                            Methods
                        </span>
                        {openDropdown === 'Methods' && (
                            <div className="dropdown-menu">
                                {methodLinks.map((link, i) => (
                                    <Link key={i} to={`/${link.path}`}>{link.navLabel}</Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;