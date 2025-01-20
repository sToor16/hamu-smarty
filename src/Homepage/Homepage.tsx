import { HamuSmartyPages } from "@sstoor/ts-commons";
import { Layout } from "antd";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
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
        const token = Cookies.get("auth_token");
        if (!token) {
          throw new Error("Token not present");
        }

        const requestOptions = getPageAssetsS3Urls(
          {
            pageName: HamuSmartyPages.HOMEPAGE,
          },
          token,
        );
        const response = await fetch(requestOptions.url, requestOptions.params);
        const { data, errors } = await response.json();

        if (errors) {
          console.error("Error fetching images:", errors);
          return;
        }

        const homepageUrl = data.getHamuSmartyS3AssetsUrls[0];

        if (homepageUrl) {
          setImageUrl(homepageUrl);
        } else {
          console.error("Homepage URL not found in response.");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
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
