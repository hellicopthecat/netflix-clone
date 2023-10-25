import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Tvshow from "./views/Tvshow";
import Home from "./views/Home";
import Search from "./views/Search";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "movies/:movieID",
            element: <Home />,
          },
        ],
      },
      {
        path: "tv",
        element: <Tvshow />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
  {},
]);
