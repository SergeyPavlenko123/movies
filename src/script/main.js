import ApiService from "./api";
import moviesList from "../templates/moviesList";
import movieDetails from "../templates/movie-details";
import openModal from "./modal";
import debounce from "lodash.debounce";

// refs
const moviesWrap = document.querySelector(".movie-list");
const modalWrap = document.querySelector(".backdrop");
const btnUp = document.querySelector(".btnUp");
const searchInput = document.querySelector(".search");
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
  movies.length == 0
    ? (moviesWrap.innerHTML = `<h2 class="no-result">Нічого не знайдено</h2>`)
    : (moviesWrap.innerHTML = moviesList(movies));
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
const onSearchInput = (e) => {
  if (searchInput.value.length > 2) {
    Promise.all([api.getSearchResult(searchInput.value), api.getGenres()])
      .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
      .then((result) => renderMovies(result));
  }
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
searchInput.addEventListener("input", debounce(onSearchInput, 1500));
btnUp.onclick = scrolllUp;
