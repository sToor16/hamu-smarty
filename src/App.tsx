import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Auth/LoginPage";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Homepage from "./Homepage/Homepage";
import NavigationBar from "./NavigationBar/NavigationBar";
import Hamu26th from "./Specials/Hamu26th";
import { navigationUrls } from "./util/contants";
import { ThemeProvider } from "./util/ThemeProvider";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authenticated") === "true",
  );
  const navigate = useNavigate();

  useEffect(() => {
    const authListener = () => {
      const authStatus = localStorage.getItem("authenticated") === "true";
      setIsAuthenticated(authStatus);
    };

    window.addEventListener("storage", authListener);

    return () => {
      window.removeEventListener("storage", authListener);
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(navigationUrls.login);
    }
  }, [isAuthenticated, navigate]);

  return (
    <ThemeProvider>
      <Layout>
        {isAuthenticated && (
          <NavigationBar setIsAuthenticated={setIsAuthenticated} />
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
              path={navigationUrls.specials.hamu26}
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
