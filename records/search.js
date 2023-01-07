function searchRecords(query) {
  fetch("../records.json")
    .then((response) => response.json())
    .then((records) => {
      const results = records.filter((record) => {
        return (
          (record.name && record.name.toLowerCase().includes(query.toLowerCase())) ||
          (record.result.title && record.result.title.toLowerCase().includes(query.toLowerCase())) ||
          (record.result.country && record.result.country.toLowerCase().includes(query.toLowerCase())) ||
          (record.result.year && record.result.year.toString().includes(query)) ||
          (record.result.label &&
            record.result.label.some((label) => label.toLowerCase().includes(query.toLowerCase()))) ||
          (record.result.genre &&
            record.result.genre.some((genre) => genre.toLowerCase().includes(query.toLowerCase()))) ||
          (record.result.style &&
            record.result.style.some((style) => style.toLowerCase().includes(query.toLowerCase()))) ||
          (record.songs &&
            record.songs.some((song) =>
              song.title.toLowerCase().includes(query.toLowerCase())
            ))
        );
      });
      console.log(results);
      displayResults(results);
    });
}


function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';
  const numResults = results.length;
  const numResultsText = `${numResults} result(s)`;
  resultsContainer.insertAdjacentHTML('beforeend', `<p>${numResultsText}</p>`);
  results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.style.clear = 'both';
    resultElement.innerHTML = `
    <img src="${result.result.cover_image}" class="cover-image">
    <div class="record-details">
      <h2 class="record-title">${result.result.title}</h2>
      <p class="record-info">${result.result.country} (${result.result.year})</p>
      <p class="record-genre">Genre: ${result.result.genre.join(', ')}</p>
      <p class="record-style">Style: ${result.result.style.join(', ')}</p>
      <p class="record-format">Format: ${result.result.format.join(', ')}</p>
      <p class="record-label">Label: ${result.result.label.join(', ')}</p>
      <h4>PRICES:</h4>
      <ul class="price-list">
        ${Object.entries(result.price).map(([key, value]) => {
          if (value && value.value) {
            return `<li>${key}: ${Number(value.value).toFixed(2)} ${value.currency}</li>`
          } else {
            return `<li>${key}: N/A</li>`
          }
        }).join('')}
      </ul>
    </div>
  `;
  
  resultElement.insertAdjacentHTML('beforeend', `
    <ul class="song-list">
      <h4>SONGS:</h4>
      ${result.songs.map(song => `<li>${song.title}</li>`).join('')}
    </ul>
  `);
  

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

searchRecords("");