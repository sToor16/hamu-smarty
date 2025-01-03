import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "./authConfig"; // Assuming you have an authConfig.ts file with user credentials
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
    const isAuthenticated = users.some((user) => {
      const storedValue = localStorage.getItem(user.key);
      return storedValue === user.value;
    });

    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = form;

    const user = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (user) {
      setError("");
      localStorage.setItem(user.key, user.value);

      setIsAuthenticated(true);
      navigate("/");
    } else {
      setError("Invalid credentials. Please try again.");
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
