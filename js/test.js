
const nodes = [
  {
    id: '1',
    name: 'Node 1',
    children: [
      {
        id: '1.1',
        name: 'Node 1.1',
        children: [
          {
            id: '1.1.1',
            name: 'Node 1.1.1',
          },
          {
            id: '1.1.2',
            name: 'Node 1.1.2',
          },
        ],
      },
      {
        id: '1.2',
        name: 'Node 1.2',
      },
    ],
  },
  {
    id: '2',
    name: 'Node 2',
    children: [
      {
        id: '2.1',
        name: 'Node 2.1',
      },
    ],
  },
];

const getParentNodes = (nodes, key, value) => {
  const tra = (nodes, parentNodes) => {
    for (let item of nodes) {
      if (item[key] === value) {
        return parentNodes;
      }
      if (item.children) {
        const res = tra(item.children, parentNodes.concat({ item }));
        if (res) {
          return res;
        }
      }
    }
    return null;
  };
  return tra(nodes, []);
};
console.log(getParentNodes(nodes, 'id', '1.1.2'))