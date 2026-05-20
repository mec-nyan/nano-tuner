export function createSmoother(size = 5) {
  const history: number[] = []
  return (value: number | null) => {
    if (value === null) {
      history.length = 0
      return null
    }

    history.push(value)

    if (history.length > size) {
      history.shift()
    }

    const average =
      history.reduce((a, b) => a + b, 0) /
      history.length

    return average
  }
}
