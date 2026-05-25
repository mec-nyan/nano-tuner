import './BasePitchSelector.css'


export default function BasePitchSelector() {
  return (
    <div className='pitch-selector'>
      <div className='ps-inner-grid'>
        <div className='ps-label'>−</div>
        <div className='ps-label'>A4</div>
        <div className='ps-label'>＋</div>
        <div className='ps-button'>
          <div className='button-minus'>
          </div>
        </div>
        <div className='ps-button'></div>
        <div className='ps-button'>
          <div className='button-plus'>
          </div>
        </div>
      </div>
    </div>
  )
}
