export const render = (element, container) => {
  const node = document.createElement(element.type);
  container.appendChild(node);
};
