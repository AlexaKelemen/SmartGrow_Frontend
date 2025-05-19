/**
 * @file Dashboard.jsx
 * @description SmartGrow dashboard view displaying sensor gauge data.
 *
 * Renders temperature, humidity, and brightness gauges in a consistent layout using the
 * `dashboardModel` to provide live values.
 * Gracefully handles loading and error states.
 *
 * The view delegates business logic to the ViewModel and displays a clean, reactive UI.
 *
 * @see dashboardModel
 * @see GaugeTemperature
 * @see GaugeHumidity
 * @see GaugeBrightness
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.5.0
 */

import '@/styles/pages/dashboard.css';
import {dashboardModel} from '@/pages/viewmodels/dashboardModel';
import {GaugeHumidity, GaugeBrightness, GaugeTemperature} from '@/components/gauges/wrappers';

/**
 * GaugeCard
 *
 * Wraps a gauge component with a label and background color.
 * Used to standardize layout across multiple sensor widgets.
 *
 * @param {Object} props
 * @param {string} props.label - Human-readable sensor label
 * @param {string} props.color - Background color for the label badge
 * @param {JSX.Element} props.children - Gauge content to render
 * @returns {JSX.Element}
 */
function GaugeCard({label, color, children}) {
    return (
        <div className="gauge-card">
            {children}
            <div className="gauge-label" style={{backgroundColor: color}}>
                {label}
            </div>
        </div>
    );
}

/**
 * Dashboard
 *
 * Main SmartGrow dashboard view displaying all sensor gauges.
 * Reactively handles data loading and errors via `dashboardModel()`.
 *
 * @returns {JSX.Element}
 */
export default function Dashboard({greenhouseId = 1 }) {
    const {
        getTemperatureReading,
        getHumidityReading,
        getBrightnessReading,
        isLoading,
        isError
    } = dashboardModel(greenhouseId);

    if (isLoading) {
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>
                <div className="gauge-row">
                    <GaugeCard label="Temperature" color="var(--colorTempHot)">
                        <p>Loading...</p>
                    </GaugeCard>
                    <GaugeCard label="Soil humidity" color="var(--colorHumidityIdeal)">
                        <p>Loading...</p>
                    </GaugeCard>
                    <GaugeCard label="Brightness" color="var(--colorBrightBright)">
                        <p>Loading...</p>
                    </GaugeCard>
                </div>
            </div>
        );
    }
    if (isError) return <div className="dashboard">Error loading sensor data.</div>;

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="gauge-row">
                <GaugeCard label="Temperature" color="var(--colorTempHot)">
                    <GaugeTemperature {...getTemperatureReading()} />
                </GaugeCard>
                <GaugeCard label="Soil humidity" color="var(--colorHumidityIdeal)">
                    <GaugeHumidity {...getHumidityReading()} />
                </GaugeCard>
                <GaugeCard label="Brightness" color="var(--colorBrightBright)">
                    <GaugeBrightness {...getBrightnessReading()} />
                </GaugeCard>
                <GaugeCard label="Air humidity" color="var(--colorHumidityIdeal)"> 
                    <GaugeHumidity {...getHumidityReading()} />
                </GaugeCard>
            </div>
        </div>
    );
}