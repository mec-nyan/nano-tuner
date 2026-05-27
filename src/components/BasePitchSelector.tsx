import './BasePitchSelector.css'
import { A4_FREQUENCY } from '../audio/audioConstants'

interface BasePitchProps {
  basePitch: number
  setBasePitch: (offset: number) => void
}

type offset = 1 | 0 | -1

export default function BasePitchSelector({
  basePitch,
  setBasePitch,
}: BasePitchProps) {
  const handleOffset = (offset: offset) => {
    switch (offset) {
      case 1:
        if (basePitch < 466) {
          setBasePitch(basePitch + 1)
        }
        break
      case 0:
        setBasePitch(A4_FREQUENCY)
        break
      case -1:
        if (basePitch > 415) {
          setBasePitch(basePitch - 1)
        }
        break
    }
  }

  return (
    <div className='ps-inner-grid'>
      <div className='selector-label'>
        <div className='ps-label'>A4</div>
      </div>

      <div className='selector-buttons'>
        <div className='a4-select-minus' onClick={() => handleOffset(-1)}>
          <div className='button-minus'></div>
          <div className='ps-label'>−</div>
        </div>

        <div className='a4-select-reset' onClick={() => handleOffset(0)}>
          <div className='button-reset'></div>
          <div className='ps-label'>440</div>
        </div>

        <div className='a4-select-plus' onClick={() => handleOffset(1)}>
          <div className='button-plus'></div>
          <div className='ps-label'>＋</div>
        </div>
      </div>
    </div>
  )
}
