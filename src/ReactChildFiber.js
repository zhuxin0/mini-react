import { createFiber } from "./ReactFiber";
import { isStringOrNumber, Update, sameNode } from "./utils";

function deleteChild(returnFiber, childToDelete) {
  if (returnFiber?.deletions) {
    returnFiber.deletions.push(childToDelete);
  } else {
    returnFiber.deletions = [childToDelete];
  }
}
function reconcileChildren(wip, children) {
  if (isStringOrNumber(children)) {
    return;
  }

  let newFiber = null;
  let previousNewFiber = null;
  let arr = Array.isArray(children) ? children : [children];
  let oldFiber = wip.alternate?.child;

  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      continue;
    }
    newFiber = createFiber(arr[i], wip);
    const isSame = sameNode(oldFiber, newFiber);
    if (isSame) {
      Object.assign(newFiber, {
        stateNode: oldFiber.stateNode,
        alternate: oldFiber,
        flags: Update,
      });
    }

    if (!isSame && oldFiber?.stateNode) {
      deleteChild(wip, oldFiber);
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (previousNewFiber === null) {
      wip.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
  // 简单按顺序实现 0,1,2,3,4 => 0,1,2 多节点删除

  if (oldFiber) {
    deleteRemainingChildren(wip,oldFiber)
  }
}

function deleteRemainingChildren(wip, oldFiber) {
  let childToDelete = oldFiber;
  while (childToDelete) {
    deleteChild(wip, childToDelete);
    childToDelete = childToDelete.sibling;
  }
}

export { deleteChild, reconcileChildren };
