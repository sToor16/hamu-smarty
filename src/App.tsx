import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { users } from "./Auth/authConfig";
import LoginPage from "./Auth/LoginPage";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Hamu26th from "./Events/Hamu26th";
import Homepage from "./Homepage/Homepage";
import Navbar from "./NavigationBar/Navbar";
import { navigationUrls } from "./util/contants";
import { ThemeProvider } from "./util/ThemeProvider";

const GA_TRACKING_ID = "G-GV1G062DFJ";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const routerLocation = useLocation();

  useEffect(() => {
    ReactGA.initialize(GA_TRACKING_ID);
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: routerLocation.pathname });
  }, [routerLocation]);

  const checkAuthentication = () => {
    const authenticatedUser = users.find((user) => {
      const storedValue = localStorage.getItem(user.key);
      return storedValue === user.value;
    });

    if (authenticatedUser) {
      setUserId(authenticatedUser.username);
      return true;
    }
    return false;
  };
  useEffect(() => {
    const authStatus = checkAuthentication();
    setIsAuthenticated(authStatus);
    setIsAuthLoading(false);
  }, []);

  useEffect(() => {
    const authListener = () => {
      const authStatus = checkAuthentication();
      setIsAuthenticated(authStatus);
    };

    window.addEventListener("storage", authListener);

    return () => {
      window.removeEventListener("storage", authListener);
    };
  }, []);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate(navigationUrls.login);
    }

    if (isAuthenticated) {
      ReactGA.set({ userId: userId });
    }
  }, [isAuthenticated, isAuthLoading, navigate, userId]);

  if (isAuthLoading) {
    return null;
  }

  return (
    <ThemeProvider>
      <Layout>
        {isAuthenticated && (
          <Navbar
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
          />
        )}
        <Layout>
          <Routes>
            <Route
              path={navigationUrls.login}
              element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path={navigationUrls.home}
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path={navigationUrls.events.hamu26}
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Hamu26th />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Homepage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>

        {isAuthenticated && (
          <Layout.Footer
            style={{
              textAlign: "center",
              backgroundColor: "var(--background-color)",
              color: "var(--text-color)",
            }}
          >
            Made with &nbsp;
            <span role="img" aria-label="heart">
              ❤️
            </span>
            &nbsp; by Hamu & Smarty
          </Layout.Footer>
        )}
      </Layout>
    </ThemeProvider>
  );
};

export default App;
