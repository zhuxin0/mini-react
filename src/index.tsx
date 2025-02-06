
interface ReactElement {
    $$typeof: symbol;
    type: string;
    props: {
        nodeValue?: string;
        children: ReactElement[];
        [key: string]: any;
    };
    key: string | null;
    ref: any | null;
}

/**
 * @description 创建文本节点
 * @param text
 * @returns
 */
const createTextElement = (text: string): ReactElement => {
    return {
        $$typeof: Symbol.for('react.element'),
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [],
        },
        key: null,
        ref: null
    };
};

/**
 * @description 创建元素节点
 * @param type
 * @param props
 * @param children
 * @returns
 */
const createElement = (
    type: string,
    props: { [key: string]: any } | null,
    ...children: (ReactElement | string)[]
): ReactElement => {
    return {
        $$typeof: Symbol.for('react.element'),
        key: props?.key || null,
        ref: props?.ref || null,
        type,
        props: {
            ...props,
            children: children?.map((child) => {
                return typeof child === 'object' ? child : createTextElement(child);
            }),
        },
    };
};

/**
 * @description 渲染元素
 * @param element
 * @param root
 */
const render = (element: ReactElement, root: HTMLElement): void => {
    const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);
    console.log(dom);

    Object.keys(element.props)?.filter(name => name !== 'children').forEach((name) => {
        // debugger;
        if (name !== 'children') {
            (dom as HTMLElement)[name] = element.props[name];
        }

    });
    if (element.props.children?.length) {
        element.props.children.forEach((child) => {
            render(child, dom as HTMLElement);
        })
    }

    root.appendChild(dom);
};

const ReactLib = {
    createElement,
    createTextElement,
    render,
};


// babel 解析时，执行ReactLib.createElement
/** @jsx ReactLib.createElement */
const element = (
    <div>
        <h1 id="title">hello world <a href="https://www.baidu.com">百度</a></h1>
    </div>
);
const container = document.getElementById('root')



if (container) {
    ReactLib.render(element as ReactElement, container as HTMLElement);
}
