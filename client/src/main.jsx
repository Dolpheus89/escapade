import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import City from "./pages/City";
import User from "./pages/User";
import { UserProvider } from "./contexts/UserContext";
import { SearchProvider } from "./contexts/SearchContext";
import { XpBarProvider } from "./contexts/XpBarContext";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import LevelTraveller from "./components/LevelTraveller";
import fetchLocalApi from "./functions/fetchLocalApi";
import "./styles/reset.css";
import "./styles/index.css";
import Search from "./pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LevelTraveller />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetchLocalApi("https://city-info-server.netlify.app/"),
      },
      {
        path: "/city/:id",
        element: <City />,
        loader: () => fetchLocalApi("https://city-info-server.netlify.app/"),
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/search",
    element: <Search />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <UserProvider>
          <XpBarProvider>
            <RouterProvider router={router} />
          </XpBarProvider>
        </UserProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
