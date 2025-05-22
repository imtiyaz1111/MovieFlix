import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Grid,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import { category, movieType, tvType } from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import {
  getAllMovieList,
  getAllTvList,
  getSearch,
} from "../api/Functions/tmdbApiFunction";

// fallback image
const fallbackImage =
  "https://deep-image.ai/blog/content/images/2022/08/magic-g1db898374_1920.jpg";

const MovieGrid = ({ category: cat }) => {
  const [items, setItems] = useState([]);
  const { keyword } = useParams();

  const fetchInitialData = async () => {
    if (!keyword) {
      if (cat === category.movie) {
        await getAllMovieList(movieType.popular, setItems);
      } else {
        await getAllTvList(tvType.popular, setItems);
      }
    } else {
      const params = { query: keyword, page: 1 };
      await getSearch(cat, setItems, null, { params });
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [cat, keyword]);
  console.log("items",items);
  

  return (
    <Box sx={{ bgcolor: "#111", color: "white", minHeight: "100vh", py: 4 }}>
      <Container>
        <Box mb={4} display="flex" justifyContent="center">
          <MovieSearch category={cat} keyword={keyword} />
        </Box>

        <Grid container spacing={3}>
          {items?.map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <MovieCard category={cat} item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const MovieSearch = ({ category, keyword: initialKeyword }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(initialKeyword || "");

  const goToSearch = useCallback(() => {
    if (keyword.trim()) {
      navigate(`/${category}/search/${keyword}`);
    }
  }, [keyword, category, navigate]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        goToSearch();
      }
    };
    document.addEventListener("keyup", handleEnter);
    return () => document.removeEventListener("keyup", handleEnter);
  }, [goToSearch]);

  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: 500 }}>
      <Input
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        fullWidth
        sx={{
          color: "white",
          backgroundColor: "#222",
          px: 2,
          py: 1,
          borderRadius: 1,
        }}
      />
      <Button
        onClick={goToSearch}
        variant="contained"
        sx={{
          position: "absolute",
          top: "50%",
          right: 8,
          transform: "translateY(-50%)",
          bgcolor: "red",
          "&:hover": { bgcolor: "darkred" },
          px: 3,
        }}
      >
        Search
      </Button>
    </Box>
  );
};

const MovieCard = ({ item, category }) => {
  const link = `/${category}/${item.id}`;
  const imagePath = item.poster_path || item.backdrop_path;
  const imageUrl = imagePath ? apiConfig.w500Image(imagePath) : fallbackImage;

  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          height: "100%",
          width: "250px",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#222",
          color: "white",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={item.title || item.name || "No title"}
          height="400"
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ flexGrow: 1, textAlign: "center", py: 2 }}>
          <Typography variant="body1" noWrap>
            {item.title || item.name || "No Title"}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieGrid;
