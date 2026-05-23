import './AccuracyBar.css'


export default function AccuracyBar({ cents }: { cents: number | null}) {
  let lights = []
  const numLights = 7
  for (let i = 0; i < numLights; i++) {
    let active = false
    if (cents !== null) {
      active = isActive(cents, i )
    }

    let colour: string
    switch (i) {
      case 0:
      case 6:
        colour = 'red'
        break
      case 1:
      case 5:
        colour = 'orange'
        break
      case 2:
      case 4:
        colour = 'yellow'
        break
      default:
        colour = 'green'
    }

    lights.push(
      <div className='light'>
          <div className={`${colour} ${active ? ' on' : ' off'}`}></div>
        </div>
    )
  }

  // let centsString = ''
  let centsString = '+42 cents'

  if (cents !== null && cents !== 0) {
    centsString = `${formatSigned(cents)} cents`
  }
  return (
    <div className='accuracy-bar'>
      <div className='accuracy-lights'>
        {lights}
      </div>
      {/* I'm thinking this must go inside the display.
      <div className='cents-display'>{centsString}</div>
      */}
    </div>
  )
}

function isActive(cents: number, light: number): boolean {
  // We're using a 7 lights indicator.
  // The light in the center will light up when we are in a
  // +3/-3 range.
  // Otherwise it will be like follows:
  // 0: < -32
  // 1: < -16
  // 2: < -3
  // 3: < 3
  // 4: < 16
  // 5: < 32
  // 6: >=32

  const valueRanges = [ -32, -16, -3, 4, 17, 33, 51 ]

  if (light === 0) {
    return cents < valueRanges[light]
  }

  return cents >= valueRanges[light-1] && cents < valueRanges[light]
}

function formatSigned(n: number): string {
  // Positive numbers will show "+n"
  // Negative numbers will show "-n"
  // Zero will just be "0".
  const nFixed = n.toFixed(1)
  return n > 0 ? `+${nFixed}` : `${nFixed}`
}
