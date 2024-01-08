import '../component/banner.js';
import '../component/search-tools.js';
import '../component/movies.js';

import DataSource from '../data/data-source.js';

const main = async () => {
    const movieListElement = document.querySelector('movie-list');

    if (!movieListElement.movies) {
        try {
            const data = await DataSource.getMoviesFromMultipleSources();
            const renderMovies = (data) => {
                if (
                    data.topMovies &&
                    Array.isArray(data.topMovies) &&
                    data.nowPlayingMovies &&
                    Array.isArray(data.nowPlayingMovies) &&
                    data.upcomingMovies &&
                    Array.isArray(data.upcomingMovies)
                ) {
                    const allMovies = [
                        ...data.topMovies,
                        ...data.nowPlayingMovies,
                        ...data.upcomingMovies,
                    ];

                    movieListElement.movies = allMovies;
                } else {
                    console.error('Error loading movies. Data structure is unexpected:', data);
                }
            };

            renderMovies(data);
        } catch (error) {
            const fallbackResult = (e) => {
                movieListElement.innerHTML = `
                    <style>
                        .placeholder {
                            font-weight: lighter;
                            color: rgba(0, 0, 0, 0.5);
                            -webkit-user-select: none;
                            -moz-user-select: none;
                            -ms-user-select: none;
                            user-select: none;
                        }
                    </style>
                    <h2 class="placeholder">${e}</h2>
                `;
            };

            fallbackResult(error);
        }
    }
};

export default main;
