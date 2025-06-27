// src/components/SimilarList.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";

import { category as categoryMap } from "../../api/tmdbDataType";
import apiConfig from "../../api/apiConfig";
import { getSimilar } from "../../api/Functions/tmdbApiFunction";

const SimilarList = ({ category, id }) => {
  const [similarItems, setSimilarItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        await getSimilar(category, id, setSimilarItems);
      } catch (error) {
        console.error("Failed to load similar items:", error);
      }
    };
    fetchSimilar();
  }, [category, id]);

  const goToDetail = (itemId) => {
    navigate(`/${categoryMap[category]}/${itemId}`);
  };

  if (!similarItems.length) {
    return (
      <Typography sx={{ color: "#fff", p: 2 }}>No similar items found.</Typography>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#000", p: 2 }}>
      <Swiper spaceBetween={10} slidesPerView="auto" grabCursor>
        {similarItems.map((item) => (
          <SwiperSlide
            key={item.id}
            style={{ width: "150px", cursor: "pointer" }}
            onClick={() => goToDetail(item.id)}
          >
            <Card sx={{ borderRadius: 2, overflow: "hidden", bgcolor: "#111" }}>
              <CardMedia
                component="img"
                height="220"
                image={
                  item.poster_path
                    ? apiConfig.w500Image(item.poster_path)
                    : "/fallback.jpg"
                }
                alt={item.title || item.name}
              />
              <Typography
                variant="body2"
                sx={{ color: "#fff", textAlign: "center", mt: 1, px: 1 }}
              >
                {item.title || item.name}
              </Typography>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SimilarList;
