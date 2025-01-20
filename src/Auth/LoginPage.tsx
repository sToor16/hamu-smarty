import { motion } from "framer-motion";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoginUserGql, getVerifyTokenGql } from "../gqlService/auth";
import "./LoginPage.css";

interface LoginPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const inputVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  focus: {
    borderColor: "#1890ff",
    boxShadow: "0 0 5px rgba(24, 144, 255, 0.8)",
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#40a9ff",
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95 },
};

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
  const [error, setError] = useState("");
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get("auth_token");
      if (token !== undefined) {
        try {
          const requestOptions = getVerifyTokenGql(token);
          const response = await fetch(
            requestOptions.url,
            requestOptions.params,
          );
          const { data, errors } = await response.json();

          if (errors) {
            console.error("Error verifying token:", errors);
            return;
          }

          console.log(data);
          if (data.verifyToken === true) {
            setIsAuthenticated(true);
            navigate("/");
          }
        } catch (error) {
          console.error("Error verifying token:", error);
        }
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = form;

    try {
      const requestOptions = getLoginUserGql({
        username,
        password,
      });

      const response = await fetch(requestOptions.url, requestOptions.params);
      const result = await response.json();
      const { data, errors } = result;

      if (errors) {
        setError(errors[0]?.message);
        return;
      }

      const token = data.login.token;
      Cookies.set("auth_token", token, { expires: 365, secure: true });
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <motion.div className="login-container" initial="hidden" animate="visible">
      <motion.div className="login-card" variants={cardVariants}>
        <h2 className="login-title">Welcome to Our Story</h2>
        <p className="login-text">Please log in to continue</p>

        <form className="login-form" onSubmit={handleLogin}>
          <motion.div className="form-group" variants={inputVariants}>
            <label htmlFor="username">Username</label>
            <motion.input
              whileHover="hover"
              whileFocus="focus"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="login-input"
            />
          </motion.div>

          <motion.div className="form-group" variants={inputVariants}>
            <label htmlFor="password">Password</label>
            <motion.input
              whileHover="hover"
              whileFocus="focus"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="login-input"
            />
          </motion.div>

          {error && <motion.p className="error-message">{error}</motion.p>}

          <motion.button
            type="submit"
            className="login-button"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            Log in
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
