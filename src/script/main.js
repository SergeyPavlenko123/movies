import ApiService from "./api";
import moviesList from "../templates/moviesList";

// refs
const moviesWrap = document.querySelector(".movie-list");
// functions
const addGenres = (movies, genres) => {
  return movies.map(({ genre_ids, ...otherProps }) => {
    let genresNames = genre_ids.map(
      (genreId) => genres.find(({ id }) => id === genreId).name
    );

    return { ...otherProps, genresNames };
  });
};
const renderMovies = (movies) => {
  moviesWrap.innerHTML = moviesList(movies);
};

const onMovieClick = (e) => {
  if (!e.target.classList.contains("movie-list-img")) {
    return;
  }
  console.log(e.target.dataset.id);
};

// init

const api = new ApiService();

Promise.all([api.getPopular(), api.getGenres()])
  .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
  .then((result) => renderMovies(result));

moviesWrap.addEventListener("click", onMovieClick);
