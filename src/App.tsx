import { Layout } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import NavigationBar from "./NavigationBar/NavigationBar";
import { navigationUrls } from "./util/contants";

const App: React.FC = () => {
  return (
    <Layout className="layout">
      <NavigationBar />
      <Layout>
        <Routes>
          <Route path={navigationUrls.home} element={<Homepage />} />
        </Routes>
      </Layout>
      <Layout.Footer style={{ textAlign: "center", background: "white" }}>
        Made with &lt;3 by hamu & smarty{" "}
      </Layout.Footer>
    </Layout>
  );
};

export default App;
