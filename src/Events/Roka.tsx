import { HamuSmartyPages } from "@sstoor/ts-commons";
import { Col, Row } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getPageAssetsS3Urls } from "../gqlService/getPageAssetsUrls";
import ImageModal from "../UiComponents/EnlargedImageModel";

const Roka = () => {
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [imagesUrls, setImagesUrl] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(false);
      setIsVideoPlaying(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const { videos, images } = await getPageAssetsS3Urls({
          input: { pageName: HamuSmartyPages.THE_ROKA },
        });
        setVideoUrl(videos[0]);
        setImagesUrl(images);
      } catch (error) {
        console.error("Error fetching page assets:", error);
      }
    };

    fetchMediaData();
  }, []);

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const containerStyle: React.CSSProperties = {
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: "var(--background-color)",
    filter: openModal ? "blur(8px)" : "none",
  };

  const mainVideoContainer: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const imagesContainer: React.CSSProperties = {
    margin: "10px",
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
    height: "calc(100vh * 0.5625)",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "10px",
  };

  const videoStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100vh",
    objectFit: "cover",
    zIndex: 1,
    filter: isTextVisible ? "blur(10px)" : "none",
    transition: "filter 1s ease-in-out",
  };

  const quoteStyle: React.CSSProperties = {
    padding: "40px",
    fontSize: "2rem",
    borderRadius: "10px",
    textAlign: "center",
    margin: "20px 0",
  };

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    border: 0,
    padding: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const enlargedImageStyle: React.CSSProperties = {
    maxWidth: "95vw",
    maxHeight: "90vh",
    objectFit: "contain",
    borderRadius: "20px",
  };

  return (
    <div id="scroll-container" style={containerStyle}>
      <section style={mainVideoContainer}>
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div style={overlayTextStyle}>
            <h1>January 4 2025</h1>
          </motion.div>

          <ReactPlayer
            url={videoUrl}
            playing={isVideoPlaying}
            loop={true}
            muted={true}
            playsinline={true}
            controls={false}
            width="100%"
            height="100vh"
            style={videoStyle}
            config={{
              file: {
                attributes: {
                  playsInline: true,
                  style: {
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    height: "100vh",
                  },
                },
              },
            }}
          />
        </div>
      </section>

      <section style={imagesContainer}>
        <ImageModal
          openModal={openModal}
          closeModal={closeModal}
          selectedImage={selectedImage}
          modalStyle={modalStyle}
          enlargedImageStyle={enlargedImageStyle}
        ></ImageModal>

        <Row gutter={[16, 16]}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.9 }}
            variants={{
              hidden: { scale: 0.7, opacity: 0.5 },
              visible: { scale: 1, opacity: 1, transition: { duration: 0.8 } },
              exit: { scale: 0.7, opacity: 0.5, transition: { duration: 0.5 } },
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* <div style={quoteStyle}>
              Cheers to 26 years of laughter, growth, and endless adventures!
              <br />
              <br />
              Happy Birthday!
            </div> */}
          </motion.div>
        </Row>

        <Row gutter={[16, 16]}>
          {imagesUrls.map((image, index) => (
            <Col
              xs={24}
              sm={24}
              md={6}
              lg={6}
              xl={6}
              key={index}
              style={{ padding: "20px" }}
            >
              <motion.div
                initial="hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleImageClick(image)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={image}
                  alt={`Hamu's Cake ${index}`}
                  style={imageStyle}
                />
              </motion.div>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default Roka;
