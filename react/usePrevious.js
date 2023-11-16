// 记录前一个state值
const usePrevious = (state) => {
  const prevStateRef = useRef()
  const currentStateRef = useRef()
  prevStateRef.current = currentStateRef.current
  currentStateRef.current = state
  return prevStateRef.current
}