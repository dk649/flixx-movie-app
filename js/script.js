const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalRsults: 0,
  },
  api: {
    apikey: "00a7fa5f1683c9a2219bedb30bcc6581",
    apiUrl: "https://api.themoviedb.org/3/",
  },
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    
     
          <a href="movie-details.html?id=${movie.id}">
           ${
             movie.poster_path
               ? ` <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt=${movie.title}
            />`
               : ` <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt=${movie.title}
            />`
           }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        


    `;

    document.querySelector("#popular-movies").appendChild(div);
  });
  displayPagination();
}

// display most popular TV shows

async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");
  // console.log(results);
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    
     
          <a href="tv-details.html?id=${show.id}">
           ${
             show.poster_path
               ? ` <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt=${show.name}
            />`
               : ` <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt=${show.name}
            />`
           }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        


    `;

    document.querySelector("#popular-shows").appendChild(div);
  });
}

// Display Movie Details

async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  // console.log(movieId);

  const movie = await fetchAPIData(`movie/${movieId}`);
  // console.log(movie);

  // overlay for background

  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");

  div.innerHTML = `
  <div class="details-top">
          <div>
           ${
             movie.poster_path
               ? ` <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt=${movie.title}
            />`
               : ` <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt=${movie.title}
            />`
           }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date} </p>
            <p>
             ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href=${
              movie.homepage
            } target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies
            .map((company) => `<li>${company.name}</li>`)
            .join("")}
          </div>
        </div>

  
  `;

  document.querySelector("#movie-details").appendChild(div);
}

// display TV Show Details

async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];
  // console.log(movieId);

  const show = await fetchAPIData(`tv/${showId}`);
  // console.log(show);

  // overlay for background

  displayBackgroundImage("tv", show.backdrop_path);

  const div = document.createElement("div");

  div.innerHTML = `
  <div class="details-top">
          <div>
           ${
             show.poster_path
               ? ` <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt=${show.name}
            />`
               : ` <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt=${show.name}
            />`
           }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">First Air Date: ${show.first_air_date} </p>
            <p>
             ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href=${
              show.homepage
            } target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes:</span> ${
              show.number_of_episodes
            }
              </li>
            <li><span class="text-secondary">Number of Seasons:</span> ${
              show.number_of_seasons
            }
              
            
            </li>
           
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${show.production_companies
            .map((company) => `<li>${company.name}</li>`)
            .join("")}
          </div>
        </div>

  
  `;

  document.querySelector("#show-details").appendChild(div);
}

// Display Backdrop image

function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");

  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

// search movies and shows

async function search() {
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  // console.log(urlParams);

  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");

  if ((global.search.term !== "") & (global.search.term !== null)) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalRsults = total_results;

    if (results.length === 0) {
      showAlert("No Results", (className = "error"));
      return;
    }

    displaySearchResults(results);

    document.querySelector("#search-term").value = "";

    // console.log(results);
  } else {
    showAlert("please enter search term", (className = "error"));
  }
}

function displaySearchResults(results) {
  // clear prev results

  document.querySelector("#search-results").innerHTML = "";
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    
     
          <a href="${global.search.type}-details.html?id=${result.id}">
           ${
             result.poster_path
               ? ` <img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt=${global.search.type === "movie" ? result.title : result.name}
            />`
               : ` <img
              src="images/no-image.jpg"
              class="card-img-top"
               alt=${
                 global.search.type === "movie" ? result.title : result.name
               }
            />`
           }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === "movie" ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                global.search.type === "movie"
                  ? result.release_date
                  : result.first_air_date
              }</small>
            </p>
          </div>
        


    `;

    document.querySelector(
      "#search-results-heading"
    ).innerHTML = `<h2>${results.length} of ${global.search.totalRsults} Results for ${global.search.term}</h2>
    `;

    document.querySelector("#search-results").appendChild(div);
  });

  displayPagination();
}

//  pagination

function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = ` <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
        </div>`;

  document.querySelector("#pagination").appendChild(div);

  // disable prev
  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }

  // disable next on last page

  if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").disabled = true;
  }
  document.querySelector("#next").addEventListener("click", async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });

  document.querySelector("#prev").addEventListener("click", async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
}
// Display Slider for movies

async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");

  results.forEach((movie) => {
    const div = document.createElement("div");

    div.classList.add("swiper-slide");

    div.innerHTML = `
  <a href="movie-details.html?id=${movie.id}">
    <img src='https://image.tmdb.org/t/p/w500${movie.poster_path}' alt=${
      movie.title
    }" />
  </a>
  <h4 class="swiper-rating">
    <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
      1
    )} / 10
  </h4>
`;
    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });

  // console.log(results);
}

async function displayTVSwiper() {
  const { results } = await fetchAPIData("tv/top_rated");

  results.forEach((show) => {
    const div = document.createElement("div");

    div.classList.add("swiper-slide");

    div.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
    
      <img src='https://image.tmdb.org/t/p/w500${show.poster_path}' alt=${
      show.title
    }" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${show.vote_average.toFixed(
        1
      )} / 10
    </h4>
  `;
    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
  // console.log(results);
}

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },

    breakpoints: {
      500: {
        slidesPerView: 2,
      },

      700: {
        slidesPerView: 3,
      },

      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// fetch function

async function fetchAPIData(endpoint) {
  const API_KEY = global.api.apikey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();
  return data;
}

// make request to search

async function searchAPIData() {
  const API_KEY = global.api.apikey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );

  const data = await response.json();

  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}
// console.log(global.currentPage);
// init App

// highlight active link

function highLightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

// show  alert

function showAlert(message, className) {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displaySlider();
      displayPopularMovies();
      break;
    case "/shows.html":
      displayTVSwiper();
      displayPopularShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayShowDetails();
    case "/search.html":
      search();
  }

  highLightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
