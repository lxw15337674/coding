// 把元素添加到 dom 中
// 为元素的子元素都创建一个 fiber 结构
// 找到下一个工作单元
function performUnitOfWork(fiber) {
  // 创建一个dom元素，挂载到fiber的dom属性
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }
  reconcileChildren(fiber, elements)

  const elements = fiber.props.children
  let index = 0
  let prevSibling = null
  while (index < elements.length) {
    const element = elements[index]
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }

  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber

  while (nextFiber) {
    // step2 如果 有 sibling fiber ，则返回 sibling
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    // step3 ，否则 返回 他的 parent fiber
    nextFiber = nextFiber.parent
  }

}


function commitRoot() {
  // 移除 刚才收集的 旧节点
  deletions.forEach(commitWork)

  commitWork(wipRoot.child)
  // commit 阶段完成后，保存当前 fiber 树
  currentRoot = wipRoot
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) {
    return
  }

  const domParent = fiber.parent.dom
  if (
    fiber.effectTag === "PLACEMENT" &&
    fiber.dom != null
  ) {
    domParent.appendChild(fiber.dom)
  } else if (
    fiber.effectTag === "UPDATE" &&
    fiber.dom != null
  ) {
    // 更新 dom 的 属性(新增新属性和移除旧属性) 及 事件的添加和移除处理
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom)
  }

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}


function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    // 和上一次的 commit 阶段的 旧 fiber 树建立连接
    alternate: currentRoot,
  }
  nextUnitOfWork = wipRoot
}

let currentRoot = null



// 这里的比较规则如下：

// 如果旧的 fiber 元素 和新元素具有相同的类型，那么再进一步进行比较 他们的 属性
// 如果类型不同，并且有一个新元素，则需要创建一个新的DOM节点
// 如果类型不同，并且有一个旧 fiber 元素，则移除旧的节点
// 这里React也
使用 key 进行比较。例如，它检测到子元素在元素数组中的位置发生了变化。
function reconcileChildren(wipFiber, elements) {
  let index = 0
  let oldFiber =
    wipFiber.alternate && wipFiber.alternate.child
  let prevSibling = null

  while (index < elements.length || oldFiber != null) {
    const element = elements[index]
    let newFiber = null
    const sameType = oldFiber && element && element.type == oldFiber.type
    // 类型相同，更新 属性 
    if (sameType) {
      // update the node
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE',
      }
    }
    // 类型不同，但是 新 fiber 元素存在，则进行 新增(新增新的 fiber)
    if (element && !sameType) {
      // add this node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT',
      }
    }
    // 类型不同，但是 旧 fiber 树存在，则进行 移除 (先收集起来，在 commit 阶段一并移除)
    if (oldFiber && !sameType) {
      // delete the oldFiber's node
      oldFiber.effectTag = 'DELETION'
      deletions.push(oldFiber)
    }
    // 下个循环 对 兄弟 fiber 进行比较 (和 下面的  i++ 一个道理)
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }
    // 如果是 第一个 子元素，则把 新的 fiber 挂到 wipFiber 的  child 属性上
    if (index === 0) {
      wipFiber.child = newFiber
    } else if (element) {
      // 其他的 子元素 ，挂到 上一个子元素的 sibling 属性上
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }
}


// 事件属性
const isEvent = key => key.startsWith("on")
// 除 事件属性 和 特殊属性 children 外的属性
const isProperty = key =>
  key !== "children" && !isEvent(key)
// 是否为新增属性
const isNew = (prev, next) => key =>
  prev[key] !== next[key]
// 是否要移除属性
const isGone = (prev, next) => key => !(key in next)

function updateDom(dom, prevProps, nextProps) {
  // 移除旧事件
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        !(key in nextProps) ||
        isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })

  // 移除旧属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ""
    })

  // 添加或更新新属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })

  // 添加监听事件
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })
}



function App(props) {
  return <h1>Hi {props.name}</h1>
}
const element = <App name="foo" />
const container = document.getElementById("root")
Didact.render(element, container)
