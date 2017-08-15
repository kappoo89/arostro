var getMovies = function(page) {
  return fetch('https://api.themoviedb.org/3/discover/movie?api_key=64ddc370525a71b29f579200eba5b23a&language=it-IT&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + page);
};

var getMovie = function(id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=64ddc370525a71b29f579200eba5b23a&language=it-IT');
};

export const moviesDataService = {
  getMovies: getMovies,
  getMovie: getMovie
};
