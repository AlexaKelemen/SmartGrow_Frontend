import GaugeComponent from 'react-gauge-component';
import {useEffect, useState} from 'react';

function useCSSVar(name) {
    const [value, setValue] = useState('');
    useEffect(() => {
        const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        setValue(v);
    }, [name]);
    return value;
}

function useCommonGaugeTheme() {
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

function useTempGaugeTheme() {
    return {
        ...useCommonGaugeTheme(),
        colorFreeze: useCSSVar('--colorTempFreeze'),
        colorCold: useCSSVar('--colorTempCold'),
        colorOk: useCSSVar('--colorTempOk'),
        colorWarm: useCSSVar('--colorTempWarm'),
        colorHot: useCSSVar('--colorTempHot')
    };
}

function useBrightnessGaugeTheme() {
    return {
        ...useCommonGaugeTheme(),
        colorDark: useCSSVar('--colorBrightDark'),
        colorDim: useCSSVar('--colorBrightDim'),
        colorNormal: useCSSVar('--colorBrightNormal'),
        colorBright: useCSSVar('--colorBrightBright'),
        colorOverload: useCSSVar('--colorBrightOverload')
    };
}

function resolveOffset(offset, min, max, minIdeal, maxIdeal) {
    if (offset !== null && offset !== undefined) return offset;
    const fullRange = max - min;
    const idealRange = maxIdeal - minIdeal;
    return Math.min(idealRange * 0.2, fullRange / 2);
}

export function GaugeTemperature({value, min = 0, max = 40, minIdeal = 18, maxIdeal = 28, offset = null}) {
    const {
        colorFreeze, colorCold, colorOk, colorWarm, colorHot,
        textColor, pointerColor, pointerWidth, pointerLength,
        animationDelay, valueFontSize, tickFontSize
    } = useTempGaugeTheme();
    const effectiveOffset = resolveOffset(offset, min, max, minIdeal, maxIdeal);

    return (
        <GaugeComponent
            type="semicircle"
            value={value}
            minValue={min}
            maxValue={max}
            arc={{
                width: 0.2,
                padding: 0.005,
                cornerRadius: 1,
                subArcs: [
                    {
                        limit: minIdeal - effectiveOffset,
                        color: colorFreeze,
                        tooltip: {text: 'Freezing!'}
                    },
                    {
                        limit: minIdeal,
                        color: colorCold,
                        tooltip: {text: 'Cold'}
                    },
                    {
                        limit: maxIdeal,
                        color: colorOk,
                        tooltip: {text: 'Ok'}
                    },
                    {
                        limit: maxIdeal + effectiveOffset,
                        color: colorWarm,
                        tooltip: {text: 'Warm'}
                    },
                    {
                        color: colorHot,
                        tooltip: {text: 'Hot!'}
                    }
                ]
            }}
            pointer={{
                color: pointerColor,
                length: pointerLength,
                width: pointerWidth,
                elastic: true,
                animationDelay: animationDelay
            }}
            labels={{
                valueLabel: {
                    formatTextValue: v => `${v}ºC`,
                    style: {fontSize: valueFontSize, color: textColor}
                },
                tickLabels: {
                    type: 'outer',
                    defaultTickValueConfig: {
                        formatTextValue: v => `${v}ºC`,
                        style: {fontSize: tickFontSize, fill: textColor}
                    },
                    ticks: [
                        {value: min},
                        {value: (min + max) / 2},
                        {value: max}
                    ]
                }
            }}
        />
    );
}

export function GaugeBrightness({value, min = 0, max = 100}) {
    const {
        colorDark, colorDim, colorNormal, colorBright,
        colorOverload, textColor, pointerColor, pointerWidth,
        pointerLength, animationDelay, valueFontSize, tickFontSize
    } = useBrightnessGaugeTheme();

    return (
        <GaugeComponent
            type="radial"
            value={value}
            minValue={min}
            maxValue={max}
            arc={{
                subArcs: [
                    {limit: 20, color: colorDark},
                    {limit: 40, color: colorDim},
                    {limit: 60, color: colorNormal},
                    {limit: 80, color: colorBright},
                    {limit: max, color: colorOverload}
                ],
                padding: 0.02,
                width: 0.3
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
                    formatTextValue: v => `${v}%`,
                    style: {color: textColor, fontSize: valueFontSize}
                },
                tickLabels: {
                    type: 'inner',
                    defaultTickValueConfig: {
                        style: {fill: textColor, fontSize: tickFontSize}
                    },
                    ticks: [
                        {value: 20},
                        {value: 40},
                        {value: 60},
                        {value: 80},
                        {value: 100}
                    ]
                }
            }}
        />
    );
}