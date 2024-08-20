var e=moviesList=e=>{let t="";return e.forEach(e=>{let{title:s,poster_path:a,genresNames:r,release_date:i,vote_average:l,id:n}=e;t+=`<li class="home-list-card">
                    <img class="home-list-img" src="https://image.tmdb.org/t/p/w342${a}" alt="movie picture" data-id=${n}>
                    <p class="home-card-list-title">${s}</p>
                    <div class="card-list">
                        <p class="home-card-category">${r.join(", ")} | ${i}"</p>
                        <p class="home-card-rating">${l}</p>
                    </div>
                 </li>
        `}),t};const t=new class{constructor(){this.baseUrl="https://api.themoviedb.org/3",this.key="3ecd3cf96c721059d15f3a2eb08a11b7",this.lang="uk-UA",this.page=1,this.params=`api_key=${this.key}&language=${this.lang}&page=${this.page}`}getPopular(){return fetch(`${this.baseUrl}/movie/popular?${this.params}`).then(e=>e.json()).then(e=>e)}getGenres(){return fetch(`${this.baseUrl}/genre/movie/list?${this.params}`).then(e=>e.json()).then(e=>e)}},s=document.querySelector(".home-list"),a=(e,t)=>e.map(({genre_ids:e,...s})=>{let a=e.map(e=>t.find(({id:t})=>t===e).name);return{...s,genresNames:a}}),r=t=>{s.innerHTML=e(t)};Promise.all([t.getPopular(),t.getGenres()]).then(([{results:e},{genres:t}])=>a(e,t)).then(e=>r(e));
//# sourceMappingURL=index.25df5919.js.map
