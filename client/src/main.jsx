import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";
import RecipePost from "./pages/RecipePost.jsx";
import PostPage from "./pages/PostPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

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
    path: "/registration-page",
    element: <RegistrationPage />,
  },
  {
    path: "/login-page",
    element: <LoginPage />, //<SignUpPage/>
  },
  {
    path: "/post/:id",
    element: <PostPage />, //Individual Page
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
