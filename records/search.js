let records = [];

fetch("../records.json")
  .then((response) => response.json())
  .then((recordsobj) => {
    records = recordsobj;
    searchRecords("");
  });

function searchObject(obj, query) {
  let matches = false;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'string') {
        matches = value.toLowerCase().includes(query);
      } else if (typeof value === 'number') {
        matches = value.toString().includes(query);
      } else if (Array.isArray(value)) {
        matches = value.some((element) => {
          if (typeof element === 'string') {
            return element.toLowerCase().includes(query);
          } else if (typeof element === 'object') {
            return searchObject(element, query);
          }
          return false;
        });
      } else if (typeof value === 'object') {
        matches = searchObject(value, query);
      }
      if (matches) break;
    }
  }
  return matches;
}

function searchRecords(query) {
  if (typeof query !== 'string') {
    console.error('Search query must be a string');
    return;
  }
  query = query.toLowerCase();
  const results = records.filter((record) => {
    return searchObject(record, query);
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
        <img src="${loadImage(result.result.cover_image)}" style="float: left; width: 100%; margin-top: 15px; margin-right: 10px;">
        <div style="float: left; width: 70%;">
          <h2 style="margin-bottom: 10px;"><a href="moreinfo.html?id=${result.result.id}" id="title-link">${result.result.title}</a></h2>
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
    titleLink.addEventListener("click", function () {
      window.location.href = titleLink.href;
    });
  });
}




const searchForm = document.getElementById('search-form');
searchForm.addEventListener('input', event => {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value;
  searchRecords(query);
});

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value;
  searchRecords(query);
});

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      console.log(`Image loaded: ${url}`);
      resolve(img);
    };
    img.onerror = function() {
      console.error(`Failed to load image: ${url}`);
      reject(new Error(`Failed to load image: ${url}`));
    };
    img.src = url;

    setTimeout(() => resolve(null), 1000);
  });
}
