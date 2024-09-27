function pagination() {

    let currentPage = +document.querySelector('.current-page').innerHTML;
  
    nextBtn.addEventListener('click',()=>{
        Promise.all([api.getPopular(currentPage + 1), api.getGenres()])
        .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
        .then((result) => renderMovies(result));
        currentPage = currentPage + 1;
        document.querySelector('.current-page').innerHTML = currentPage;
      });
  
      prevBtn.addEventListener('click',()=>{
      if(currentPage > 1) {
        Promise.all([api.getPopular(currentPage - 1), api.getGenres()])
        .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
        .then((result) => renderMovies(result));
        currentPage = currentPage - 1;
        document.querySelector('.current-page').innerHTML = currentPage;
      
      } else {
        prevBtn.setAttribute('disabled','true')
      }
      })
  
    }

    export default pagination;