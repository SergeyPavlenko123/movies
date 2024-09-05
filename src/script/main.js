import ApiService from "./api";
import moviesList from "../templates/moviesList";
import movieDetails from "../templates/movie-details";
import openModal from "./modal";

// refs
const moviesWrap = document.querySelector(".movie-list");
const modalWrap = document.querySelector(".backdrop");
const btnUp = document.querySelector(".btnUp");
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
  modalWrap.innerHTML = movieDetails(data);
  openModal();
};
// -------------------------------------------
const scrolllUp = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
// init

const api = new ApiService();

Promise.all([api.getPopular(), api.getGenres()])
  .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
  .then((result) => renderMovies(result));

moviesWrap.addEventListener("click", onMovieClick);
btnUp.onclick = scrolllUp;
