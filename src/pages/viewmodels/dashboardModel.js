/**
 * @file dashboardModel.js
 * @description Model hook for transforming sensor API data into view-ready gauge props.
 *
 * Uses `useSensorReadings` to fetch the latest sensor data and safely maps them into value + config
 * objects for Temperature, Humidity, and Brightness gauges.
 *
 * This model currently hardcodes all min/max/ideal bounds until the backend API supports them.
 *
 * @see useSensorReadings
 * @see Dashboard.jsx
 * @author Taggerkov
 * @version 1.2.0
 * @since 0.5.0
 */

import {useSensor} from "@/hooks";

/**
 * dashboardModel
 *
 * Hooks into sensor API data and returns preformatted value structures for each gauge.
 * Will automatically update on API response change via `useSensorReadings`.
 *
 * @returns {{
 *   isLoading: boolean,
 *   isError: boolean,
 *   getTemperatureReading: () => { value: number, min: number, max: number, minIdeal: number, maxIdeal: number },
 *   getHumidityReading: () => { value: number, min: number, max: number, minIdeal: number, maxIdeal: number },
 *   getBrightnessReading: () => { value: number }
 * }}
 *
 * @example
 * const model = dashboardModel();
 * const temp = model.getTemperatureReading();
 * <GaugeTemperature {...temp} />
 */
export function dashboardModel() {
    const { latestReading, isLoading, isError } = useSensor();
    const safe = (key, fallback = 0) => latestReading?.[key] ?? fallback;
    return {
        isLoading, isError,
        getTemperatureReading: () => ({ value: safe('airTemperature'), min: 0, max: 40, minIdeal: 18, maxIdeal: 28 }),
        getHumidityReading: () => ({ value: safe('soilHumidity'), min: 0, max: 100, minIdeal: 60, maxIdeal: 80 }),
        getBrightnessReading: () => ({ value: safe('brightness') })
    };
}