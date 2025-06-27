import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { category, movieType } from "../api/tmdbDataType";
import apiConfig from "../api/apiConfig";
import { useAuth } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import { getAllMovieList, getVideo } from "../api/Functions/tmdbApiFunction";

const BannerSlider = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const iframeRef = useRef(null);
  const [auth] = useAuth();

  useEffect(() => {
    const params = { page: 1 };
    getAllMovieList(movieType.popular, setMovieItems,params);
  }, []);

  const handleWatchNow = async (movieId) => {
    if (!auth.user) {
      toast.error("Please login to watch the trailer.");
      return;
    }

    try {
      await getVideo(category.movie, movieId, setVideoUrl, setOpenModal);
    } catch {
      console.log("Failed to fetch trailer.");
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setVideoUrl("");
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
      >
        {movieItems.slice(0, 4).map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                minHeight: { xs: "100vh", md: "80vh" },
                backgroundImage: `url(${apiConfig.originalImage(
                  slide.backdrop_path
                )})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  zIndex: 1,
                }}
              />
              <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#fff",
                    gap: 4,
                    py: 6,
                  }}
                >
                  <Box flex={1}>
                    <Typography
                      variant="h3"
                      component="h1"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "2rem", md: "3rem" },
                        mb: 2,
                      }}
                    >
                      {slide.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{ mb: 2, color: "rgba(255,255,255,0.85)" }}
                    >
                      {slide.overview}
                    </Typography>

                    <Button
                      variant="contained"
                      color="error"
                      size="large"
                      onClick={() => handleWatchNow(slide.id)}
                    >
                      Watch now
                    </Button>
                  </Box>

                  <Box
                    flex={1}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Box
                      component="img"
                      src={apiConfig.originalImage(
                        slide.poster_path || slide.backdrop_path
                      )}
                      alt={slide.title}
                      sx={{
                        width: "100%",
                        maxWidth: 320,
                        height: { xs: 420, md: 500 },
                        borderRadius: 4,
                        objectFit: "cover",
                        boxShadow: 4,
                      }}
                    />
                  </Box>
                </Box>
              </Container>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal for Trailer */}
      <Modal
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: 800,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
              borderRadius: 2,
              outline: "none",
            }}
          >
            {videoUrl ? (
              <iframe
                ref={iframeRef}
                width="100%"
                height="450px"
                src={videoUrl}
                title="Trailer"
                allowFullScreen
              />
            ) : (
              <Typography variant="h6">No trailer available.</Typography>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default BannerSlider;
