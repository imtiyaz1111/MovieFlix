// CastList.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Box, Avatar, Typography, Stack } from "@mui/material";
import apiConfig from "../../api/apiConfig";
import { getCredits } from "../../api/Functions/tmdbApiFunction";

const CastList = ({ id }) => {
  const { category } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    getCredits(category, id,setCasts);
  }, [category, id]);

  return (
    <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
      {casts.map((item, i) => (
        <Box key={i} sx={{ textAlign: "center", width: 80, mb: 2 }}>
          <Avatar
            src={
              item.profile_path
                ? apiConfig.w500Image(item.profile_path)
                : "/no-avatar.png"
            }
            sx={{ width: 80, height: 80, margin: "0 auto" }}
          />
          <Typography
            variant="body2"
            sx={{ mt: 1, color: "white", fontWeight: 500 }}
          >
            {item.name}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default CastList;
