let isMount = true;
const fiber = {
  stateNode: App,
  memoizedState: null
}

function schedule() {
  fiber.stateNode()
  isMount = false
}

function App() {
  const [num, updateNum] = useState(0)
  return {
    Click() {
      updateNum(num => num + 1)
    }
  }
}