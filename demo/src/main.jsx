// import React from "react";
// import ReactDOM from "react-dom";
import { ReactDOM, Component, useReducer, useState } from "../which-react";

import "./index.css";

function FunctionComponent2(props) {
  const [count, setCount] = useReducer((x) => x + 1, 0);
  const [count2, setCount2] = useState(6);

  return (
    <>
      <h1>{count}</h1>
      <h1>{count2}</h1>
      {count % 2 ? <div>omg</div> : <span>o</span>}
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount2(count2 + 1)}>+</button>
      <button
        onClick={() => {
          setCount2(3);
        }}
      >
        1
      </button>
      <ul>
        {[1, 2, 3, 4, 5].map((item) => {
          return count2 > item ? <li key={item}>{item}</li> : null;
        })}
      </ul>
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

console.log(jsx, 67);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(jsx);

// 实现了常见组件初次渲染

// 原生标签
// 函数组件
// 类组件
// 文本
// Fragment
