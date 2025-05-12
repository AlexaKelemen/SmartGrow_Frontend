/**
 * @file GaugeHumidity.jsx
 * @description React wrapper component for visualizing relative humidity as a percentage gauge.
 *
 * Wraps `GaugeIdealBand` with styling and label logic tailored for humidity control.
 * Uses `%` as the unit and provides meaningful labels for greenhouse environments.
 *
 * @see GaugeIdealBand
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.4.7
 */

import {GaugeIdealBand} from '../GaugeIdealBand';
import {useCSSVar} from '../useCommonGaugeTheme';

/**
 * GaugeHumidity
 *
 * A visual gauge component, configured to represent humidity percentages.
 *
 * @param {object} props - The gauge configuration props.
 * @param {number} props.value - The current humidity value in percent.
 * @param {number} [props.min=0] - Minimum scale value (usually 0%).
 * @param {number} [props.max=100] - Maximum scale value (usually 100%).
 * @param {number} [props.minIdeal=60] - Start of the ideal humidity range.
 * @param {number} [props.maxIdeal=80] - End of the ideal humidity range.
 * @param {number|null} [props.offset] - Optional override for ideal zone transition buffer.
 * @returns {JSX.Element} A stylized gauge for humidity control visualization.
 *
 * @example
 * <GaugeHumidity value={76} min={0} max={100} minIdeal={60} maxIdeal={80} />
 */
export function GaugeHumidity(props) {
    return (
        <GaugeIdealBand
            {...props}
            formatValue={v => `${v}%`}
            colors={{
                low: useCSSVar('--colorHumidityDry'),
                preIdeal: useCSSVar('--colorHumidityLow'),
                ideal: useCSSVar('--colorHumidityIdeal'),
                postIdeal: useCSSVar('--colorHumidityHigh'),
                high: useCSSVar('--colorHumiditySaturated')
            }}
            labels={{
                low: 'Dry',
                preIdeal: 'Low',
                ideal: 'Ideal',
                postIdeal: 'Humid',
                high: 'Saturated'
            }}
        />
    );
}