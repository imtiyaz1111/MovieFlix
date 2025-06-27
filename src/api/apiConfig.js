const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "2b6f749586163e0385d8f828d827456b",

  // Image helpers
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
