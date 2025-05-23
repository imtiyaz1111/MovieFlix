const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "de1ccc1f23ed6a33ad86ced238c3e770",

  // Image helpers
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
