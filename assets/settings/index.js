import App from "./components/App";

import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Setting from "./components/Setting";
import Style from "./components/Style";
import Advanced from "./components/Advanced";
import AddOns from "./components/AddOns";
import Info from "./components/Info";
import "./main.scss";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Setting />,
      },
      {
        path: "style",
        element: <Style />,
      },
      {
        path: "advanced",
        element: <Advanced />,
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "add-ons",
        element: <AddOns />,
      },
    ],
  },
]);

const container = document.getElementById("login-prime-settings");

const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<RouterProvider router={router} />);
