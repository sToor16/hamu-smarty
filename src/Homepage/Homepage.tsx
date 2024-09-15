import { Layout } from "antd";
import { motion } from "framer-motion";
import { Img } from "react-image";
import CoverPhoto from "../assets/images/cover_photo.jpg";

const Homepage = () => {
  const overlayTextStyle: React.CSSProperties = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "2rem",
    color: "white",
    zIndex: 10,
  };

  return (
    <Layout className="layout-content" style={{ position: "relative" }}>
      <motion.div
        style={overlayTextStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <h1>Welcome to Our World!</h1>
      </motion.div>

      <Img
        src={CoverPhoto}
        style={{
          width: "100vw",
          height: "93vh",
          objectFit: "cover",
          position: "relative",
          zIndex: 0,
        }}
      />
    </Layout>
  );
};

export default Homepage;
