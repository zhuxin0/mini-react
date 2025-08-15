import {
  updateClassComponent,
  updateFragmentComponent,
  updateFunctionComponent,
  updateHostComponent,
  updateTextComponent,
} from "./ReactFiberReconciler";
import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText,
} from "./ReactWorkTags";
import { scheduleCallback } from "./scheduler";
import { isFn, isStr, Placement, Update, updateNode } from "./utils";

// work in progress 当前正在工作中的 fiber
let wip = null;
let wipRoot = null;

export function scheduleUpdateOnFiber(fiber) {
  wip = fiber;
  wipRoot = fiber;
}

// 1. 执行当前wip任务
// 2. 更新wip
function performUnitOfWork() {
  const { tag } = wip;
  switch (tag) {
    case HostComponent:
      updateHostComponent(wip);
      break;
    case HostText:
      updateTextComponent(wip);
      break;
    case ClassComponent:
      updateClassComponent(wip);
      break;
    case FunctionComponent:
      updateFunctionComponent(wip);
      break;
    case Fragment:
      updateFragmentComponent(wip);
      break;

    default:
      break;
  }

  // 深度优先遍历(国王的故事)
  if (wip.child) {
    wip = wip.child;
    return;
  }

  let next = wip;

  while (next) {
    if (next.sibling) {
      wip = next.sibling;
      return;
    }
    next = next.return;
  }
  wip = null;
}

function wookloop(deadline) {
  // 判断浏览器空闲时间是否可以执行任务

  while (wip && deadline.timeRemaining() > 1) {
    performUnitOfWork();
  }
  if (!wip && wipRoot) {
  
    commitRoot(wipRoot);
 
  }
  
  
}

function commitRoot(wipRoot) {
  commitWork(wipRoot)
 wipRoot = null
}

function getParentNode(fiber){
  let next = fiber.return
  while(next){
    if(next.stateNode){
      return next.stateNode
    }
    next = next.return
  }
}

function commitWork(fiber){
  if(!fiber){
    return
  }
  const {flags, stateNode} = fiber
  let parentNode = getParentNode(fiber)
  if(flags === Placement && stateNode){
    parentNode.appendChild(stateNode)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
   
}

requestIdleCallback(wookloop);
