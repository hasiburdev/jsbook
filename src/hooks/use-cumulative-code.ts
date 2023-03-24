import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return (
    useTypedSelector((state) => {
      if (state.cells?.data && state.cells?.order) {
        const { data, order } = state.cells;
        const orderedCells = order.map((id: string) => data[id]);

        const showFunction = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      var show = (value) => {
        const rootElement = document.querySelector('#root');
        if(typeof value === 'object') {
          if(value.$$typeof && value.props) {
            _ReactDOM.render(value, rootElement);  
          } else {
            rootElement.innerHTML = JSON.stringify(value);
          }
        } else {
          rootElement.innerHTML = value;
        }
      }
      `;
        const showFunctionNoOp = `var show = () => {}`;
        const stateCodes = [];
        for (let c of orderedCells) {
          if (c.type === "code") {
            if (c.id === cellId) {
              stateCodes.push(showFunction);
            } else {
              stateCodes.push(showFunctionNoOp);
            }
            stateCodes.push(c.content);
          }
          if (c.id === cellId) {
            break;
          }
        }
        return stateCodes;
      }
    })?.join("\n") || ""
  );
};
