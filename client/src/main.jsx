import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import RecipePost from "./pages/RecipePost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/recipes",
    element: <RecipePost />,
  },
  {
    path: "/create-a-post",
    element: <CreatePostPage />, //<CreatePostPage/>
  },
  {
    path: "/signin",
    element: <SignInPage />, // SIgnInPage
  },
  {
    path: "/signup",
    element: <SignUpPage />, //<SignUpPage/>
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
