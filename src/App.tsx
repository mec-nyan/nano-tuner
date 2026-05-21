import './App.css'
import { Tuner } from './components/Tuner'

function App() {
  return (
    <div className='home'>
      <h1 className='app-name'>nano tuner</h1>
      <div className='main-container'>
        <Tuner />
        <footer>
          <p>
            Made with <span
              className='material-symbols-outlined love'>favorite</span> by <span
              className='author'>nano</span>.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
