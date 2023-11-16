import { useEffect } from "react"

export function useThrottleFn(fn, delay) {
  const timerRef = useRef()
  const throttleFn = useCallback((...args) => {
    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        fn(...args)
        clearTimeout(timerRef.current)
      }, delay)
    }

  }, [fn, delay])
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  return throttleFn
}