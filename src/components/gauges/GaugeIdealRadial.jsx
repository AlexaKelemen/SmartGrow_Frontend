/**
 * @file GaugeIdealRadial.jsx
 * @description Generic React component for rendering gauges with an ideal value band.
 *
 * This component visualizes a value on a semicircular or radial gauge,
 * with color-coded arcs that indicate ideal and out-of-range zones.
 *
 * Typically used for metrics with centered acceptable ranges, such as temperature,
 * humidity, pH, CO₂, etc.
 *
 * Wrapper components pass in styling, labels, and value formatting.
 *
 * @see GaugeTemperature
 * @see GaugeHumidity
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.4.7
 */

import GaugeComponent from 'react-gauge-component';
import { useCommonGaugeTheme } from './useCommonGaugeTheme';


/**
 * Calculates a reasonable buffer (offset) around an ideal range for a gauge.
 *
 * If an explicit `offset` is provided, it returns that. Otherwise, it calculates
 * a fallback based on 20% of the ideal range but clamps it to a maximum of half the total range.
 *
 * This helps define the transition zones around the ideal area in gauges like temperature or humidity.
 *
 * @param {?number} offset - Optional override value for the buffer zone. If not null/undefined, it is returned directly.
 * @param {number} min - Minimum bound of the full gauge range.
 * @param {number} max - Maximum bound of the full gauge range.
 * @param {number} minIdeal - Start of the ideal range.
 * @param {number} maxIdeal - End of the ideal range.
 * @returns {number} Calculated effective offset value.
 */
function resolveOffset(offset, min, max, minIdeal, maxIdeal) {
    if (offset !== null && offset !== undefined) return offset;
    const fullRange = max - min;
    const idealRange = maxIdeal - minIdeal;
    return Math.min(idealRange * 0.2, fullRange / 2);
}

/**
 * GaugeIdealBand
 *
 * A configurable gauge component with an ideal central range and color-coded zones.
 * Used for displaying values like temperature, humidity, or any metric with a defined optimal band.
 *
 * @param {number} value - The value to display.
 * @param {number} min - Minimum scale value of the gauge.
 * @param {number} max - Maximum scale value of the gauge.
 * @param {number} minIdeal - Start of the ideal range.
 * @param {number} maxIdeal - End of the ideal range.
 * @param {?number} [offset=null] - Optional buffer zone around the ideal range.
 * @param {function} [formatValue=(v) => `${v}`] - Function to format the numeric value label.
 * @param {Object} colors - Zone color mapping.
 * @param {string} colors.low - Color for values far below an ideal.
 * @param {string} colors.preIdeal - Color for values slightly below an ideal.
 * @param {string} colors.ideal - Color for the ideal range.
 * @param {string} colors.postIdeal - Color for values slightly above an ideal.
 * @param {string} colors.high - Color for values far above an ideal.
 * @param {Object} labels - Tooltip labels for each range.
 * @param {string} labels.low - Low text set.
 * @param {string} labels.preIdeal - Pre-ideal text set.
 * @param {string} labels.ideal - Ideal text set.
 * @param {string} labels.postIdeal - Post-ideal text set.
 * @param {string} labels.high - High text set.
 * @param {'semicircle'|'radial'} [type='semicircle'] - Shape of the gauge.
 * @param {?number} [tickStep=null] - Interval between tick marks (auto-generated if set).
 * @param {number} [arcWidth=0.2] - Width of the arc band.
 * @param {number} [arcPadding=0.005] - Spacing between arc segments.
 * @returns {JSX.Element} Rendered `react-gauge-component` with configured arcs, ticks, and pointer.
 *
 * @example
 * <GaugeIdealBand
 *   value={75}
 *   min={0}
 *   max={100}
 *   minIdeal={60}
 *   maxIdeal={80}
 *   colors={{ low: '#ccc', preIdeal: '#88f', ideal: '#4f4', postIdeal: '#fc3', high: '#f44' }}
 *   labels={{ low: 'Too Low', preIdeal: 'Below Ideal', ideal: 'Perfect', postIdeal: 'Slightly High', high: 'Too High' }}
 * />
 */
export function GaugeIdealRadial({
                            value, min, max, minIdeal, maxIdeal, offset = null,
                            formatValue = v => `${v}`, colors, labels, type = 'radial',
                            tickStep = null, arcWidth = 0.2, arcPadding = 0.01
                        }) {
    const {
        colorText, pointerColor, pointerWidth, pointerLength,
        animationDelay, valueFontSize, tickFontSize
    } = useCommonGaugeTheme();
    const effectiveOffset = resolveOffset(offset, min, max, minIdeal, maxIdeal);
    const subArcs = [
        {limit: minIdeal - effectiveOffset, color: colors.low, tooltip: {text: labels.low}},
        {limit: minIdeal, color: colors.preIdeal, tooltip: {text: labels.preIdeal}},
        {limit: maxIdeal, color: colors.ideal, tooltip: {text: labels.ideal}},
        {limit: maxIdeal + effectiveOffset, color: colors.postIdeal, tooltip: {text: labels.postIdeal}},
        {limit: max, color: colors.high, tooltip: {text: labels.high}}
    ];
    const ticks = tickStep ? Array.from({length: Math.floor((max - min) / tickStep) + 1}, (_, i) => ({value: min + i * tickStep})) : [
        {value: min}, {value: (min + max) / 2}, {value: max}
    ];

    return (
        <GaugeComponent
            type={type}
            value={value}
            minValue={min}
            maxValue={max}
            arc={{
                width: arcWidth,
                padding: arcPadding,
                cornerRadius: 4,
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
                    style: {fontSize: valueFontSize, color: colorText}
                },
                tickLabels: {
                    type: type === 'radial' ? 'inner' : 'outer',
                    defaultTickValueConfig: {
                        formatTextValue: formatValue,
                        style: {fontSize: tickFontSize, fill: colorText}
                    },
                    ticks
                }
            }}
        />
    );
}