import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from "./pages/Users/User";
import PostAdd from "./pages/Users/Posts/PostAddPutForm";
import Post from "./pages/Users/Posts/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "user/posts/:userId",
    element: <User />,
    children: [
      {
        path: "add/:userId",
        element: (
          <PostAdd
            requestType='POST'
            initialValues={{ userId: 0, id: "", title: "", body: "" }}
          />
        ),
      },
    ],
  },
  {
    path: "post/details/:postId",
    element: <Post />,
    children: [
      {
        path: "update/:postId",
        element: (
          <PostAdd
            requestType='PUT'
            initialValues={{ userId: 0, id: "", title: "", body: "" }}
          />
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
