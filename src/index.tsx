import { createRoot } from "react-dom/client";
import App from "./App";

const domNode = document.getElementById("root");
const root = createRoot(domNode as HTMLElement);

root.render(<App />);
