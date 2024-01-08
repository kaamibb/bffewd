import DataSource from '../data/data-source.js';

class Banner extends HTMLElement {
    async connectedCallback() {
        try {
            const topMovies = await DataSource.topMovies();

            this.innerHTML = `
                <div class="banner">
                    <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            ${topMovies.map((movie, index) => `
                                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                    <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" class="d-block w-100" alt="${movie.title}" style="height: 600px; border-radius: 50px; object-fit: cover; loading="lazy">
                                    <div class="carousel-caption">
                                        <h1>${movie.title}</h1>
                                        <p class="lead">${movie.overview}</p>
                                        <a class="btn btn-danger btn-lg">
                                            <i class="bi bi-play-circle"></i> Watch Now
                                        </a>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="carousel-thumbnails-container">
                            ${topMovies.slice(0, 5).map((movie, index) => `
                                <div class="carousel-thumbnail ${index === 0 ? 'active' : ''}">
                                    <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title}" style="border-radius: 10px; width: 100px; height: auto;" loading="lazy">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>`;

            const thumbnails = this.querySelectorAll('.carousel-thumbnail');
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', () => {
                    const carousel = new bootstrap.Carousel(carouselElement, {
                        interval: carouselInterval,
                        wrap: false
                    });
                    carousel.to(index);
                });
            });

            const carouselElement = this.querySelector("#heroCarousel");
            const carouselInterval = 5000;
        } catch (error) {
            console.error('Error rendering hero image:', error);
        }
    }
}

customElements.define('hero-image', Banner);
