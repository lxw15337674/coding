import { useState } from 'react';
import useEventListener from '../useEventListener';



const useHover = (target, options) => {
  const [flag, setFlag] = useState(false)
  const { onEnter, onLeave } = options || {};

  useEventListener('mouseenter', () => {
    onEnter?.()
    setFlag(true)
  }, target)

  useEventListener('mouseleave', () => {
    onLeave?.()
    setFlag(false)
  }, target)

  return flag
};
export default useHover;