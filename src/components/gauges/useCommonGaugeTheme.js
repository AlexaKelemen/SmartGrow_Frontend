/**
 * @file useCommonGaugeTheme.js
 * @description Shared theme-related hooks for gauge components.
 *
 * Provides access to CSS custom properties used for pointer styling, text labels, and sizing
 * in `react-gauge-component` gauges. It also includes a utility for reading CSS variables dynamically.
 *
 * These hooks allow all gauge components to adapt to runtime theme changes.
 *
 * @see GaugeIdealBand
 * @see GaugeMultiZoneRadial
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.4.7
 */

import { useEffect, useState } from 'react';

/**
 * useCSSVar
 *
 * Custom React hook to dynamically read the current value of a CSS custom property (variable).
 *
 * @param {string} name - The CSS variable name (e.g., '--colorText').
 * @returns {string} The resolved value from the current computed theme.
 *
 * @example
 * const textColor = useCSSVar('--colorText');
 */
export function useCSSVar(name) {
    const [value, setValue] = useState('');
    useEffect(() => {
        const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        setValue(v);
    }, [name]);
    return value;
}

/**
 * useCommonGaugeTheme
 *
 * Provides shared style values for gauges including pointer color, text styling,
 * and animation delay. These values are derived from CSS variables and are
 * used to standardize visual configuration across all gauges.
 *
 * @returns {{textColor: string, pointerColor: string, pointerWidth: (number|number), pointerLength: (number|number), animationDelay: (number|number), valueFontSize: (number|number), tickFontSize: (number|number)}}
 * Object with resolved styling and animation properties for gauge rendering.
 *
 * @example
 * const { pointerColor, valueFontSize } = useCommonGaugeTheme();
 */
export function useCommonGaugeTheme() {
    return {
        textColor: useCSSVar('--colorText'),
        pointerColor: useCSSVar('--gaugePointerColor'),
        pointerWidth: parseFloat(useCSSVar('--gaugePointerWidth')) || 15,
        pointerLength: parseFloat(useCSSVar('--gaugePointerLength')) || 0.8,
        animationDelay: parseFloat(useCSSVar('--gaugeAnimationDelay')) || 0,
        valueFontSize: parseFloat(useCSSVar('--gaugeValueFontSize')) || 14,
        tickFontSize: parseFloat(useCSSVar('--gaugeTickFontSize')) || 10
    };
}