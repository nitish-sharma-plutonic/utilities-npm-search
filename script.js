document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim(); // Trim whitespace

        fetch('https://api.npms.io/v2/search/suggestions?q=' + query)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                displaySearchResults(data);
            })
            .catch(error => {
                displaySearchResults([]); // Display empty list on error
                console.error('There was a problem with the fetch operation:', error);
            });
    });

    function displaySearchResults(results) {
        resultsContainer.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            const noResultsItem = document.createElement('div');
            noResultsItem.textContent = 'No results found';
            resultsContainer.appendChild(noResultsItem);
        } else {
            results.forEach(item => {
                const resultItem = document.createElement('button');
                resultItem.classList.add('list-group-item', 'list-group-item-action');
                resultItem.textContent = `${item?.package.name}\n${item?.package.description}`; // Including description on a new line
                resultsContainer.appendChild(resultItem);
            });
        }

        resultsContainer.style.display = results.length > 0 ? 'block' : 'none'; // Display the results container if there are results, otherwise hide it
    }

    // Hide results when clicking outside the input or the results container
    document.addEventListener('click', function(event) {
        const isClickInsideElement = searchInput.contains(event.target) ||
            resultsContainer.contains(event.target);

        if (!isClickInsideElement) {
            resultsContainer.style.display = 'none';
        }
    });
});
