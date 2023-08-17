import React, { useContext } from "react";
import { createBrowserRouter, redirect, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.js";

import Dashboard from '../Dashboard/Dashboard.js';
import Login from '../SignIn/SignIn.js';
import SignUp from '../SignUp/SignUp.js';
import SignImage from '../SignImage/SignImage';
import Profile from '../Profile/Profile.js';
import SignIn from "../SignIn/SignIn.js";


function BuildRouter() {
  
  // const context = useContext(AuthContext);

  const Layout = () => {
    return (
      <Outlet />
    )
  }

  const inviteLoader = () => {
    return null
  }

  const userLoader = () => {
    // if (!context.isConnected) redirect("/login")
    // else return null
    return null

  }

  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      loader() {
        return 'loader';
      },
      Component: Layout,
      children: [
        {
          index: true,
          element: <SignIn />,
        },
        {
          path: "signin",
          // action: privateAction,
          loader: inviteLoader,
          element: <SignIn />,
        },
        {
          path: "signup",
          // action: publicAction,
          loader: inviteLoader,
          element: <SignUp />,
        },
        {
          path: "dashboard",
          // action: publicAction,
          loader: userLoader,
          element: <Dashboard />,
        },
        {
          path: "sign-image",
          // action: publicAction,
          loader: userLoader,
          element: <SignImage />,
        },
        {
          path: "profile",
          // action: publicAction,
          loader: userLoader,
          element: <Profile />,
        },
      ],
    },
  ],{ basename: "/app"});

  return (router)
}


const Router = BuildRouter()

export default Router;
