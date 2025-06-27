import React from "react";

import { useParams } from "react-router";

import { category as cate } from "../api/tmdbDataType";
import PageHeader from "../Components/PageHeader";
import MovieGrid from "../Components/MovieGrid";
import { Box } from "@mui/material";

const Catalog = () => {
  const { category } = useParams();

  return (
    <>
      <Box sx={{ bgcolor: "#111" }}>
        <PageHeader>
          {category === cate.movie ? "Movies" : "TV Series"}
        </PageHeader>
        <div className="container">
          <div className="section mb-3">
            <MovieGrid category={category} />
          </div>
        </div>
      </Box>
    </>
  );
};

export default Catalog;
