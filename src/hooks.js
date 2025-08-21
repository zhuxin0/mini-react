import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";
let currentFiber = null;
let workInProgressHook = null;

 function renderWithHooks(wip) {
  currentFiber = wip;
  workInProgressHook = null;
  wip.memoizedState = null;
}

function updateWorkInProgressHook() {
  let hook;

  // 初次渲染
  if (!currentFiber.alternate) {
    hook = {
      memoizedState: null,
      next: null,
    };

    if (!workInProgressHook) {
      currentFiber.memoizedState = hook;
      workInProgressHook = hook;
      return hook;
    } else {
      workInProgressHook.next = hook;
      workInProgressHook = hook;
      return hook;
    }

    // 更新
  } else {
    currentFiber.memoizedState = currentFiber.alternate.memoizedState;
    if (!workInProgressHook) {
      hook = workInProgressHook = currentFiber.alternate.memoizedState;
    } else {
      hook = workInProgressHook = workInProgressHook.next;
    }
    return hook;
  }
}

function useReducer(reducer, initialState) {
  // 取出当前hook
  const hook = updateWorkInProgressHook();
  if (!currentFiber?.alternate) {
    hook.memoizedState = initialState;
  }
  function dispatch(action) {
    hook.memoizedState = reducer(hook.memoizedState);
    currentFiber.alternate = { ...currentFiber };
    scheduleUpdateOnFiber(currentFiber);
  }
  return [hook.memoizedState, dispatch];
}

function useState(initialState) {}
export { useReducer, useState, renderWithHooks };
