export default movieDetails = (obj) => {
  let {
    poster_path,
    title,
    vote_average,
    release_date,
    id,
    overview,
    tagline,
    genres,
  } = obj;

  return `<li class="modal-card">
            <div class="modal-poster">
                <img src="https://image.tmdb.org/t/p/w342${poster_path}" alt="movie picture" data-id=${id}>
            </div>
            <div class="modal-description">
              <p class="modal-card-title">${title}</p>
              <p class="modal-card-genres">${genres.map((el) => el.name)}</p>
              <div class="modal-card-category"><span class="movie-card-rating">${vote_average}</span> | <span>${release_date}</span></div>
              <p>${overview}</p>
              <div class="modal-description-buttons">
                <button class="modal-button">Watched</button>
                <button class="modal-button">Queue</button>
              </div>
            </div>
          </li>
`;
};
