import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { users } from "./Auth/authConfig"; // Assuming this contains the user data
import LoginPage from "./Auth/LoginPage";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Hamu26th from "./Events/Hamu26th";
import Homepage from "./Homepage/Homepage";
import Navbar from "./NavigationBar/Navbar";
import { navigationUrls } from "./util/contants";
import { ThemeProvider } from "./util/ThemeProvider";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Function to check if user is authenticated by verifying cryptic key-value pair
  const checkAuthentication = () => {
    return users.some((user) => {
      const storedValue = localStorage.getItem(user.key);
      return storedValue === user.value;
    });
  };

  useEffect(() => {
    // On mount, check if the user is authenticated
    const authStatus = checkAuthentication();
    setIsAuthenticated(authStatus);
  }, []);

  useEffect(() => {
    const authListener = () => {
      // Recheck authentication when localStorage changes
      const authStatus = checkAuthentication();
      setIsAuthenticated(authStatus);
    };

    // Listen for localStorage changes (e.g., another tab logs in/out)
    window.addEventListener("storage", authListener);

    return () => {
      window.removeEventListener("storage", authListener);
    };
  }, []);

  useEffect(() => {
    // Navigate to login page if user is not authenticated
    if (!isAuthenticated) {
      navigate(navigationUrls.login);
    }
  }, [isAuthenticated, navigate]);

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
