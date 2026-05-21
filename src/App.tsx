import './App.css'
import { Tuner } from './components/Tuner'

function App() {
  return (
    <div className='home'>
      <div className='app-name'>
        <span>nano tuner</span>
      </div>
      <div className='main-container'>
        <div className='border-top-shine'></div>
        <Tuner />
        <div className='border-top-shine'></div>
        <footer>
          <p>
            Made with <span
              className='material-symbols-outlined love'>favorite</span> by <span
              className='author'>nano</span>.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
