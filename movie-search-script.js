// Replace 'YOUR_API_KEY' with your actual OMDB API key
const API_KEY = '5fc00cce';
const API_URL = 'https://www.omdbapi.com/';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('resultsContainer');
const errorMessage = document.getElementById('errorMessage');

// Event Listeners
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Main search function
async function performSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm === '') {
        showError('Please enter a movie title');
        return;
    }

    try {
        clearResults();
        showError(''); // Clear any existing error
        
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();

        if (data.Response === 'False') {
            showError(data.Error || 'No movies found');
            return;
        }

        displayResults(data.Search);
    } catch (error) {
        showError('An error occurred while searching for movies');
        console.error('Search error:', error);
    }
}

// Display results function
function displayResults(movies) {
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        resultsContainer.appendChild(movieCard);
    });
}

// Create movie card function
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const poster = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder-image.jpg';

    card.innerHTML = `
        <img src="${poster}" alt="${movie.Title}" onerror="this.src='placeholder-image.jpg'">
        <div class="movie-info">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <p>Type: ${movie.Type}</p>
        </div>
    `;

    return card;
}

// Utility functions
function clearResults() {
    resultsContainer.innerHTML = '';
}

function showError(message) {
    errorMessage.textContent = message;
}
