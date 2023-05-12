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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

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
            loader: contactLoader(queryClient),
            action: contactAction(queryClient),
          },
          {
            path: "/contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader(queryClient),
            action: editAction(queryClient),
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
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
