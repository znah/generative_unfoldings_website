module.exports.traverse = traverseDepthFirst;
module.exports.traverseDepthFirst = traverseDepthFirst;
function traverseDepthFirst(root, cb) {
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.shift();
    const ret = cb(node, root);
    if (ret === false) return;
    if (node.children) {
      const children = [...node.children];
      if (children.length > 0) {
        stack.unshift(...children);
      }
    }
  }
}

module.exports.traverseBreadthFirst = traverseBreadthFirst;
function traverseBreadthFirst(root, cb) {
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.shift();
    const ret = cb(node, root);
    if (ret === false) return;
    if (node.children) {
      const children = [...node.children];
      if (children.length > 0) {
        stack.push(...children);
      }
    }
  }
}

module.exports.getLeafNodes = getLeafNodes;
function getLeafNodes(root, filter = () => true) {
  const leafNodes = [];
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.shift();
    const ret = filter(node, root);
    if (ret === false) continue;
    const children = node.children ? [...node.children] : null;
    if (children && children.length > 0) {
      stack.unshift(...children);
    } else {
      leafNodes.push(node);
    }
  }
  return leafNodes;
}
