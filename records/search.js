let records = [];

fetch("../records.json")
  .then((response) => response.json())
  .then((recordsobj) => {
    records = recordsobj;
    searchRecords("");
  });

function searchRecords(query) {
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
        <img src="${result.result.cover_image}" style="float: left; width: 100%; margin-top: 15px; margin-right: 10px;">
        <div style="float: left; width: 70%;">
          <h2 style="margin-bottom: 10px;"><a href="moreinfo.html?id=${result.id}" target="_blank" id="title-link">${result.result.title}</a></h2>
          <p style="margin-bottom: 10px;">${result.result.country} (${result.result.year})</p>
          <p style="margin-bottom: 10px;">Genre: ${result.result.genre.join(', ')}</p>
          <p style="margin-bottom: 10px;">Style: ${result.result.style.join(', ')}</p>
          <p style="margin-bottom: 10px;">Format: ${result.result.format.join(', ')}</p>
          <p style="margin-bottom: 10px;">Label: ${result.result.label.join(', ')}</p>
          <p>PRICES:</p>
          <ul>
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
    resultsContainer.appendChild(resultElement);
    const titleLink = document.getElementById("title-link");
    titleLink.addEventListener("click", function() {
      window.open(titleLink.href, "_blank");
    });
  });
}




const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value;
  searchRecords(query);
});