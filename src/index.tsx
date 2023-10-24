import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {ThemeProvider} from "styled-components";
import {GlobalStyle, themeSchema} from "./style/theme";
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {QueryClientProvider, QueryClient} from "react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const client = new QueryClient();

root.render(
  <ThemeProvider theme={themeSchema}>
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
