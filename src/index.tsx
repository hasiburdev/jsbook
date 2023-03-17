import { createRoot } from "react-dom/client";
import App from "./App";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store } from "./state";

const domNode = document.getElementById("root");
const root = createRoot(domNode as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
