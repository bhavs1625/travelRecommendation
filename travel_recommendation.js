fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    // Access the recommendations
    const recommendations = data.recommendations;

    // Display recommendations on the page (adjust the HTML structure as needed)
    const recommendationContainer = document.getElementById('recommendation-container');
    recommendations.forEach(recommendation => {
      const recommendationElement = document.createElement('div');
      recommendationElement.classList.add('recommendation');

      const nameElement = document.createElement('h3');
      nameElement.textContent = recommendation.name;
      recommendationElement.appendChild(nameElement);

      const citiesElement = document.createElement('ul');
      recommendation.cities.forEach(city => {
        const cityElement = document.createElement('li');
        const cityLink = document.createElement('a');
        cityLink.href = '#${city.name.replace(/\s+/g, '-')}'; // Create a unique ID for each city
        cityLink.textContent = city.name;
        cityElement.appendChild(cityLink);
        citiesElement.appendChild(cityElement);
      });
      recommendationElement.appendChild(citiesElement);

      recommendationContainer.appendChild(recommendationElement);
    });

    // Display city details when a city link is clicked
    const cityLinks = document.querySelectorAll('.recommendation a');
    cityLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const cityName = link.textContent;
        const selectedCity = recommendations.find(rec => rec.cities.some(city => city.name === cityName));
        console.log(cityName);
        // Display city details (adjust the HTML structure as needed)
        const cityDetailsContainer = document.getElementById('city-details');
        cityDetailsContainer.innerHTML = `
          <h2>${cityName}</h2>
          <img src="${selectedCity.imageUrl}" alt="${cityName}">
          <p>${selectedCity.description}</p>
        `;
      });
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');

// Array of keywords and their variations
const keywords = [
    { keyword: 'beach', variations: ['beaches', 'BEACH', 'BEACHES'] },
    { keyword: 'temple', variations: ['temples', 'TEMPLE', 'TEMPLES'] },
    { keyword: 'country', variations: ['countries', 'COUNTRY', 'COUNTRIES'] }
];

// Function to handle the search
function search() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    // Find matching keywords
    const matchingKeywords = keywords.filter(keyword => {
        return keyword.variations.includes(searchTerm);
    });

    // Display results
    resultsContainer.innerHTML = '';
    if (matchingKeywords.length > 0) {
        matchingKeywords.forEach(keyword => {
            const resultElement = document.createElement('p');
            resultElement.textContent = 'Search results for: ${keyword.keyword}';
            resultsContainer.appendChild(resultElement);
        });
    } else {
        const noResultsElement = document.createElement('p');
        noResultsElement.textContent = 'No results found.';
        resultsContainer.appendChild(noResultsElement);
    }
}

// Add event listener to the search button
searchButton.addEventListener('click', search);
structure:
// {
//     "beaches": [
//         { "name": "Sydney", "imageUrl": "sydney.jpg", "description": "...", "link": "https://..." },
//         { "name": "Bali", "imageUrl": "bali.jpg", "description": "...", "link": "https://..." }
//     ],
//     // ... similar objects for "temples" and "countries"
// }

// Function to fetch recommendations based on keyword
async function fetchRecommendations(keyword) {
  try {
    const response = await fetch('recommendations.json');
    const data = await response.json();
    const recommendations = data[keyword];

    // Display recommendations
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    recommendations.forEach(recommendation => {
      const recommendationElement = document.createElement('div');
      recommendationElement.classList.add('recommendation');

      const imageElement = document.createElement('img');
      imageElement.src = recommendation.imageUrl;
      imageElement.alt = recommendation.name;
      recommendationElement.appendChild(imageElement);

      const nameElement = document.createElement('h3');
      nameElement.textContent = recommendation.name;
      recommendationElement.appendChild(nameElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = recommendation.description;
      recommendationElement.appendChild(descriptionElement);

      const linkElement = document.createElement('a');
      linkElement.href = recommendation.link;
      linkElement.textContent = 'Visit';
      recommendationElement.appendChild(linkElement);

      resultsContainer.appendChild(recommendationElement);
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    // Handle error, e.g., display an error message to the user
  }
}

// Function to handle the search
function search() {
  const searchTerm = searchInput.value.toLowerCase();
  const keywords = ['beach', 'temple', 'country'];

  if (keywords.includes(searchTerm)) {
    fetchRecommendations(searchTerm);
  } else {
    // Handle invalid search term, e.g., display an error message
    resultsContainer.innerHTML = '<p>Invalid search term. Please try again.</p>';
  }
}

// Add event listener to the search button

