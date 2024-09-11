import { Affix, Menu } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import React from "react";
import { useNavigate } from "react-router-dom";
import { navigationUrls } from "../util/contants";
import { useTheme } from "../util/ThemeProvider";

interface NavigationBarProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  setIsAuthenticated,
}) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  const navigateToHome = () => {
    navigate(navigationUrls.home);
  };

  const handleSpecialsItems = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    setIsAuthenticated(false);
    navigate(navigationUrls.login);
  };

  return (
    <Affix>
      <Menu
        theme={isDarkMode ? "dark" : "light"}
        mode="horizontal"
        defaultSelectedKeys={["home"]}
      >
        <Menu.Item key="home" onClick={navigateToHome}>
          Home
        </Menu.Item>
        <SubMenu key="specials" title="Specials">
          <Menu.Item
            key="hamu26"
            onClick={() => handleSpecialsItems(navigationUrls.specials.hamu26)}
          >
            Hamu's 26
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="theme-toggle" onClick={toggleDarkMode}>
          Switch to {isDarkMode ? "Light" : "Dark"} Mode
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
