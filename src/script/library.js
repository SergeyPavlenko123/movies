
import ApiService from "./api";
import libraryList from "../templates/library-list";

const moviesWrap = document.querySelector('.movie-list');
const watchedBtn = document.getElementById('watched');
const queueBtn = document.getElementById('queue');


let watchedArray = JSON.parse(localStorage.getItem("WATCHED_KEY"));
let queuedArray = JSON.parse(localStorage.getItem("QUEUE_KEY"));

const showLibrary = async(key) => {
  const moviesArr = [];

  let idsArr = JSON.parse(localStorage.getItem(key)) ?? [];
  for (let i = 0; i <idsArr.length;i++) {
    const result = await api.getMovieById(idsArr[i]);
    moviesArr.push(result)
  }
  moviesWrap.innerHTML = libraryList(moviesArr);
  
}

const api = new ApiService();

document.querySelector('.library-btns').addEventListener('click',(e)=>{
  if(e.target.id === 'watched') {
   showLibrary("WATCHED_KEY") 
   watchedBtn.style.backgroundColor = '#ff6b01';
   queueBtn.style.backgroundColor = '#000000d9';
     }
  else if(e.target.id === 'queue') {
    showLibrary("QUEUE_KEY");
    watchedBtn.style.backgroundColor = '#000000d9';
    queueBtn.style.backgroundColor = '#ff6b01';
      }
})



