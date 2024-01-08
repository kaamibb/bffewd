class MovieItem extends HTMLElement {
  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="movie-item card card-content">
        <img src="https://image.tmdb.org/t/p/w500/${this._movie.poster_path}" class="card-img-top card-img" alt="${this._movie.original_title}" loading="lazy">
        <div class="card-body">
          <h5 class="card-title text-truncate">${this._movie.original_title}</h5>
          <div class="row card-text">
            <div class="col-8">
              <span>${this._movie.release_date}</span>
            </div>
            <div class="col-4">
              <span class="ratings">
                <i class="bi bi-star-fill"></i>
                ${this._movie.vote_average}
              </span>
            </div>
          </div>
        </div>
      </div>
      `;
  }
}

customElements.define("movie-item", MovieItem);
