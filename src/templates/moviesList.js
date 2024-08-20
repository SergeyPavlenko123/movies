export default moviesList = (arr) => {
  let template = "";

  arr.forEach((element) => {
    let { title, poster_path, genresNames, release_date, vote_average, id } =
      element;
    template += `<li class="home-list-card">
                    <img class="home-list-img" src="https://image.tmdb.org/t/p/w342${poster_path}" alt="movie picture" data-id=${id}>
                    <p class="home-card-list-title">${title}</p>
                    <div class="card-list">
                        <p class="home-card-category">${genresNames.join(
                          ", "
                        )} | ${release_date}"</p>
                        <p class="home-card-rating">${vote_average}</p>
                    </div>
                 </li>
        `;
  });

  return template;
};
