import type { accidental } from '../audio/audioConstants'

import './FlatSharpSelector.css'

interface FlatSharpProps {
  acc: accidental
  setAcc: (acc: accidental) => void
}

export default function FlatSharpSelector({ acc, setAcc }: FlatSharpProps) {
  return (
    <div className='flat-sharp-grid'>
      <div className='flat-sharp-label'>
        <div className='fs-label'>acc</div>
      </div>

      <div className='flat-sharp-buttons'>
        <div
          className={`flat-button ${acc === 'flat' && 'active'}`}
          onClick={() => setAcc('flat')}
        >
          {'♭'}
        </div>

        <div
          className={`sharp-button ${acc === 'sharp' && 'active'}`}
          onClick={() => setAcc('sharp')}
        >
          {'♯'}
        </div>
      </div>

      <div className='flat-sharp-label'></div>
    </div>
  )
}
