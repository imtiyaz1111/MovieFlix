import axiosInstance from "../../api/axiosIntance";
import { category } from "../../api/tmdbDataType";

export const getVideos = async (id, cate) => {
  try {
    const response = await axiosInstance.get(
      category[cate] + "/" + id + "/videos",
      { params: {} }
    );
    return response.results || [];
  } catch (error) {
    console.error("Failed to fetch video:", error);
    return [];
  }
};
