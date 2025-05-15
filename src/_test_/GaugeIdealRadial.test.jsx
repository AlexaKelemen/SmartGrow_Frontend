import { render } from '@testing-library/react'
import { describe, test, vi, expect } from 'vitest'

//  Mock react-gauge-component to intercept props
const gaugeSpy = vi.fn()
vi.mock('react-gauge-component', () => ({
  __esModule: true,
  default: (props) => {
    gaugeSpy(props)
    return <div data-testid="gauge-mock" />
  }
}))

//  Mock useCommonGaugeTheme
vi.mock('@/components/gauges/useCommonGaugeTheme', () => ({
  useCommonGaugeTheme: () => ({
    colorText: '#fff',
    pointerColor: '#000',
    pointerWidth: 5,
    pointerLength: 60,
    animationDelay: 100,
    valueFontSize: '12px',
    tickFontSize: '10px'
  })
}))

// Import the component after mocks
import { GaugeIdealRadial } from '@/components/gauges/GaugeIdealRadial'

describe('GaugeIdealRadial', () => {
  beforeEach(() => {
    gaugeSpy.mockClear()
  })

  test('renders with default offset and formats value', () => {
    render(
      <GaugeIdealRadial
        value={50}
        min={0}
        max={100}
        minIdeal={40}
        maxIdeal={60}
        colors={{
          low: 'blue',
          preIdeal: 'lightblue',
          ideal: 'green',
          postIdeal: 'orange',
          high: 'red'
        }}
        labels={{
          low: 'Too Low',
          preIdeal: 'Almost There',
          ideal: 'Perfect',
          postIdeal: 'Getting Warm',
          high: 'Too Hot'
        }}
      />
    )

    expect(gaugeSpy).toHaveBeenCalled()
    const props = gaugeSpy.mock.calls[0][0]

   
    expect(props.labels.valueLabel.formatTextValue(50)).toBe('50')

   
    const limits = props.arc.subArcs.map(a => a.limit)
    expect(limits[0]).toBeLessThan(40) // offset applied
    expect(limits[2]).toBe(60) // maxIdeal
    expect(props.arc.subArcs[2].color).toBe('green')
    expect(props.arc.subArcs[2].tooltip.text).toBe('Perfect')
  })

  test('respects custom offset', () => {
    render(
      <GaugeIdealRadial
        value={50}
        min={0}
        max={100}
        minIdeal={40}
        maxIdeal={60}
        offset={5}
        colors={{
          low: 'gray',
          preIdeal: 'lightgray',
          ideal: 'white',
          postIdeal: 'pink',
          high: 'black'
        }}
        labels={{
          low: 'Low',
          preIdeal: 'Pre',
          ideal: 'Ideal',
          postIdeal: 'Post',
          high: 'High'
        }}
      />
    )

    const props = gaugeSpy.mock.calls[0][0]
    const subArcs = props.arc.subArcs

    expect(subArcs[0].limit).toBe(35)
    expect(subArcs[1].limit).toBe(40)
    expect(subArcs[2].limit).toBe(60)
    expect(subArcs[3].limit).toBe(65)
    expect(subArcs[4].limit).toBe(100)
  })

  test('renders fallback ticks if tickStep is not given', () => {
    render(
      <GaugeIdealRadial
        value={50}
        min={0}
        max={100}
        minIdeal={40}
        maxIdeal={60}
        colors={{
          low: '',
          preIdeal: '',
          ideal: '',
          postIdeal: '',
          high: ''
        }}
        labels={{
          low: '',
          preIdeal: '',
          ideal: '',
          postIdeal: '',
          high: ''
        }}
      />
    )

    const props = gaugeSpy.mock.calls[0][0]
    const ticks = props.labels.tickLabels.ticks

    expect(ticks.map(t => t.value)).toEqual([0, 50, 100])
  })

  test('renders ticks using custom tickStep', () => {
    render(
      <GaugeIdealRadial
        value={0}
        min={0}
        max={10}
        minIdeal={4}
        maxIdeal={6}
        tickStep={2}
        colors={{ low: '', preIdeal: '', ideal: '', postIdeal: '', high: '' }}
        labels={{ low: '', preIdeal: '', ideal: '', postIdeal: '', high: '' }}
      />
    )

    const props = gaugeSpy.mock.calls[0][0]
    const ticks = props.labels.tickLabels.ticks

    expect(ticks.map(t => t.value)).toEqual([0, 2, 4, 6, 8, 10])
  })
})
