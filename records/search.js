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
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";
  const numResults = results.length;
  const numResultsText = `${numResults} result(s)`;
  resultsContainer.insertAdjacentHTML("beforeend", `<p>${numResultsText}</p>`);
  results.forEach((result) => {
    const resultElement = document.createElement("div");
    resultElement.style.clear = "both";
    resultElement.innerHTML = `
        <img src="${result.result.cover_image}" style="float: left; width: 100%; margin-right: 10px;">
        <div style="float: left; width: 70%;">
          <h2 style="margin-bottom: 10px;">${result.result.title}</h2>
          <p style="margin-bottom: 10px;">${result.result.country} (${result.result.year})</p>
          <p style="margin-bottom: 10px;">Genre: ${result.result.genre.join(", ")}</p>
          <p style="margin-bottom: 10px;">Style: ${result.result.style.join(", ")}</p>
          <p style="margin-bottom: 10px;">Format: ${result.result.format.join(", ")}</p>
          <p style="margin-bottom: 10px;">Label: ${result.result.label.join(", ")}</p>
          <h3>Prices</h3>
          <ul>
            ${Object.entries(result.price)
        .map(
          ([key, value]) =>
            value && value.value
              ? `<li>${key}: ${Number(value.value).toFixed(2)} ${value.currency}</li>`
              : `<li>${key}: N/A</li>`
        )
        .join("")}
          </ul>
        </div>
        ${
          result.songs
            ? `<ul>${result.songs
                .map(
                  (song) =>
                    `<li>${song.position ? `${song.position}: ` : ""}${song.title}</li>`
                )
                .join("")}</ul>`
            : ""
        }
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

searchRecords("");