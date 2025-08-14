import { createFiber } from "./ReactFiber";
import { isArray, isStringOrNumber, Update } from "./utils";

// 原生标签函数
export function updateHostComponent(wip) {

  console.log(wip,8);

 if(!wip.stateNode){
  const stateNode = document.createElement(wip.type)
  wip.stateNode = stateNode
 }
 updateNode(wip.stateNode,wip.props)
  reconcileChildren(wip,wip.props.children)
 
}

export function updateTextComponent(wip) {
 
}

export function updateFragmentComponent(wip) {
 
}

//
export function updateFunctionComponent(wip) {
  
}

export function updateClassComponent(wip) {
 
}

function deleteChild(returnFiber, childToDelete) {
 
}

// a b c
// b c
function reconcileChildren(wip, children) {

  let newFiber = null
  let previousNewFiber = null

  let arr = Array.isArray(children) ? children : [children]
  
  for (let i = 0; i < arr.length; i++) {
    newFiber = createFiber(arr[i],wip)
    if(previousNewFiber === null){
      wip.child = newFiber
    }else{
      previousNewFiber.sibling = newFiber
    }
    previousNewFiber = newFiber
  }
  

}

// 1. 同一层级 2.相同的类型 3. 相同的key
function sameNode(a, b) {
  
}


function updateNode(stateNode, props) {
  for (const key in props) {
    if(key === 'children'){
      if(isStringOrNumber(props[key])){
        stateNode.textContent = props[key]
      }
    }else{
      stateNode[key] = props[key]
    }
  }
} 