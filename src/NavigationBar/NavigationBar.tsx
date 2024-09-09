import { Affix, Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { navigationUrls } from "../util/contants";

interface NavigationBarProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  setIsAuthenticated,
}) => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  const navigateToHome = () => {
    navigate(navigationUrls.home);
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticated"); // Remove authentication status
    setIsAuthenticated(false); // Update the authentication state
    navigate(navigationUrls.login); // Redirect to the login page
  };

  return (
    <Affix>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home" onClick={navigateToHome}>
          Home
        </Menu.Item>
        {isAuthenticated && (
          <Menu.Item
            key="logout"
            onClick={handleLogout}
            style={{ marginLeft: "auto" }}
          >
            Logout
          </Menu.Item>
        )}
      </Menu>
    </Affix>
  );
};

export default NavigationBar;
