import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Auth/LoginPage";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Roka from "./Events/Roka";
import { isTokenValid } from "./gqlService/auth";
import Homepage from "./Homepage/Homepage";
import Navbar from "./NavigationBar/Navbar";
import { navigationUrls } from "./util/constants";
import { ThemeProvider } from "./util/ThemeProvider";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const checkAuthentication = async (): Promise<boolean> => {
    try {
      return await isTokenValid();
    } catch (error) {
      console.error("Error verifying token:", error);
      return false;
    }
  };

  useEffect(() => {
    const authListener = async () => {
      const authStatus = await checkAuthentication();
      setIsAuthenticated(authStatus);
      setIsAuthLoading(false);
    };
    authListener();
  }, []);

  useEffect(() => {
    const authListener = async () => {
      const authStatus = await checkAuthentication();
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
  }, [isAuthenticated, isAuthLoading, navigate]);

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
              path={navigationUrls["the-roka"]}
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Roka />
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
