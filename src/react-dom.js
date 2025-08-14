import { createFiber } from "./ReactFiber";
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";
function RootDOMRoot (internalRoot){
 
  this._internalRoot = internalRoot;

}

RootDOMRoot.prototype.render = function (children) {
  const { containerInfo } = this._internalRoot;
  updateContainer(children,containerInfo)
};

function updateContainer (children, containerInfo) {
  const rootFiber = createFiber(children,{
    type:containerInfo.nodeName.toLowerCase(),
    stateNode:containerInfo,
  })
  scheduleUpdateOnFiber(rootFiber)
  
}


function createRoot (container) {
  const root = {
    containerInfo: container,
  };
  return new RootDOMRoot(root);
};

export default { createRoot };