import axiosIntance from "../axiosIntance";
import TMDB_ENDPOINTS from "../EndPoint/tmdbApiEndpoint";

export const getAllMovieList = async (type, setItems,params) => {
  try {
    const res = await axiosIntance.get(TMDB_ENDPOINTS.getMoviesList(type),{
          params,
        });
    if (res) {
      console.log("res", res);
      setItems(res?.results);
      // setTotalPages(res.total_pages || 1);
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const getAllTvList = async (type, setItems, params) => {
  try {
    const res = await axiosIntance.get(TMDB_ENDPOINTS.getTvList(type),params);
    if (res) {
      console.log("res", res);
      setItems(res.results || []);
      // setTotalPages(res.total_pages || 1);
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const getSearch = async (type, setItems, setTotalPages, params) => {
  try {
    const res = await axiosIntance.get(TMDB_ENDPOINTS.search(type), params);
    if (res) {
      console.log("res", res);
      setItems(res.results || []);
      setTotalPages(res.total_pages || 1);
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const getVideo = async (cat, id, setVideoUrl, setOpenModal) => {
  try {
    const res = await axiosIntance.get(TMDB_ENDPOINTS.getVideos(cat, id),{ params: {} });
    if (res.results.length > 0) {
      const trailerUrl = `https://www.youtube.com/embed/${res.results[0].key}`;
      setVideoUrl(trailerUrl);
      setOpenModal(true);
    } else {
      setVideoUrl("");
      alert("No trailer available.");
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getDetails = async (cat, id,params, setItem) => {
  try {
    const res = await axiosIntance.get(TMDB_ENDPOINTS.detail(cat, id),params);
    if (res) {
      setItem(res);
      window.scrollTo(0, 0);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getCredits = async (cat, id, setCasts) => {
  try {
    const res = await axiosIntance.get(TMDB_ENDPOINTS.credits(cat, id),{ params: {} });
    if (res) {
      setCasts(res.cast?.slice(0, 20) || []);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getSimilar = async (cat, id, setCasts) => {
  try {
    const res = await axiosIntance.get(TMDB_ENDPOINTS.similar(cat, id),{ params: {} });
    if (res) {
      setCasts(res.results);
    }
  } catch (error) {
    console.log("error", error);
  }
};
