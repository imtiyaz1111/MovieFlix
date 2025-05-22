const TMDB_ENDPOINTS = {
  getMoviesList: (type) => `movie/${type}`,
  getTvList: (type) => `tv/${type}`,
  getVideos: (cate, id) => `${cate}/${id}/videos`,
  search: (cate) => `search/${cate}`,
  detail: (cate, id) => `${cate}/${id}`,
  credits: (cate, id) => `${cate}/${id}/credits`,
  similar: (cate, id) => `${cate}/${id}/similar`,
};

export default TMDB_ENDPOINTS;
