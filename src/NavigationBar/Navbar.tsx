import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaMoon, FaPaintBrush, FaSun } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { navigationUrls } from "../util/contants";
import { Theme, useTheme } from "../util/ThemeProvider";
import "./Navbar.css";

interface NavbarProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setAuth] = useState(
    localStorage.getItem("authenticated") === "true",
  );

  const { currentTheme, setTheme } = useTheme();
  console.log(currentTheme);
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
    localStorage.removeItem("authenticated");
    setAuth(false);
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src={Logo}
          alt="Logo"
          style={{
            marginTop: "5px",
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
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
            <Link to={navigationUrls.specials.hamu26} onClick={toggleMenu}>
              Hamu's 26th
            </Link>
          </motion.div>
        </li>

        <li>
          <div className="theme-options-small">
            <motion.button
              className={`theme-button ${
                currentTheme === Theme.Light ? "active-theme" : ""
              }`}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(Theme.Light)}
            >
              <FaSun size={20} />
            </motion.button>
            <motion.button
              className={`theme-button ${
                currentTheme === Theme.Dark ? "active-theme" : ""
              }`}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(Theme.Dark)}
            >
              <FaMoon size={20} />
            </motion.button>
          </div>
        </li>

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
            <Link to={navigationUrls.specials.hamu26}>Hamu's 26th</Link>
          </motion.div>
        </li>

        {/* Theme Switcher Icon for Large Screens */}
        <li>
          <div className="theme-switcher-large">
            <FaPaintBrush size={20} />
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
                  onClick={() => setTheme(Theme.Light)}
                >
                  <FaSun size={15} />
                </motion.button>
                <motion.button
                  className={`theme-button ${
                    currentTheme === Theme.Dark ? "active-theme" : ""
                  }`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(Theme.Dark)}
                >
                  <FaMoon size={15} />
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
