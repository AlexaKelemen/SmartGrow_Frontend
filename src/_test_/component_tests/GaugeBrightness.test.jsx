import { render, screen } from '@testing-library/react'
import { describe, test, vi } from 'vitest'

// MOCK: GaugeMultiZoneRadial component (so ResizeObserver never gets called)
vi.mock('@/components/gauges/GaugeMultiZoneRadial', () => ({
  GaugeMultiZoneRadial: ({ value, formatValue, zones }) => (
    <div data-testid="mocked-gauge">
      <div data-testid="formatted-value">{formatValue(value)}</div>
      <ul data-testid="zone-list">
        {zones.map((zone, i) => (
          <li key={i}>
            {zone.label} - {zone.limit} - {zone.color}
          </li>
        ))}
      </ul>
    </div>
  ),
}))

//  MOCK: useCSSVar returns fake color strings
vi.mock('@/components/gauges/useCommonGaugeTheme', () => ({
  useCSSVar: (key) => `mocked(${key})`,
}))

// Import the GaugeBrightness component AFTER mocks
import { GaugeBrightness } from '@/components/gauges/wrappers/GaugeBrightness'

describe('GaugeBrightness', () => {
  test('renders correct formatted value', () => {
    render(<GaugeBrightness value={75} />)
    expect(screen.getByTestId('formatted-value')).toHaveTextContent('75%')
  })

  test('renders all 5 brightness zones', () => {
    render(<GaugeBrightness value={42} />)

    const zoneList = screen.getByTestId('zone-list')
    expect(zoneList).toHaveTextContent('Dark - 20 - mocked(--colorBrightDark)')
    expect(zoneList).toHaveTextContent('Dim - 40 - mocked(--colorBrightDim)')
    expect(zoneList).toHaveTextContent('Normal - 60 - mocked(--colorBrightNormal)')
    expect(zoneList).toHaveTextContent('Bright - 80 - mocked(--colorBrightBright)')
    expect(zoneList).toHaveTextContent('Overload - 100 - mocked(--colorBrightOverload)')
  })

  test('respects custom min and max props', () => {
    render(<GaugeBrightness value={50} min={10} max={90} />)
    expect(screen.getByTestId('formatted-value')).toHaveTextContent('50%')
  })
})
