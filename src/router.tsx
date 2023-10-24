import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Tvshow from "./views/Tvshow";
import Home from "./views/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "tv",
        element: <Tvshow />,
      },
    ],
  },
  {},
]);
