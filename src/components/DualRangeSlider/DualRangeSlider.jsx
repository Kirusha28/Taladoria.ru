import React from 'react'
import './DualRangeSlider.scss'

const DualRangeSlider = ({
  min = 0,
  max = 100,
  valueMin,
  valueMax,
  onChange,
  step = 1,
  unit = '',
}) => {
  const safeMax = max > min ? max : min + 1
  const low = Math.min(Math.max(valueMin ?? min, min), safeMax)
  const high = Math.min(Math.max(valueMax ?? safeMax, min), safeMax)
  const lowPercent = ((low - min) / (safeMax - min)) * 100
  const highPercent = ((high - min) / (safeMax - min)) * 100

  const handleMinChange = (event) => {
    const nextMin = Math.min(Number(event.target.value), high)
    onChange(nextMin, high)
  }

  const handleMaxChange = (event) => {
    const nextMax = Math.max(Number(event.target.value), low)
    onChange(low, nextMax)
  }

  const formatValue = (value) => {
    if (step < 1) return value.toFixed(1)
    return Math.round(value)
  }

  return (
    <div className='DualRangeSlider'>
      <div className='DualRangeSlider__values'>
        <span>{formatValue(low)}{unit}</span>
        <span>{formatValue(high)}{unit}</span>
      </div>
      <div className='DualRangeSlider__track-wrap'>
        <div className='DualRangeSlider__track' />
        <div
          className='DualRangeSlider__range'
          style={{ left: `${lowPercent}%`, width: `${highPercent - lowPercent}%` }}
        />
        <input
          type='range'
          min={min}
          max={safeMax}
          step={step}
          value={low}
          onChange={handleMinChange}
          className='DualRangeSlider__input DualRangeSlider__input--min'
        />
        <input
          type='range'
          min={min}
          max={safeMax}
          step={step}
          value={high}
          onChange={handleMaxChange}
          className='DualRangeSlider__input DualRangeSlider__input--max'
        />
      </div>
    </div>
  )
}

export default DualRangeSlider
