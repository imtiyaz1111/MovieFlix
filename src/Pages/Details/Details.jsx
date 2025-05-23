// src/pages/Detail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Chip,
  Container,
  Grid,
  useMediaQuery,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { toast } from "react-toastify";

import apiConfig from "../../api/apiConfig";
import { getDetails } from "../../api/Functions/tmdbApiFunction";
import { getVideos } from "./VideoList";
import { useAuth } from "../../Context/AuthProvider";

import CastList from "./CastList";
import VideoModal from "./VideoModal";
import SimilarList from "./SimilerList";

const Banner = styled(Box)(({ background }) => ({
  minHeight: "70vh",
  position: "relative",
  backgroundImage: `url(${background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  display: "flex",
  alignItems: "center",
  padding: "2rem 1rem",
  color: "white",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1,
  },
  zIndex: 0,
}));

const Poster = styled("img")(() => ({
  width: "100%",
  maxWidth: "250px",
  borderRadius: "20px",
  boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
  zIndex: 2,
}));

const Detail = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [videoKey, setVideoKey] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [auth] = useAuth();

  useEffect(() => {
    getDetails(category, id, { params: {} },setItem);
  }, [category, id]);

  const handleOpenModal = async () => {
    if (!auth.user) {
      toast.error("Please login to watch the video.");
      return;
    }

    const videos = await getVideos(id, category,{ params: {} });
    if (videos.length > 0) {
      setVideoKey(videos[0].key);
      setOpen(true);
    }
  };

  if (!item) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress color="error" />
      </Box>
    );
  }

  return (
    <>
      <Banner
        background={apiConfig.originalImage(item.backdrop_path || item.poster_path)}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Poster
                src={apiConfig.originalImage(item.poster_path || item.backdrop_path)}
                alt={item.title || item.name}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography
                variant={isMobile ? "h5" : "h3"}
                sx={{ color: "white", mb: 2 }}
              >
                {item.title || item.name}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                sx={{ mb: 2 }}
              >
                {item.genres?.slice(0, 5).map((genre, i) => (
                  <Chip
                    key={i}
                    label={genre.name}
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white", mb: 1 }}
                  />
                ))}
              </Stack>

              <Box sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOpenModal}
                >
                  ▶ Play Movie
                </Button>
              </Box>

              <Typography variant="body1" sx={{ color: "white" }}>
                {item.overview}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Banner>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: 600, color: "white" }}
          >
            Casts
          </Typography>
          <CastList id={item.id} />
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: 600, color: "white" }}
          >
            Similar
          </Typography>
          <SimilarList category={category} id={item.id} />
        </Box>
      </Container>

      <VideoModal
        open={open}
        handleClose={() => setOpen(false)}
        videoKey={videoKey}
      />
    </>
  );
};

export default Detail;
