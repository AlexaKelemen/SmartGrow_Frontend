import {createHashRouter} from 'react-router-dom'
import App from '@/App'
import SensorReadingsPage from '@/pages/views/SensorReadingsPage';
import PresetsPage from '@/pages/views/PresetPage';
import LoginPage from '@/pages/views/LoginPage';
import { element } from 'prop-types';

// Router settings for the React application.
// Defines the routes and the router configuration.

/**
 * Defines all the routes for the SmartGrow application.
 *
 * The `routes` constant contains the configuration for all routes in the application.
 * Each route in the array must have a `path` and `element` property, but can also include
 * **custom metadata** such as `navLabel`. This metadata can be used for various purposes.
 * <br>`navLabel` is used for displaying the route into the navigation header, but other tags could serve any other custom logic.
 *
 * **General Structure: **
 * Each route object should have:
 * - `path`: The URL path for the route.
 * - `element`: The React component that should be rendered when the route is accessed.
 * - **Custom Metadata** (optional): Metadata like `navLabel`.
 *
 * Example of adding a custom `navLabel` for navigation:
 * ```js
 * {
 *   path: '/sensor-readings',
 *   element: <SensorReadingsPage />,
 *   navLabel: 'Sensor Readings', // This is used to display the link in the navigation
 * }
 * ```
 *
 * Routes with no `navLabel` or metadata will not appear in the navigation menu by default.
 * ```js
 * {
 *   path: '/hidden',
 *   element: <div>Hidden Page</div>,
 * }
 * ```
 * @example <p>Usage of the `navLabel` tag:</p>
 * ```js
 * // Flattening the routes to extract the path and navLabel for use in navigation
 * const flattenedRoutes = routes.flatMap(route => [
 *    {path: route.path, navLabel: route.navLabel},
 *    ...(route.children ? route.children.map(child => ({
 *        path: child.path,
 *        navLabel: child.navLabel,
 *    })) : []),
 * ]).filter(link => link.navLabel);  // Only keep routes with a navLabel
 * ```
 *
 * @author Taggerkov
 * @version 1.0
 * @type {Array<Object>} The route configuration array.
 * @see Header function in components/Header.jsx.
 */
const routes = [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <p>Home</p>,
                navLabel: 'Home',
            },
            {
                path: 'sensor-readings',
                element: <SensorReadingsPage/>,
                navLabel: 'Sensor Readings',
            },
            {
                path: 'presets',
                element: <PresetsPage/>,
                navLabel: 'Presets',
            },
            {
                path: 'login',
                element: <LoginPage />,
                navLabel: 'Login',
            },
            {
                path: 'hidden',
                element: <div>Hidden Page</div>,
            },
        ],
    },
];

/**
 * Application router configuration for SmartGrow.
 *
 * This `router` constant defines the routing for the SmartGrow application using a **HashRouter**.
 * It is created by calling `createHashRouter` with the `routes` configuration, which extracts the
 * `path` and `component` tags to render for each route.
 *
 * The `router` object is passed to `RouterProvider` to enable routing in the application, which
 * allows for navigation between different views based on the URL.
 *
 * @author Taggerkov
 * @version 2.0
 * @see https://reactrouter.com/en/main/routers/create-hash-router
 */
const router = createHashRouter(routes.map(route => ({
    ...route,
    children: route.children?.map(child => ({
        path: child.path,
        element: child.element,
    })),
})));

// Export the router as default for usage with RouterProvider
export default router;

// Export the routes separately for use in lookups
export {routes};