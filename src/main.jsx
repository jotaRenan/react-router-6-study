import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Contact from "./routes/contact";
import ErrorPage from "./error-page";
import EditContact from "./routes/edit";
import Index from "./routes";
import { loader as rootLoader } from "./loaders/root";
import { loader as contactLoader } from "./loaders/contact";
import { action as rootAction } from "./actions/root";
import { action as contactAction } from "./actions/contact";
import { action as editAction } from "./actions/edit";
import { action as destroyAction } from "./actions/destroy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "/contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "/contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "/contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

// https://reactrouter.com/en/main/start/tutorial#url-search-params-and-get-submissions

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
