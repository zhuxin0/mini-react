// import React from "react";
// import ReactDOM from "react-dom";
import { ReactDOM, Component, useReducer, useState } from "../which-react";

import "./index.css";


function FunctionComponent2(props) {
  const [count, setCount] = useReducer((x) => x + 1, 0);
  // const [count2, setCount2] = useState(0);

  return (
   <>
   <h1>{count}</h1>
   <button onClick={() => setCount(count + 1)}>+</button>
   </>
  );
}

function FunctionComponent(props) {
  // const [count, setCount] = useReducer((x) => x + 1, 0);
  // const [count2, setCount2] = useState(0);

  return (
    <div className="border">
      <p>{props.name}</p>
      {props.children}
      {/* <button onClick={() => setCount()}>{count}</button>
      <button onClick={() => setCount2(count2 + 1)}>{count2}</button>

      {count % 2 ? <div>omg</div> : <span>o</span>} */}
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <h3>{this.props.name}</h3>
        我是文本
      </div>
    );
  }
}

function FragmentComponent() {
  return (
    <ul>
      <>
        <li>part1</li>
        <li>part2</li>
      </>
    </ul>
  );
}

const jsx = (
  <div className="border">
    <h1>react</h1>
    <a href="https://www.baidu.com">mini react</a>
    {/* <FunctionComponent name="函数组件" >
      <FunctionComponent2 />
    </FunctionComponent> */}
    <ClassComponent name="类组件" />
    <FunctionComponent2 />
    <FragmentComponent />
    <div>ffff</div>
  </div>

);

console.log(jsx,67);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(jsx);

// 实现了常见组件初次渲染

// 原生标签
// 函数组件
// 类组件
// 文本
// Fragment
