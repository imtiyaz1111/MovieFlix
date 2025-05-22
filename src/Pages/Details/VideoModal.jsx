import React from "react";
import { Modal, Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 800,
  bgcolor: "black",
  boxShadow: 24,
  outline: "none",
};

const VideoModal = ({ open, handleClose, videoKey }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <iframe
          width="100%"
          height="450"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title="YouTube trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </Box>
    </Modal>
  );
};

export default VideoModal;
