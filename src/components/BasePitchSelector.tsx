import './BasePitchSelector.css'

interface BasePitchProps {
  basePitch: number
  setBasePitch: (offset: number) => void
}

type offset = 1 | -1

export default function BasePitchSelector({
  basePitch,
  setBasePitch,
}: BasePitchProps) {
  const handleOffset = (offset: offset) => {
    if (offset == 1 && basePitch < 466) {
      setBasePitch(basePitch + 1)
    }

    if (offset == -1 && basePitch > 415) {
      setBasePitch(basePitch - 1)
    }
  }

  return (
    <div className='pitch-selector'>
      <div className='ps-inner-grid'>
        <div className='ps-label'>−</div>
        <div className='ps-label'>A4</div>
        <div className='ps-label'>＋</div>
        <div className='ps-button'>
          <div className='button-minus' onClick={() => handleOffset(-1)}></div>
        </div>
        {/*
        An empty button for grid layout.
        Should we add a 'reset' button?
        */}
        <div className='ps-button'></div>
        <div className='ps-button'>
          <div className='button-plus' onClick={() => handleOffset(1)}></div>
        </div>
      </div>
    </div>
  )
}
