import "./movies-item.js";
import DataSource from "../data/data-source.js";

class Movies extends HTMLElement {
    async connectedCallback() {
        if (!this.hasChildNodes() && !this._movies) {
            try {
                const dataList = this.getAttribute("data-list");

                let movies;
                if (dataList === "nowPlaying") {
                    movies = await DataSource.nowPlayingMovie();
                } else if (dataList === "upcoming") {
                    movies = await DataSource.upcomingMovies();
                } else if (dataList === "topRated") {
                    movies = await DataSource.topMovies();
                }

                this.movies = movies;
            } catch (error) {
                console.error(error);
            }
        }
    }

    set movies(movies) {
        this._movies = movies;
        this.render();
    }

    render() {
        if (!this._movies) {
            return;
        }

        const movieListContainer = document.createElement("div");
        movieListContainer.className = "movie-list-container";
        this.appendChild(movieListContainer);

        this._movies.forEach((movie) => {
            const movieItemElement = document.createElement("movie-item");
            movieItemElement.movie = movie;
            movieListContainer.appendChild(movieItemElement);
        });
    }
}

customElements.define("movie-list", Movies);
