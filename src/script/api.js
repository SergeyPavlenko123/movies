export default class ApiService {
  constructor() {
    this.baseUrl = "https://api.themoviedb.org/3";
    this.key = "3ecd3cf96c721059d15f3a2eb08a11b7";
    this.lang = "uk-UA";
    this.page = 1;
    this.params = `api_key=${this.key}&language=${this.lang}&page=${this.page}`;
  }

  getPopular() {
    return fetch(`${this.baseUrl}/movie/popular?${this.params}`)
      .then((res) => res.json())
      .then((data) => data);
  }
  getGenres() {
    return fetch(`${this.baseUrl}/genre/movie/list?${this.params}`)
      .then((res) => res.json())
      .then((data) => data);
  }
}
