const API_URL = 'https://api.themoviedb.org/3/';
const KEY = 'api_key=b4d3ca8eb2315fd4299cde8cd290e2d7';
const imageBaseURL = "https://image.tmdb.org/t/p/";

const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam));
};

export { imageBaseURL, KEY, fetchDataFromServer };

class DataSource {
    static getMoviesFromMultipleSources() {
        const topMoviesRequest = fetch(`${API_URL}/movie/top_rated?${KEY}&language=en-US&page=1`)
            .then((response) => response.json());

        const nowPlayingMoviesRequest = fetch(`${API_URL}/movie/now_playing?${KEY}&language=en-US&page=1`)
            .then((response) => response.json());

        const upcomingMoviesRequest = fetch(`${API_URL}/movie/upcoming?${KEY}&language=en-US&page=1`)
            .then((response) => response.json());

        return Promise.all([topMoviesRequest, nowPlayingMoviesRequest, upcomingMoviesRequest])
            .then(([topMovies, nowPlayingMovies, upcomingMovies]) => {
                return {
                    topMovies: topMovies.results,
                    nowPlayingMovies: nowPlayingMovies.results,
                    upcomingMovies: upcomingMovies.results,
                };
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static searchMovies(keyword) {
        return fetch(`${API_URL}/search/movie?${KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.results) {
                    return Promise.resolve(responseJson.results);
                } else {
                    return Promise.reject(`${keyword} is not found`);
                }
            });
    }

    static genreMovies(id) {
        return fetch(`${API_URL}/discover/movie?${KEY}&with_genres=${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.results) {
                    return Promise.resolve(responseJson.results);
                } else {
                    return Promise.reject(`${id} is not found`);
                }
            });
    }

    static topMovies() {
        return fetch(`${API_URL}/movie/top_rated?${KEY}&language=en-US&page=1`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.results) {
                    return Promise.resolve(responseJson.results);
                } else {
                    return Promise.reject('Movies not found');
                }
            });
    }

    static nowPlayingMovie() {
        return fetch(`${API_URL}/movie/now_playing?${KEY}&language=en-US&page=1`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.results) {
                    return Promise.resolve(responseJson.results);
                } else {
                    return Promise.reject('Movies not found');
                }
            });
    }

    static upcomingMovies() {
        return fetch(`${API_URL}/movie/upcoming?${KEY}&language=en-US&page=1`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.results) {
                    return Promise.resolve(responseJson.results);
                } else {
                    return Promise.reject('Movies not found');
                }
            });
    }
}

export default DataSource;
