import type { accidental } from '../audio/audioConstants'

import './FlatSharpSelector.css'

interface FlatSharpProps {
  acc: accidental
  setAcc: (acc: accidental) => void
}

export default function FlatSharpSelector({ acc, setAcc }: FlatSharpProps) {
  return (
    <div className='flat-sharp-grid'>
      <div
        className={`flat-selector ${acc === 'flat' && 'active'}`}
        onClick={() => setAcc('flat')}
      >
        <div className='flat-label'>♭</div>
        <div className='flat-button'></div>
      </div>

      <div
        className={`sharp-selector ${acc === 'sharp' && 'active'}`}
        onClick={() => setAcc('sharp')}
      >
        <div className='sharp-label'>♯</div>
        <div className='sharp-button'></div>
      </div>
    </div>
  )
}
