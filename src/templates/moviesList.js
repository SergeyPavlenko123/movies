export default moviesList = (arr) => {
  let template = "";

  arr.forEach((element) => {
    let { title, poster_path, genresNames, release_date, vote_average, id } =
      element;
    template += `<li class="movie-list-card">
                    <img class="movie-list-img" src="https://image.tmdb.org/t/p/w342${poster_path}" alt="movie picture" data-id=${id}>
                    <p class="movie-card-title">${title}</p>
                    <div class="card-list">
                        <p class="movie-card-category">${genresNames.join(
                          ", "
                        )} | ${release_date}"</p>
                        <p class="movie-card-rating">
                        <span>Рейтинг</span>
                          <i class="fa-solid fa-star" style="color: #FFD43B;"></i>  ${vote_average}
                        </p>
                    </div>
                 </li>
        `;
  });

  return template;
};
