/**
 * @file GaugeMultiZoneRadial.jsx
 * @description Generic React component for rendering radial gauges with discrete threshold zones.
 *
 * This gauge displays stepped ranges with custom labels, useful for brightness,
 * battery, signal strength, or anything measured in clear tiers.
 *
 * Zones are defined by `limit`, `color`, and `label`, and rendered in a radial layout.
 * If no custom tick list is provided, it auto-generates ticks from the zone limits.
 *
 * @see GaugeIdealRadial
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.4.7
 */

import GaugeComponent from 'react-gauge-component';
import { useCommonGaugeTheme } from './useCommonGaugeTheme';

/**
 * GaugeMultiZoneRadial
 *
 * A reusable gauge component for visualizing discrete multi-zone data (e.g., brightness, signal strength).
 * Zones are shown in a radial arc and labeled via tooltips. Ticks can be auto-generated or customized.
 *
 * @param {number} value - The current value to be displayed on the gauge.
 * @param {number} [min=0] - Minimum value of the gauge range.
 * @param {number} [max=100] - Maximum value of the gauge range.
 * @param {Array<{limit: number, color: string, label: string}>} zones - Array of visual thresholds.
 * @param {function} [formatValue=(v) => `${v}`] - Optional function to format the value label.
 * @param {?Array<{value: number}>} [ticks=null] - Optional array of tick positions. Defaults to zone limits.
 * @param {number} [arcWidth=0.3] - Width of the arc band.
 * @param {number} [arcPadding=0.02] - Space between arc segments.
 * @returns {JSX.Element} A fully styled radial gauge component.
 *
 * @example
 * <GaugeMultiZoneRadial
 *   value={72}
 *   zones={[
 *     { limit: 20, color: '#1e3a8a', label: 'Dark' },
 *     { limit: 40, color: '#3b82f6', label: 'Dim' },
 *     { limit: 60, color: '#22c55e', label: 'Normal' },
 *     { limit: 80, color: '#facc15', label: 'Bright' },
 *     { limit: 100, color: '#dc2626', label: 'Overload' }
 *   ]}
 * />
 */
export function GaugeMultiZoneRadial({
                                         value, min = 0, max = 100, zones, formatValue = v => `${v}`,
                                         ticks = null, arcWidth = 0.3, arcPadding = 0.02
                                     }) {
    const {
        colorText, pointerColor, pointerWidth, pointerLength,
        animationDelay, valueFontSize, tickFontSize
    } = useCommonGaugeTheme();
    const subArcs = [...zones.map(({limit, color, label}) => ({limit, color, tooltip: {text: label}}))];
    const tickList = ticks || zones.map(z => ({value: z.limit}));

    return (
        <GaugeComponent
            type="radial"
            value={value}
            minValue={min}
            maxValue={max}
            arc={{
                width: arcWidth,
                padding: arcPadding,
                subArcs
            }}
            pointer={{
                color: pointerColor,
                length: pointerLength,
                width: pointerWidth,
                elastic: true,
                animationDelay
            }}
            labels={{
                valueLabel: {
                    formatTextValue: formatValue,
                    style: {color: colorText, fontSize: valueFontSize}
                },
                tickLabels: {
                    type: 'inner',
                    defaultTickValueConfig: {
                        style: {fill: colorText, fontSize: tickFontSize},
                        formatTextValue: formatValue
                    },
                    ticks: tickList
                }
            }}
        />
    );
}