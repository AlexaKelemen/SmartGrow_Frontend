import { createHashRouter } from 'react-router-dom';
import App from './App';
import SensorReadingsPage from '@/pages/views/SensorReadingsPage';
import PresetsPage from '@/pages/views/PresetPage';
import LoginPage from '@/pages/views/LoginPage';
import GreenhousesPage from '@/pages/views/GreenhousePage';
import PairGreenhousePage from "@/pages/views/PairGreenhousePage";
const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <p>Home</p>,
                navLabel: 'Home',
            },
            {
                path: 'sensor-readings',
                element: <SensorReadingsPage />,
                navLabel: 'Sensor Readings',
            },
            {
                path: 'presets',
                element: <PresetsPage />,
                navLabel: 'Presets',
            },
            {
                path: 'login',
                element: <LoginPage />,
                navLabel: 'Login',
            },
            {
                path: 'greenhouses',
                element: <GreenhousesPage />,
                navLabel: 'Greenhouses',
            },
            {
                path: 'hidden',
                element: <div>Hidden Page</div>,
                navLabel: 'Hidden',
            },
            {
                path: 'pair-greenhouse',
                element: <PairGreenhousePage />,
                navLabel: 'Pair Greenhouse', // optional
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
        children: route.children?.map(child => ({
            path: child.path,
            element: child.element,
        })),
    }))
);

export default router;
export { routes };
