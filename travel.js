searchButton.addEventListener('click', search);

const clearButton = document.getElementById('reset');

// Function to clear the results
function clearResults() {
  resultsContainer.innerHTML = '';
}

// Add event listener to the clear button
clearButton.addEventListener('click', clearResults);