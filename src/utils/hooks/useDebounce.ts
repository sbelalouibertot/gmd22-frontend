import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay = 200): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeHandler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(timeHandler)
    }
  }, [delay, value])

  return debouncedValue
}
