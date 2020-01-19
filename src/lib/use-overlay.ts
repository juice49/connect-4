import useMeasure from 'react-use-measure'
import Coordinates from '../types/coordinates'

interface OverlayValues {
  parentRef: (element: HTMLElement) => void,
  refs: {
    [key: number]: (element: HTMLElement) => void
  },
  coordinates: [Coordinates, Coordinates]
}

export default function useOverlay (winningLine: number[] | null): OverlayValues {
  const [parentRef, parentRect] = useMeasure()
  const [refA, rectA] = useMeasure()
  const [refB, rectB] = useMeasure()
  let refs = {}
  let coordinates = null

  if (!winningLine) {
    return {
      parentRef,
      refs,
      coordinates
    }
  }

  refs = {
    [winningLine[0]]: refA,
    [winningLine[winningLine.length - 1]]: refB
  }

  coordinates = [rectA, rectB].map<Coordinates>(rect => {
    if (!rect || !parentRect) {
      return null
    }

    return [
      (rect.left - parentRect.left) + (rect.width / 2),
      (rect.top - parentRect.top) + (rect.height / 2)
    ]
  })

  return {
    parentRef,
    refs,
    coordinates
  }
}