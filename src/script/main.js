import ApiService from "./api";
import moviesList from "../templates/moviesList";
import movieDetails from "../templates/movie-details";
import openModal from "./modal";

// refs
const moviesWrap = document.querySelector(".movie-list");
const modalWrap = document.querySelector(".backdrop");
const btnUp = document.querySelector(".btnUp");
const searchInput = document.querySelector(".search");
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn')
// localstorage
let watchedArray = JSON.parse(localStorage.getItem("WATCHED_KEY")) ?? [];
let queuedArray = JSON.parse(localStorage.getItem("QUEUE_KEY")) ?? [];
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

  document
    .querySelector('[data-action="add-to-watched"]')
    .addEventListener("click", () => {
      const index = watchedArray.indexOf(movieId);
      const currentBtn = document.querySelector(".watched-popap");

      if (index !== -1) {
        watchedArray.splice(index, 1);
        showPopap("removed from watched", currentBtn);
      } else {
        watchedArray.push(movieId);
        showPopap("added to watched", currentBtn);
      }
      localStorage.setItem("WATCHED_KEY", JSON.stringify(watchedArray));
    });

  document
    .querySelector('[data-action="add-to-queue"]')
    .addEventListener("click", () => {
      const index = queuedArray.indexOf(movieId);
      const currentBtn = document.querySelector(".watched-popap");

      if (index !== -1) {
        queuedArray.splice(index, 1);
        showPopap("removed from  queue", currentBtn);
      } else {
        queuedArray.push(movieId);
        showPopap("added to queue", currentBtn);
      }
      localStorage.setItem("QUEUE_KEY", JSON.stringify(queuedArray));
    });
};

// -------------------------------------------
const onSearchInput = (e) => {
  e.preventDefault();
  if (searchInput.value.length > 2) {
    Promise.all([api.getSearchResult(searchInput.value), api.getGenres()])
      .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
      .then((result) => renderMovies(result));
  }
  document.querySelector('.pagination').style.display="none"
};

// -------------------------------------------
  const scrollUp = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
// ------------------------------------------
function showPopap(text, btn) {
  btn.style.display = "block";
  btn.innerHTML = text;
  setTimeout(() => {
    btn.style.display = "none";
  }, 1000);
}
// ------------------------------------------
function pagination() {

  let currentPage = +document.querySelector('.current-page').innerHTML;

  nextBtn.addEventListener('click',()=>{
      Promise.all([api.getPopular(currentPage + 1), api.getGenres()])
      .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
      .then((result) => renderMovies(result));
      currentPage = currentPage + 1;
      document.querySelector('.current-page').innerHTML = currentPage;
      scrollUp();
    });

    prevBtn.addEventListener('click',()=>{
    if(currentPage > 1) {
      Promise.all([api.getPopular(currentPage - 1), api.getGenres()])
      .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
      .then((result) => renderMovies(result));
      currentPage = currentPage - 1;
      document.querySelector('.current-page').innerHTML = currentPage;
    } else {
      prevBtn.setAttribute('disabled','true');
    }
    scrollUp()
    })
    
  }

// ------------------------------------------
// init

const api = new ApiService();

Promise.all([api.getPopular(1), api.getGenres()])
  .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
  .then((result) => renderMovies(result));

moviesWrap.addEventListener("click", onMovieClick);
document.querySelector('.header-form').addEventListener("submit", onSearchInput);
btnUp.onclick = scrollUp;
pagination();

