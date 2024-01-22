// 数组转树结构
const transform = (arr) => {
  // 方法一，先全部存到map里，然后再进行节点挂载，parent为0则为根节点。
  // 时间复杂度O(2N)
  // let tree = null;
  // for (let node of arr) {
  //   map.set(node.id, node);
  // }
  // for (let node of arr) {
  //   if (node.parentId === 0) {
  //     tree = [node];
  //     continue;
  //   }
  //   const parentNode = map.get(node.parentId);
  //   if (!parentNode.child) {
  //     parentNode.child = [];
  //   }
  //   parentNode.child.push(node);
  // }
  // return tree;

  // 方法二，遍历时就进行挂载，如果父节点不存在，就先造一个只有id的父节点，当节点已存在，就只需要把节点的属性赋值到前面造的节点上
  // 时间复杂度O（N）
  const map = new Map()
  let tree = null
  for (let node of arr) {
    // 当前节点处理，先判断map里是否已存在，如果已经存在就是之前已经造过的，进行属性合并，不存在就存到map里
    let currentNode = map.get(node.id)
    if (!currentNode) {
      currentNode = node
      map.set(currentNode.id, currentNode)
    } else {
      Object.assign(currentNode, node);
    }

    // 父节点处理，如果不存在就造一个父节点，用来挂载。
    let parentNode = map.get(currentNode.parentId)
    // 如果不存在就造一个节点
    if (!parentNode) {
      parentNode = {
        id: currentNode.parentId,
      }
      map.set(parentNode.id, parentNode)
    }

    // 节点挂载，根节点就挂在tree上，否则就挂载在父节点上
    // 根节点
    if (currentNode.parentId === 0) {
      tree = [currentNode]
      continue
    }
    if (!parentNode.child) {
      parentNode.child = []
    }
    parentNode.child.push(currentNode)
  }
  return tree
}

const arr = [
  {
    id: 3,
    name: '部门C',
    parentId: 1
  },
  {
    id: 1,
    name: '部门A',
    parentId: 2
  },
  {
    id: 4,
    name: '部门D',
    parentId: 1
  },
  {
    id: 5,
    name: '部门E',
    parentId: 2
  },
  {
    id: 6,
    name: '部门F',
    parentId: 3
  },
  {
    id: 7,
    name: '部门G',
    parentId: 2
  },
  {
    id: 8,
    name: '部门H',
    parentId: 4
  },
  {
    id: 2,
    name: '部门B',
    parentId: 0
  },
]

const tree = transform(arr)
console.log(tree);

