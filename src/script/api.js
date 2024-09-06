export default class ApiService {
  constructor() {
    this.baseUrl = "https://api.themoviedb.org/3";
    this.key = "3ecd3cf96c721059d15f3a2eb08a11b7";
    this.lang = "uk-UA";
    this.page = 1;
    this.params = `api_key=${this.key}&language=${this.lang}`;
    this.searchString = "";
  }

  async getPopular() {
    const res = await fetch(
      `${this.baseUrl}/movie/popular?${this.params}&&page=${this.page}`
    );
    const data = await res.json();
    return data;
  }
  async getGenres() {
    const res = await fetch(`${this.baseUrl}/genre/movie/list?${this.params}`);
    const data = await res.json();
    return data;
  }
  async getMovieById(movieId) {
    const res = await fetch(`${this.baseUrl}/movie/${movieId}?${this.params}`);
    const data = await res.json();
    return data;
  }

  async getSearchResult(searchString) {
    this.searchString = encodeURIComponent(searchString);

    const res = await fetch(
      `${this.baseUrl}/search/movie?query=${this.searchString}&${this.params}${this.page}`
    );
    const data = await res.json();
    return data;
  }
}
