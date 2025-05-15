import { render, screen } from '@testing-library/react'
import { describe, test, vi } from 'vitest'

// Mock GaugeIdealRadial
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

//  Mock useCSSVar
vi.mock('@/components/gauges/useCommonGaugeTheme', () => ({
  useCSSVar: (key) => `mocked(${key})`,
}))

// Import actual component
import { GaugeTemperature } from '@/components/gauges/wrappers/GaugeTemperature'

describe('GaugeTemperature', () => {
  test('renders formatted temperature value correctly', () => {
    render(<GaugeTemperature value={23} />)
    expect(screen.getByTestId('formatted-value')).toHaveTextContent('23ºC')
  })

  test('uses correct CSS variable color keys', () => {
    render(<GaugeTemperature value={15} />)
    const colors = screen.getByTestId('colors')
    expect(colors).toHaveTextContent('low: mocked(--colorTempFreeze)')
    expect(colors).toHaveTextContent('preIdeal: mocked(--colorTempCold)')
    expect(colors).toHaveTextContent('ideal: mocked(--colorTempOk)')
    expect(colors).toHaveTextContent('postIdeal: mocked(--colorTempWarm)')
    expect(colors).toHaveTextContent('high: mocked(--colorTempHot)')
  })

  test('displays correct zone labels', () => {
    render(<GaugeTemperature value={15} />)
    const labels = screen.getByTestId('labels')
    expect(labels).toHaveTextContent('low: Freezing!')
    expect(labels).toHaveTextContent('preIdeal: Cold')
    expect(labels).toHaveTextContent('ideal: OK')
    expect(labels).toHaveTextContent('postIdeal: Warm')
    expect(labels).toHaveTextContent('high: Hot')
  })
})
