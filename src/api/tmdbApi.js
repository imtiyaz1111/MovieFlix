import axiosIntance from "./axiosIntance";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const tmdbApi = {
  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosIntance.get(url, { params: {} });
  },
};

export default tmdbApi;
