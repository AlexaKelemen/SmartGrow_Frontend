import {Link} from 'react-router-dom';
import {routes} from "@/router"

/**
 * Header component for site navigation.
 *
 * Dynamically loads `routes` configuration and populates the navigation menu based on the `navLabel` metadata.
 *
 * @author Taggerkov
 * @returns {JSX.Element} The Header component with navigation links.
 */
function Header() {
    const flattenedRoutes = routes.flatMap(route => route.children || []).filter(r => r.navLabel);
    return (
        <header className="header">
            <div className="nav-main">
                <Link to="/" className="site-title">SmartGrow</Link>
                <nav className="nav-links">{flattenedRoutes.map((link, i) => (
                    <Link key={i} to={`/${link.path}`}>{link.navLabel}</Link>))}
                </nav>
            </div>
        </header>
    );
}

export default Header;