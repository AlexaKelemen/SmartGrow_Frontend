import { createHashRouter } from 'react-router-dom';
import App from './App';
import SensorReadingsPage from '@/pages/views/SensorReadingsPage';
import PresetsPage from '@/pages/views/PresetPage';
import LoginPage from '@/pages/views/LoginPage';
import CreatePresetForm from '@/pages/views/CreatePresetForm';
import GreenhousesPage from '@/pages/views/GreenhousePage';
import { element } from 'prop-types';
import LightingPage from './pages/views/LightingPage';

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
                path: 'presets/create',
                element: <CreatePresetForm />,
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
                path: 'lighting',
                element: <LightingPage />,
                navLabel: 'Lighting',
            },
            {
                path: 'hidden',
                element: <div>Hidden Page</div>,
                navLabel: 'Hidden',
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
