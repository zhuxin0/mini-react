import { createFiber } from "./ReactFiber";
import {
  isArray,
  isStringOrNumber,
  Update,
  updateNode,
  sameNode,
} from "./utils";
import { renderWithHooks } from "./hooks";
import { reconcileChildren } from "./ReactChildFiber";

// 原生标签函数
export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    const stateNode = document.createElement(wip.type);
    wip.stateNode = stateNode;
  }
  updateNode(wip.stateNode, {}, wip.props);
  reconcileChildren(wip, wip.props.children);
}

export function updateTextComponent(wip) {
  const { props } = wip;
  const text = props.children;
  wip.stateNode = document.createTextNode(text);
}

export function updateFragmentComponent(wip) {
  reconcileChildren(wip, wip.props.children);
}

//
export function updateFunctionComponent(wip) {
  renderWithHooks(wip);
  const { type, props } = wip;
  const children = type(props);
  reconcileChildren(wip, children);
}

export function updateClassComponent(wip) {
  const { type, props } = wip;
  const instance = new type(props);
  const children = instance.render();
  reconcileChildren(wip, children);
}
