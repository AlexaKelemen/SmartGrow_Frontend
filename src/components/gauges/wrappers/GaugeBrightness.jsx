/**
 * @file GaugeBrightness.jsx
 * @description React wrapper component for displaying brightness levels as a radial gauge.
 *
 * This wrapper configures `GaugeMultiZoneRadial` with thresholds for dim to overload zones,
 * using percentage-based inputs and CSS-driven color theming.
 *
 * Ideal for monitoring indoor light levels or device brightness feedback.
 *
 * @see GaugeMultiZoneRadial
 * @see GaugeTemperature
 * @see GaugeHumidity
 * @version 1.0.0
 * @since 0.4.7
 * @author Taggerkov
 */

import {GaugeMultiZoneRadial} from '../GaugeMultiZoneRadial';
import {useCSSVar} from '../useCommonGaugeTheme';


/**
 * GaugeBrightness
 *
 * A radial gauge component for visualizing brightness as a percentage,
 * using multiple visual zones (e.g., Dark → Dim → Normal → Bright → Overload).
 *
 * @param {object} props - The gauge configuration props.
 * @param {number} props.value - Current brightness level as a percentage.
 * @param {number} [props.min=0] - Minimum value of the scale (typically 0%).
 * @param {number} [props.max=100] - Maximum value of the scale (typically 100%).
 * @returns {JSX.Element} A radial gauge with labeled brightness zones.
 *
 * @example
 * <GaugeBrightness value={72} />
 */
export function GaugeBrightness(props) {
    return (
        <GaugeMultiZoneRadial
            {...props}
            formatValue={v => `${v}%`}
            zones={[
                {limit: 20, color: useCSSVar('--colorBrightDark'), label: 'Dark'},
                {limit: 40, color: useCSSVar('--colorBrightDim'), label: 'Dim'},
                {limit: 60, color: useCSSVar('--colorBrightNormal'), label: 'Normal'},
                {limit: 80, color: useCSSVar('--colorBrightBright'), label: 'Bright'},
                {limit: 100, color: useCSSVar('--colorBrightOverload'), label: 'Overload'}
            ]}
        />
    );
}