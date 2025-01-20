import { HamuSmartyPages } from "@sstoor/ts-commons";
import { Layout } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPageAssetsS3Urls } from "../gqlService/getPageAssetsS3Urls";

const Homepage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const overlayTextStyle: React.CSSProperties = {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "2rem",
    color: "white",
    zIndex: 10,
  };

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const { images } = await getPageAssetsS3Urls({
          input: {
            pageName: HamuSmartyPages.HOMEPAGE,
          },
        });

        if (images[0]) {
          setImageUrl(images[0]);
        } else {
          console.error("Homepage URL not found in response.");
        }
      } catch (error) {
        console.error("Error fetching s3 assets urls:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImageUrl();
  }, []);

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

      {isLoading ? (
        <div
          style={{
            width: "100vw",
            height: "93vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            color: "white",
          }}
        >
          Loading...
        </div>
      ) : (
        <img
          src={imageUrl}
          alt="Homepage"
          style={{
            width: "100vw",
            height: "93vh",
            objectFit: "cover",
            position: "relative",
            zIndex: 0,
          }}
        />
      )}
    </Layout>
  );
};

export default Homepage;
