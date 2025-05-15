import { render, screen } from '@testing-library/react'
import { describe, test, vi } from 'vitest'

//  Mock GaugeIdealRadial so we don’t trigger ResizeObserver
vi.mock('@/components/gauges/GaugeIdealRadial', () => ({
  GaugeIdealRadial: ({ value, formatValue, colors, labels }) => (
    <div data-testid="mocked-gauge">
      <div data-testid="formatted-value">{formatValue(value)}</div>
      <ul data-testid="colors">
        {Object.entries(colors).map(([key, val]) => (
          <li key={key}>{key}: {val}</li>
        ))}
      </ul>
      <ul data-testid="labels">
        {Object.entries(labels).map(([key, val]) => (
          <li key={key}>{key}: {val}</li>
        ))}
      </ul>
    </div>
  ),
}))

//  Mock useCSSVar to return predictable values
vi.mock('@/components/gauges/useCommonGaugeTheme', () => ({
  useCSSVar: (key) => `mocked(${key})`,
}))

// Import component after mocks
import { GaugeHumidity } from '@/components/gauges/wrappers/GaugeHumidity'

describe('GaugeHumidity', () => {
  test('renders formatted humidity value', () => {
    render(<GaugeHumidity value={76} />)
    expect(screen.getByTestId('formatted-value')).toHaveTextContent('76%')
  })

  test('renders correct color mappings from useCSSVar', () => {
    render(<GaugeHumidity value={50} />)
    const colors = screen.getByTestId('colors')
    expect(colors).toHaveTextContent('low: mocked(--colorHumidityDry)')
    expect(colors).toHaveTextContent('preIdeal: mocked(--colorHumidityLow)')
    expect(colors).toHaveTextContent('ideal: mocked(--colorHumidityIdeal)')
    expect(colors).toHaveTextContent('postIdeal: mocked(--colorHumidityHigh)')
    expect(colors).toHaveTextContent('high: mocked(--colorHumiditySaturated)')
  })

  test('renders correct zone labels', () => {
    render(<GaugeHumidity value={50} />)
    const labels = screen.getByTestId('labels')
    expect(labels).toHaveTextContent('low: Dry')
    expect(labels).toHaveTextContent('preIdeal: Low')
    expect(labels).toHaveTextContent('ideal: Ideal')
    expect(labels).toHaveTextContent('postIdeal: Humid')
    expect(labels).toHaveTextContent('high: Saturated')
  })
})
