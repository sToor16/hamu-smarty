import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { navigationUrls } from "../util/contants";
import { Theme, useTheme } from "../util/ThemeProvider"; // Import new Theme and useTheme hook
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
  const location = useLocation();

  // Close the menu when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock scroll when menu is open
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

  // Toggle menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Framer Motion variants for menu animation (from right side)
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
      x: "100%", // start off the right side
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  // Framer Motion variants for hamburger icon animation
  const topBarVariants = {
    open: {
      rotate: 45,
      y: 10.5,
      width: 35.36,
      transition: { duration: 0.3 },
    },
    closed: { rotate: 0, y: 0, width: 25, transition: { duration: 0.3 } },
  };

  const middleBarVariants = {
    open: { opacity: 0, transition: { duration: 0.3 } },
    closed: { opacity: 1, transition: { duration: 0.3 } },
  };

  const bottomBarVariants = {
    open: {
      rotate: -45,
      y: -10.5,
      width: 35.36,
      transition: { duration: 0.3 },
    },
    closed: { rotate: 0, y: 0, width: 25, transition: { duration: 0.3 } },
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    setAuth(false);
    setIsAuthenticated(false);
  };

  // Array of available themes
  const themes = Object.values(Theme);
  const nextThemeIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
  const nextTheme = themes[nextThemeIndex];

  return (
    <nav className="navbar">
      {/* Logo */}
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

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <motion.div
          className="bar"
          variants={topBarVariants}
          animate={isOpen ? "open" : "closed"}
        />
        <motion.div
          className="bar"
          variants={middleBarVariants}
          animate={isOpen ? "open" : "closed"}
        />
        <motion.div
          className="bar"
          variants={bottomBarVariants}
          animate={isOpen ? "open" : "closed"}
        />
      </div>

      {/* Sliding Menu for Small Screens */}
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
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(nextTheme)}
          >
            Switch to {nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1)}{" "}
          </motion.button>
        </li>
        {isAuthenticated && (
          <li>
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleLogout}>
              Logout
            </motion.button>
          </li>
        )}
      </motion.ul>

      {/* Menu for Large Screens */}
      <ul className="menu-large">
        <li>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link to={navigationUrls.specials.hamu26}>Hamu's 26th</Link>
          </motion.div>
        </li>
        <li>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(nextTheme)}
          >
            Switch to {nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1)}{" "}
          </motion.button>
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
