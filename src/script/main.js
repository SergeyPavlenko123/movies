import ApiService from "./api";
import moviesList from "../templates/moviesList";

const api = new ApiService();

const moviesWrap = document.querySelector(".movie-list");

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

Promise.all([api.getPopular(), api.getGenres()])
  .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
  .then((result) => renderMovies(result));
