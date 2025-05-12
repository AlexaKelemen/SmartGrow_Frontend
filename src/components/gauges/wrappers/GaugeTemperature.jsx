/**
 * @file GaugeTemperature.jsx
 * @description React wrapper component for visualizing temperature data on a semicircular gauge.
 *
 * This wrapper binds temperature-specific CSS variables and labels to the generic `GaugeIdealBand`
 * component, configuring it with standard degrees Celsius display and ideal thermal ranges.
 *
 * @see GaugeIdealRadial
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.4.7
 */

import {GaugeIdealRadial} from '../GaugeIdealRadial';
import {useCSSVar} from '../useCommonGaugeTheme';

/**
 * GaugeTemperature
 *
 * A themed wrapper around `GaugeIdealBand` for rendering temperature as a gauge.
 *
 * @param {object} props - The gauge configuration props.
 * @param {number} props.value - The current temperature value.
 * @param {number} [props.min=0] - The minimum temperature shown on the gauge.
 * @param {number} [props.max=40] - The maximum temperature shown on the gauge.
 * @param {number} [props.minIdeal=18] - Start of the ideal temperature range.
 * @param {number} [props.maxIdeal=28] - End of the ideal temperature range.
 * @param {number|null} [props.offset] - Optional override for transition zone thickness.
 * @returns {JSX.Element} A styled semicircular temperature gauge.
 *
 * @example
 * <GaugeTemperature value={23} min={0} max={40} minIdeal={18} maxIdeal={28} />
 */
export function GaugeTemperature(props) {
    return (
        <GaugeIdealRadial
            {...props}
            formatValue={v => `${v}ºC`}
            colors={{
                low: useCSSVar('--colorTempFreeze'),
                preIdeal: useCSSVar('--colorTempCold'),
                ideal: useCSSVar('--colorTempOk'),
                postIdeal: useCSSVar('--colorTempWarm'),
                high: useCSSVar('--colorTempHot')
            }}
            labels={{
                low: 'Freezing!',
                preIdeal: 'Cold',
                ideal: 'OK',
                postIdeal: 'Warm',
                high: 'Hot'
            }}
        />
    );
}