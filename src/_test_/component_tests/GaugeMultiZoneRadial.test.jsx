import { render } from '@testing-library/react'
import { describe, test, vi, expect } from 'vitest'


const gaugeSpy = vi.fn()

//  Mock react-gauge-component
vi.mock('react-gauge-component', () => ({
  __esModule: true,
  default: (props) => {
    gaugeSpy(props)
    return <div data-testid="gauge-mock" />
  }
}))

// Mock useCommonGaugeTheme
vi.mock('@/components/gauges/useCommonGaugeTheme', () => ({
  useCommonGaugeTheme: () => ({
    colorText: '#123456',
    pointerColor: '#abcdef',
    pointerWidth: 4,
    pointerLength: 50,
    animationDelay: 0,
    valueFontSize: '16px',
    tickFontSize: '12px'
  })
}))

//  Import the real component after mocks
import { GaugeMultiZoneRadial } from '@/components/gauges/GaugeMultiZoneRadial'

describe('GaugeMultiZoneRadial', () => {
  beforeEach(() => gaugeSpy.mockClear())

  const sampleZones = [
    { limit: 20, color: '#111', label: 'Low' },
    { limit: 50, color: '#222', label: 'Medium' },
    { limit: 80, color: '#333', label: 'High' }
  ]

  test('creates subArcs from zones', () => {
    render(<GaugeMultiZoneRadial value={40} zones={sampleZones} />)

    const props = gaugeSpy.mock.calls[0][0]
    const subArcs = props.arc.subArcs

    expect(subArcs).toHaveLength(3)
    expect(subArcs[0]).toEqual({
      limit: 20,
      color: '#111',
      tooltip: { text: 'Low' }
    })
    expect(subArcs[1].tooltip.text).toBe('Medium')
    expect(subArcs[2].color).toBe('#333')
  })

  test('uses default tick list if ticks not provided', () => {
    render(<GaugeMultiZoneRadial value={60} zones={sampleZones} />)

    const props = gaugeSpy.mock.calls[0][0]
    const ticks = props.labels.tickLabels.ticks

    expect(ticks).toEqual([
      { value: 20 },
      { value: 50 },
      { value: 80 }
    ])
  })

  test('uses custom ticks if provided', () => {
    const customTicks = [{ value: 0 }, { value: 100 }]
    render(<GaugeMultiZoneRadial value={80} zones={sampleZones} ticks={customTicks} />)

    const props = gaugeSpy.mock.calls[0][0]
    const ticks = props.labels.tickLabels.ticks

    expect(ticks).toEqual(customTicks)
  })

  test('formats value using default formatter', () => {
    render(<GaugeMultiZoneRadial value={42} zones={sampleZones} />)

    const props = gaugeSpy.mock.calls[0][0]
    const formatted = props.labels.valueLabel.formatTextValue(42)

    expect(formatted).toBe('42')
  })

  test('respects custom min, max, arcWidth, and arcPadding', () => {
    render(
      <GaugeMultiZoneRadial
        value={70}
        min={10}
        max={90}
        arcWidth={0.25}
        arcPadding={0.01}
        zones={sampleZones}
      />
    )

    const props = gaugeSpy.mock.calls[0][0]

    expect(props.minValue).toBe(10)
    expect(props.maxValue).toBe(90)
    expect(props.arc.width).toBe(0.25)
    expect(props.arc.padding).toBe(0.01)
  })
})
