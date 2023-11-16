
const useFn = (fn)=>{
  const fnRef = useRef(fn)
  const persistFn = useRef((...args)=>{
    return fnRef?.current?.(...args)
  })
  return persistFn.current 
}