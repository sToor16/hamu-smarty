import { Modal } from "antd"; // Assuming you're using Ant Design
import React from "react";

interface EnlargedImageModalProps {
  openModal: boolean;
  closeModal: () => void;
  selectedImage: string;
  modalStyle?: React.CSSProperties;
  enlargedImageStyle?: React.CSSProperties;
}

const EnlargedImageModal: React.FC<EnlargedImageModalProps> = ({
  openModal,
  closeModal,
  selectedImage,
  modalStyle,
  enlargedImageStyle,
}) => {
  return (
    <Modal
      open={openModal}
      footer={null}
      onCancel={closeModal}
      centered
      style={modalStyle}
      styles={{
        content: {
          padding: "0",
          backgroundColor: "transparent",
          borderRadius: "20px",
          boxShadow: "none",
        },
      }}
    >
      <img src={selectedImage} alt="Enlarged" style={enlargedImageStyle} />
    </Modal>
  );
};

export default EnlargedImageModal;
