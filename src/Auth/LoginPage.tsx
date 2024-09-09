import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "./authConfig";
import "./LoginPage.css";

const { Title, Text } = Typography;

interface LoginPageProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If already authenticated, redirect to home
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    if (isAuthenticated) {
      navigate("/"); // Redirect to home page if logged in
    }
  }, [navigate]);

  const handleLogin = (values: { username: string; password: string }) => {
    const { username, password } = values;

    const user = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (user) {
      setError("");
      localStorage.setItem("authenticated", "true");
      setIsAuthenticated(true); // Update authentication status
      navigate("/"); // Redirect to home page after successful login
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col xs={22} sm={16} md={12} lg={8}>
          <Card className="login-card">
            <Title
              level={2}
              style={{ textAlign: "center", marginBottom: "24px" }}
            >
              Welcome to Our Story
            </Title>
            <Text
              type="secondary"
              style={{
                textAlign: "center",
                display: "block",
                marginBottom: "24px",
              }}
            >
              Please log in to continue
            </Text>
            <Form name="login" onFinish={handleLogin} layout="vertical">
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Username is required!" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              {error && <Text type="danger">{error}</Text>}

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
