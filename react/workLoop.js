let nextUnitOfWork = null

function workLoop(deadline) {
  // 是否要暂停
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    // 执行 一个工作单元 并返回  下一个工作单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)

  }
  shouldYield = deadline.timeRemaining() < 1
  // 所有工作单元都执行完后，我们一并 进行 提交 操作，commitRoot 里进行所有元素 往 dom 树 上添加的动作
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

function performUnitOfWork(nextUnitOfWork) {
  // TODO
}