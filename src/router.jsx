/**
 * @file router.jsx
 * @description Central routing configuration for the SmartGrow application.
 *
 * Defines all client-side routes using `createHashRouter` from React Router.
 * Each route may include custom metadata like `navLabel`, which can be used by other
 * components (e.g., navigation headers) for dynamic UI generation.
 *
 * This file exports both:
 * - `router`: The configured router for `RouterProvider`
 * - `routes`: The raw route configuration array, useful for sidebar or breadcrumb logic
 *
 * @see Header.jsx for usage of `navLabel`
 * @see https://reactrouter.com/en/main/routers/create-hash-router
 * @author Taggerkov
 * @version 1.5.0
 * @since 0.0.1
 */

import {createHashRouter} from 'react-router-dom';
import App from '@/App';
import LoginPage from '@/pages/views/LoginPage';
import RequireAuth from "@/components/RequireAuth";
import HomePage from '@/pages/views/HomePage';
import GreenhousesPage from '@/pages/views/GreenhousePage';
import PairGreenhousePage from "@/pages/views/PairGreenhousePage";
import EditGreenhousePage from "@/pages/views/EditGreenhouse";
import GreenhouseLogs from "@/pages/views/GreenhouseLogs";
import DashboardPage from '@/pages/views/DashboardPage';
import PresetsPage from '@/pages/views/PresetPage';
import CreatePresetForm from '@/pages/views/CreatePresetForm';
import EditPresetPage from "@/pages/views/EditPresetPage";
import LightingPage from '@/pages/views/LightingPage';
import SoilHumidityPage from '@/pages/views/SoilHumidityPage';
import FertilizationPage from '@/pages/views/FertilizationPage';
import WateringPage from '@/pages/views/WateringPage';
import AboutPage from '@/pages/views/AboutPage';
import UserSettingsPage from '@/pages/views/UserSettingsPage';


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
 *   element: <DashboardPage />,
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
        path: '/', element: <App/>,
        children: [
            {
                path: '',
                element: <LoginPage/>,
            },
            {
                path: 'home',
                element: <HomePage/>,
                navLabel: 'Home',
            },
            {
                path: 'greenhouses',
                element: <GreenhousesPage/>,
                navLabel: 'Greenhouses',
            },
            {
                path: "greenhouses/:id/presets",
                element: <PresetsPage />,
            },

            {
                path: 'pair-greenhouse',
                element: <PairGreenhousePage/>,
            },
            {
                path: 'edit-greenhouse/:id',
                element: <EditGreenhousePage/>,
            },
            {
                path: "presets",         
                element: <PresetsPage />,
                navLabel: "Presets"
              },
            {
                path: 'presets/create',
                element: <CreatePresetForm/>,
            },
            {
                path: 'presets/edit/:id',
                element: <EditPresetPage/>,
            },
            {
                path: 'greenhouses/logs/:id',
                element: <GreenhouseLogs/>,
            },
            {
                path: 'dashboard/:id',
                element: <DashboardPage/>,
            },
            {
                path: 'greenhouses/:id/lighting',
                element: <LightingPage/>,
            },
            {

                path: 'greenhouses/:id/soil-humidity',
                element: <SoilHumidityPage/>,
            },
            {
                path: 'greenhouses/:id/fertilization',
                element: <FertilizationPage/>,
            },
            {
                path: 'greenhouses/:id/watering',
                element: <WateringPage/>,
            },
            {
                path: 'user-settings',
                element: <UserSettingsPage/>,
                navLabel: 'User Settings',
            },
            {
                path: 'about',
                element: <AboutPage/>,
                navLabel: 'About',
            },
        ],
    },
];

/**
 * Application router configuration for SmartGrow.
 *
 * This `router` constant defines the routing for the SmartGrow application using a **HashRouter**.
 * It is created by calling `createHashRouter` with the `routes` configuration.
 *
 * The `router` object is passed to `RouterProvider` to enable routing in the application,
 * allowing navigation between different views based on the URL.
 *
 * @see https://reactrouter.com/en/main/routers/create-hash-router
 */
const router = createHashRouter(
    routes.map(route => ({
        ...route,
        children: route.children,
    }))
);

// Export the router as default for usage with RouterProvider
export default router;
// Export the routes separately for use in lookups
export {routes};