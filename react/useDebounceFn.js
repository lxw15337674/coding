import { useCallback, useEffect } from "react"

export default function useDebounceFn(fn, delay) {
  const fnRef = useRef()
  const timer = useRef()
  // 避免闭包问题
  fnRef.current = fn
  const debounceFn = useCallback((...args) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      fnRef.current(...args)
    }, delay)
  }, [delay])
  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])
  return debounceFn
}