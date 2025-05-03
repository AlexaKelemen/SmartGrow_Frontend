import {Link} from 'react-router-dom';
import {routes} from '@/router';

/**
 * Header component for site navigation.
 *
 * Dynamically loads `routes` configuration and populates the navigation menu based on the `navLabel` metadata.
 *
 * @author Taggerkov
 * @returns {JSX.Element} The Header component with navigation links.
 */
function Header() {
    const flattenedRoutes = routes.flatMap(route => [
        {path: route.path, navLabel: route.navLabel},
        ...(route.children ? route.children.map(child => ({
            path: child.path,
            navLabel: child.navLabel,
        })) : []),
    ]).filter(link => link.navLabel);

    return (
        <header className="header">
            <div className="nav-main">
                <Link to="/" className="site-title">SmartGrow</Link>
                <nav className="nav-links">
                    {flattenedRoutes.map((link, index) => (
                        <Link key={index} to={link.path}>
                            {link.navLabel}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}

export default Header;