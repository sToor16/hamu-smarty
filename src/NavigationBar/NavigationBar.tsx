import { Affix, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { navigationUrls } from "../util/contants";

const NavigationBar = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(navigationUrls.home);
  };

  return (
    <Affix>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home" onClick={navigateToHome}>
          Home
        </Menu.Item>
      </Menu>
    </Affix>
  );
};

export default NavigationBar;
