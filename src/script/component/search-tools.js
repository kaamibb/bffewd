import { fetchDataFromServer, KEY } from './../data/data-source';
import { createMovieCardModal } from './card-modal';

class SearchTools extends HTMLElement {
    connectedCallback() {
        this.render();
        this.addEventListener("input", this.handleSearch.bind(this));
    }

    handleSearch(event) {
        const searchField = event.target;
        let searchResultModal = document.querySelector(".search-modal");

        if (!searchField.value.trim()) {
            if (searchResultModal) {
                searchResultModal.classList.remove("active");
            }

            if (searchResultModal) {
                searchResultModal.innerHTML = "";
            }

            return;
        }

        if (!searchResultModal) {
            searchResultModal = document.createElement("div");
            searchResultModal.classList.add("search-modal");
            document.querySelector("main").appendChild(searchResultModal);
        }

        fetchDataFromServer(
            `https://api.themoviedb.org/3/search/movie?${KEY}&query=${searchField.value}&page=1&include_adult=false`,
            ({ results: movieList }) => {
                searchResultModal.classList.add("active");
                searchResultModal.innerHTML = "";

                searchResultModal.innerHTML = `
                    <p class="label">Results for</p>
                    <h1 class="heading">${searchField.value}</h1>
                    <div class="movie-list">
                        <div class="grid-list"></div>
                    </div>
                `;

                for (const movie of movieList) {
                    const movieCard = createMovieCardModal(movie);
                    searchResultModal
                        .querySelector(".grid-list")
                        .appendChild(movieCard);
                }
            }
        );
    }

    render() {
        this.innerHTML = `
        <div class="container-fluid">
            <div class="col-lg">
                <div class="input-group search-form" id="form">
                    <input placeholder="Search any movie..." class="form-control me-2" id="searchElement" type="search"/>
                </div>
            </div>
        </div>`;

        this.querySelector("#searchElement").addEventListener("input", this.handleSearch.bind(this));
    }
}

customElements.define('search-tools', SearchTools);
