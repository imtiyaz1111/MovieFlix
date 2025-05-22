import tmdbApi from "../../api/tmdbApi";

export const getVideos = async (id, category) => {
  try {
    const response = await tmdbApi.getVideos(category, id);
    return response.results || [];
  } catch (error) {
    console.error("Failed to fetch video:", error);
    return [];
  }
};
