// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

import BannerSlider from "../components/BannerSlider";
import MovieList from "../components/MovieList";
import { category, movieType, tvType } from "../api/tmdbDataType";

const Home = () => {
  return (
    <>
      <BannerSlider />
      <Box sx={{ px: 2, bgcolor: "black" }}>
        {/* Trending Movies */}
        <Section title="Trending Movies" viewMoreLink="/movie">
          <MovieList category={category.movie} type={movieType.popular} />
        </Section>

        {/* Top Rated Movies */}
        <Section title="Top Rated Movies" viewMoreLink="/movie">
          <MovieList category={category.movie} type={movieType.top_rated} />
        </Section>

        {/* Trending TV */}
        <Section title="Trending TV" viewMoreLink="/tv">
          <MovieList category={category.tv} type={tvType.popular} />
        </Section>

        {/* Top Rated TV */}
        <Section title="Top Rated TV" viewMoreLink="/tv">
          <MovieList category={category.tv} type={tvType.top_rated} />
        </Section>
      </Box>
    </>
  );
};

const Section = ({ title, viewMoreLink, children }) => (
  <Box sx={{ mb: 4 }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="h6" color="white">
        {title}
      </Typography>
      <Button
        component={Link}
        to={viewMoreLink}
        variant="outlined"
        size="small"
        sx={{ color: "white", borderColor: "white", textTransform: "none" }}
      >
        View more
      </Button>
    </Box>
    {children}
  </Box>
);

export default Home;
