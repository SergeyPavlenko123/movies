import ApiService from "./api";
import moviesList from "../templates/moviesList";
import movieDetails from "../templates/movie-details";

// refs
const moviesWrap = document.querySelector(".movie-list");
const modalWrap = document.querySelector(".backdrop");
// localstorage

// functions
const addGenres = (movies, genres) => {
  return movies.map(({ genre_ids, ...otherProps }) => {
    let genresNames = genre_ids.map(
      (genreId) => genres.find(({ id }) => id === genreId).name
    );

    return { ...otherProps, genresNames };
  });
};

// ------------------------------------------

const renderMovies = (movies) => {
  moviesWrap.innerHTML = moviesList(movies);
};

// -------------------------------------------

const onMovieClick = (e) => {
  if (!e.target.classList.contains("movie-list-img")) {
    return;
  }
  api.getMovieById(e.target.dataset.id);
  getAndRenderMovieDetails(e.target.dataset.id);
};

// -------------------------------------------

const getAndRenderMovieDetails = async (movieId) => {
  const data = await api.getMovieById(movieId);
  console.log(data);
  modalWrap.innerHTML = movieDetails(data);
  // add storage buttons clicks
  // open modal
  modalWrap.classList.remove("visually-hidden");
};
// init

const api = new ApiService();

Promise.all([api.getPopular(), api.getGenres()])
  .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
  .then((result) => renderMovies(result));

moviesWrap.addEventListener("click", onMovieClick);
