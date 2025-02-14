
let nextUnitOfWork: any = null;

function workLoop(deadline: any) {
    let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop);

function performUnitOfWork(nextUnitOfWork: any) {
    // TODO
}
