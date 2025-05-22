// src/components/MovieList.js
import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardMedia, Link } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { category } from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import { getAllMovieList } from "../api/Functions/tmdbApiFunction";

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMovieList(props.type, setItems);
  }, [props.category, props.type, props.id]);
  console.log("listItem", items);

  const goToDetail = (id) => {
    navigate(`/${category[props.category]}/${id}`);
  };

  return (
    <Box sx={{ backgroundColor: "#000", p: 2 }}>
      <Swiper spaceBetween={10} slidesPerView="auto" grabCursor={true}>
        {items?.map((item) => (
          <SwiperSlide
            key={item.id}
            style={{ width: "150px", cursor: "pointer" }}
            onClick={() => goToDetail(item.id)}
          >
            <Card sx={{ borderRadius: 2, overflow: "hidden", bgcolor: "#111" }}>
              <CardMedia
                component="img"
                height="220"
                image={apiConfig.w500Image(item.poster_path)}
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

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number, // optional, only needed for 'similar' type
};

export default MovieList;
