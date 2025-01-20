import { motion } from "framer-motion";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun, FaTree } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { navigationUrls } from "../util/constants";
import { Theme, useTheme } from "../util/ThemeProvider";
import "./Navbar.css";

interface NavbarProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  setIsAuthenticated,
  isAuthenticated,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const handleLogout = () => {
    Cookies.remove("auth_token");
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <motion.img
            src={Logo}
            alt="Logo"
            style={{
              marginTop: "5px",
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            whileTap={{ scale: 0.95 }}
          />
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <motion.div
          className="bar"
          animate={
            isOpen
              ? { rotate: 45, y: 10.5, width: 35.36 }
              : { rotate: 0, y: 0, width: 25 }
          }
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="bar"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="bar"
          animate={
            isOpen
              ? { rotate: -45, y: -10.5, width: 35.36 }
              : { rotate: 0, y: 0, width: 25 }
          }
          transition={{ duration: 0.3 }}
        />
      </div>

      <motion.ul
        className="menu"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <li>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link to={navigationUrls["the-roka"]} onClick={toggleMenu}>
              The Roka
            </Link>
          </motion.div>
        </li>

        <div className="theme-options-small">
          <motion.button
            className={`theme-button ${
              currentTheme === Theme.Light ? "active-theme" : ""
            }`}
            whileTap={{ scale: 0.95 }}
            style={{ margin: "0px 4px" }}
            onClick={() => setTheme(Theme.Light)}
          >
            <FaSun size={20} />
          </motion.button>
          <motion.button
            className={`theme-button ${
              currentTheme === Theme.Dark ? "active-theme" : ""
            }`}
            whileTap={{ scale: 0.95 }}
            style={{ margin: "0px 4px" }}
            onClick={() => setTheme(Theme.Dark)}
          >
            <FaMoon size={20} />
          </motion.button>
        </div>

        {isAuthenticated && (
          <li>
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleLogout}>
              Logout
            </motion.button>
          </li>
        )}
      </motion.ul>

      <ul className="menu-large">
        <li>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link to={navigationUrls["the-roka"]}>The Roka</Link>
          </motion.div>
        </li>

        {/* Theme Switcher Icon for Large Screens */}
        <li>
          <div className="theme-switcher-large">
            <FaWandMagicSparkles size={20} />
            <motion.div
              className="theme-menu"
              initial={false}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                backgroundColor: "var(--navbar-background-color)",
                color: "var(--text-color)",
              }}
            >
              <div className="theme-grid">
                <motion.button
                  className={`theme-button ${
                    currentTheme === Theme.Light ? "active-theme" : ""
                  }`}
                  whileTap={{ scale: 0.95 }}
                  style={{ margin: "0px 4px" }}
                  onClick={() => setTheme(Theme.Light)}
                >
                  <FaSun size={15} />
                </motion.button>
                <motion.button
                  className={`theme-button ${
                    currentTheme === Theme.Dark ? "active-theme" : ""
                  }`}
                  whileTap={{ scale: 0.95 }}
                  style={{ margin: "0px 4px" }}
                  onClick={() => setTheme(Theme.Dark)}
                >
                  <FaMoon size={15} />
                </motion.button>
                <motion.button
                  className={`theme-button ${
                    currentTheme === Theme.Christmas ? "active-theme" : ""
                  }`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(Theme.Christmas)}
                >
                  <FaTree size={15} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </li>

        {isAuthenticated && (
          <li>
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleLogout}>
              Logout
            </motion.button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
