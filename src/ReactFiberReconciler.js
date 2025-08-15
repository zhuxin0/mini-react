import { createFiber } from "./ReactFiber";
import { isArray, isStringOrNumber, Update } from "./utils";

// 原生标签函数
export function updateHostComponent(wip) {
 if(!wip.stateNode){
  const stateNode = document.createElement(wip.type)
  wip.stateNode = stateNode
 }
 updateNode(wip.stateNode,wip.props)
  reconcileChildren(wip,wip.props.children)
 
}

export function updateTextComponent(wip) {
  const {props} = wip
  const text = props.children
  wip.stateNode = document.createTextNode(text)
 
}

export function updateFragmentComponent(wip) {
  reconcileChildren(wip,wip.props.children)
 
}

//
export function updateFunctionComponent(wip) {
  const {type, props} = wip
  const children = type(props)
  reconcileChildren(wip,children)
}

export function updateClassComponent(wip) {

  const {type, props} = wip
  const instance = new type(props)
  const children = instance.render()
  reconcileChildren(wip,children)
 
}

function deleteChild(returnFiber, childToDelete) {
 
}

// a b c
// b c
function reconcileChildren(wip, children) {
  if (isStringOrNumber(children)) {
    return;
  }


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