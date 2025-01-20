import { motion } from "framer-motion";
import React from "react";

interface ImageModelProps {
  image: string;
  alt: string;
  imageStyle?: React.CSSProperties;
  handleImageClick: (image: string) => void;
}

const ImageModel: React.FC<ImageModelProps> = ({
  image,
  imageStyle,
  alt,
  handleImageClick,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleImageClick(image)}
      style={{ cursor: "pointer" }}
    >
      <img src={image} alt={alt} style={imageStyle} />
    </motion.div>
  );
};

export default ImageModel;
