import { Col, Row } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import HomepageJpg from "../assets/images/homepage_2.jpg";
import Harmeen26Video from "../assets/videos/5secs.mp4";

const Hamu26th = () => {
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(false);
      setIsVideoPlaying(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const containerStyle: React.CSSProperties = {
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    overflowY: "auto",
  };

  const sectionStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const overlayTextStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "3rem",
    color: "white",
    zIndex: 10,
    opacity: isTextVisible ? 1 : 0,
    transition: "opacity 2s ease-in-out",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
  };

  const videoStyle: React.CSSProperties = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    zIndex: 1,
    filter: isTextVisible ? "blur(10px)" : "none",
    transition: "filter 1s ease-in-out",
  };

  const imageVariants = {
    hidden: { scale: 0.7, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8 } },
    exit: { scale: 0.7, opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div id="scroll-container" style={containerStyle}>
      <section style={sectionStyle}>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div style={overlayTextStyle}>
            <h1>Happy BDay Harmeen</h1>
          </motion.div>

          <ReactPlayer
            url={Harmeen26Video}
            playing={isVideoPlaying}
            loop={true}
            muted={true}
            playsinline={true} // Allow inline playback on mobile
            controls={false} // Disable controls to prevent full-screen trigger
            width="100vw"
            height="100vh"
            style={videoStyle}
            config={{
              file: {
                attributes: {
                  playsInline: true, // Important for mobile Safari
                  style: {
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100vw",
                    height: "100vh",
                  },
                },
              },
            }}
          />
        </div>
      </section>

      <section style={sectionStyle}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.5 }}
              variants={imageVariants}
            >
              <img src={HomepageJpg} alt="Hamu's Cake" style={imageStyle} />
            </motion.div>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.5 }}
              variants={imageVariants}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img src={HomepageJpg} alt="Hamu's Cake" style={imageStyle} />
            </motion.div>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Hamu26th;
