/**
 * @file RequireAuth.jsx
 * @description Route guard component that enforces authentication for protected routes.
 *
 * This component checks whether a user is authenticated using the global AuthContext.
 * If not authenticated, it redirects the user to the login route (`"/"`), preserving
 * the original location for post-login redirection.
 *
 * It should be used to wrap any route element that requires login.
 * @version 1.0.0
 * @since 0.8.0
 * @author Taggerkov
 * @see AuthProvider
 */

import {Navigate, useLocation} from 'react-router-dom';
import {checkAuth} from '@/context/authContext';

/**
 * Protects child components from being accessed without authentication.
 *
 * If the user is not authenticated, redirects to the login route (`/`).
 * If authenticated, render the wrapped children.
 *
 * @function RequireAuth
 * @param children - The components to render if the user is authenticated.
 * @returns {JSX.Element} A `<Navigate>` component if unauthorized; otherwise renders `children`.
 *
 * @example
 * {
 *   path: 'dashboard',
 *   element: <RequireAuth><DashboardPage /></RequireAuth>,
 * }
 */
export default function RequireAuth({children}) {
    const {user} = checkAuth();
    const location = useLocation();
    if (!user) return <Navigate to="/" state={{from: location}} replace/>;
    return <>{children}</>;
}