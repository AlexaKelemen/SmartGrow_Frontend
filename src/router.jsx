import { createHashRouter } from 'react-router-dom';
import App from './App';
import SensorReadingsPage from '@/pages/views/SensorReadingsPage';
import PresetsPage from '@/pages/views/PresetPage';
import LoginPage from '@/pages/views/LoginPage';
import CreatePresetForm from '@/pages/views/CreatePresetForm';
import GreenhousesPage from '@/pages/views/GreenhousePage';
import EditPresetPage from "@/pages/views/EditPresetPage"; 
import { element } from 'prop-types';
import LightingPage from './pages/views/LightingPage';

import SoilHumidityPage from './pages/views/SoilHumidityPage';

import FertilizationPage from './pages/views/FertilizationPage';
import WateringPage from './pages/views/WateringPage';


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
                
                path: 'presets/edit',
                element: <EditPresetPage/>,
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

                path: 'soilhumidity',
                element: <SoilHumidityPage />,
                navLabel: 'Soil Humidity Levels'

                path: 'fertilization',
                element: <FertilizationPage />,
                navLabel: 'Fertilization',
            },
            {
                path: 'watering',
                element: <WateringPage />,
                navLabel: 'Watering',

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
