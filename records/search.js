function searchRecords(query) {
    fetch('../records.json')
        .then(response => response.json())
        .then(records => {
            const results = records.filter(record => {
                return (record.name && record.name.toLowerCase().includes(query.toLowerCase())) ||
                    (record.result.title && record.result.title.toLowerCase().includes(query.toLowerCase())) ||
                    (record.result.country && record.result.country.toLowerCase().includes(query.toLowerCase())) ||
                    (record.result.year && record.result.year.toString().includes(query)) ||
                    (record.result.label && record.result.label.some(label => label.toLowerCase().includes(query.toLowerCase()))) ||
                    (record.result.genre && record.result.genre.some(genre => genre.toLowerCase().includes(query.toLowerCase()))) ||
                    (record.result.style && record.result.style.some(style => style.toLowerCase().includes(query.toLowerCase())));
            });
            console.log(results)
            displayResults(results);
        });
}


function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.innerHTML = `
        <h2>${result.result.title}</h2>
        <p>${result.result.country} (${result.result.year})</p>
        <p>Genre: ${result.result.genre.join(', ')}</p>
        <p>Style: ${result.result.style.join(', ')}</p>
        <p>Format: ${result.result.format.join(', ')}</p>
        <p>Label: ${result.result.label.join(', ')}</p>
        <p>PRICES:</p>
        <ul>
        ${Object.entries(result.price).map(([key, value]) => {
            if (value && value.value) {
                return `<li>${key}: ${value.value.toFixed(2)} ${value.currency}</li>`
            } else {
                return `<li>${key}: N/A</li>`
            }
        }).join('')}
          
        </ul>
      `;
        resultsContainer.appendChild(resultElement);
    });
}

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value;
    searchRecords(query);
});
