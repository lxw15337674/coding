import { useCallback, useState } from "react"

// 组件强制渲染
const useUpdate=()=>{
  const [,setState] = useState({})
  return useCallback(()=>{
    setState({})
  },[])
}