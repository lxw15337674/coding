// 数组转树结构
const transform = (arr) => {
  const map = new Map()
  const tree = {}
  for (let item of arr) {
    const parent = map.get(item.parentId)
    if (parent) {
      if (!parent.child) parent.child = []
      parent.child.push(item)
    } else {
      tree[item.id] = item
    }
    map.set(item.id, tree[item.id])
  }
  return tree
}

const arr = [{
  id: 2,
  name: '部门B',
  parentId: 0
},
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
}
]

console.log(
  transform(arr)
)