/**
 * @file wrappers/index.js
 * @description Centralized export file for all role-specific gauge components.
 *
 * These components wrap generic gauge logic (`GaugeIdealBand` and `GaugeMultiZoneRadial`)
 * and inject styling, labels, and display logic for specific use cases such as
 * - Temperature monitoring
 * - Humidity control
 * - Brightness feedback
 *
 * Each wrapper handles value formatting and gauges configuration for its specific domain.
 *
 * @example
 * import { GaugeTemperature, GaugeHumidity } from '@/components/gauges/wrappers';
 *
 * @see GaugeTemperature
 * @see GaugeHumidity
 * @see GaugeBrightness
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.4.7
 */

export { GaugeTemperature } from './GaugeTemperature';
export { GaugeHumidity } from './GaugeHumidity';
export { GaugeBrightness } from './GaugeBrightness';