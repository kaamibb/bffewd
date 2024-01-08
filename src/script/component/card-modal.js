export function createMovieCardModal(movie) {
  const { poster_path, original_title, vote_average, release_date } = movie;

  const card = document.createElement("div");
  card.classList.add("movie-item", "card", "card-content");

  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="card-img-top card-img" alt="${original_title}" loading="lazy">
    <div class="card-body">
      <h5 class="card-title text-truncate">${original_title}</h5>
      <div class="row card-text">
        <div class="col-8">
          <span>${release_date}</span>
        </div>
        <div class="col-4">
          <span class="ratings">
            <i class="bi bi-star-fill"></i>
            ${vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  `;

  return card;
}
