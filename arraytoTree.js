// 数组转树结构
const transform = (arr) => {
  const map = new Map();
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const { id, parentId, name } = arr[i];

    let current = map.get(id);
    let parent = map.get(parentId);

    if (!current) {
      current = { id, name, children: [] };
      map.set(id, current);
    } else {
      current.name = name;
    }

    if (!parent) {
      parent = { id: parentId, name: null, children: [] };
      map.set(parentId, parent);
    }

    if (parentId === 0) {
      result.push(current);
    } else {
      parent.children.push(current);
    }
  }

  return result;
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

console.log(transform(arr))