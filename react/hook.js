// react useState 简单实现
// https://www.bilibili.com/video/BV1iV411b7L1/?spm_id_from=333.880.my_history.page.click&vd_source=0ab35fe7d5d150155b5838efffedc59d
let isMounted = false;
let workInProgressHook = null;

const fiber = {
  stateNode: App,
  memoizedState: null
}

const useState = (initialState) => {
  let hook = null
  // 初始化
  if (!isMounted) {
    hook = {
      memoizedState: initialState,
      next: null,
      queue: {
        pending: null
      }
    }
    // 第一个hook创建
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook
    } else {
      // 后面hook创建
      workInProgressHook.next = hook
    }
    workInProgressHook = hook
  } else {
    // 更新时
    hook = workInProgressHook
    workInProgressHook = workInProgressHook.next
  }
  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next
    do {
      const action = firstUpdate.action
      baseState = action(baseState)
      firstUpdate = firstUpdate.next
    } while (firstUpdate !== hook.queue.pending.next)
    hook.queue.pending = null
  }
  hook.memoizedState = baseState
  return [baseState, dispatchAction.bind(null, hook.queue)]
}

const dispatchAction = (queue, action) => {
  const update = {
    action,
    next: null
  }
  // 双向链表保存
  if (queue.pending === null) {
    // u0->u0->u0
    update.next = update
  } else {
    // u0->u0
    // u1->u0->u1
    update.next = queue.pending.next
    queue.pending.next = update
  }
  queue.pending = update
  schedule()
}


function schedule() {
  // 每次更新都重新执行函数组件
  workInProgressHook = fiber.memoizedState
  const app = fiber.stateNode()
  isMounted = true
  return app
}

function App() {
  const [num, updateNum] = useState(1)
  // const [num2, updateNum2] = useState(0)
  // const [num3, updateNum3] = useState(0)
  console.log('isMount?', isMounted)
  console.log('num', num)
  return {
    Click() {
      updateNum(num => num + 1)
      updateNum(num => num + 1)
      updateNum(num => num + 1)
    }
  }
}

app = schedule()
app.Click()