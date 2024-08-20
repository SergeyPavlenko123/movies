import ApiService from "./api";

const api = new ApiService();

function addGenres(movies, genres) {
  movies.map(({ genre_ids }) => {
    let genresNames = genre_ids.map(
      (genreId) => genres.find(({ id }) => id === genreId).name
    );
    console.log(genresNames);
    console.log("-----------------");
  });
}
function renderMovies(movies) {
  console.log("render items! ", movies);
}
Promise.all([api.getPopular(), api.getGenres()])
  .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
  .then((result) => renderMovies(result));
