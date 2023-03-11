let records = [];
let currentPage = 1;
const recordsPerPage = 10;
let isLoading = false;

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

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentPageResults = results.slice(startIndex, endIndex);

  const totalResults = results.length;
  const numResultsText = `${totalResults} result(s) in total`;
  resultsContainer.insertAdjacentHTML('beforeend', `<p>${numResultsText}</p>`);
  currentPageResults.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.style.clear = 'both';
    resultElement.innerHTML = `
        <img src="${result.result.cover_image}" style="float: left; width: 100%; margin-top: 15px; margin-right: 10px;">
        <div style="float: left; width: 70%;">
          <h2 style="margin-bottom: 10px;"><a href="moreinfo.html?id=${result.result.id}" id="title-link">${result.result.title}</a></h2>
          <p style="margin-bottom: 10px;">${result.result.country} (${result.result.year})</p>
          <p style="margin-bottom: 10px;">Genre: ${result.result.genre.join(', ')}</p>
          <p style="margin-bottom: 10px;">Style: ${result.result.style.join(', ')}</p>
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

const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');

prevPageButton.addEventListener('click', () => {
  if (isLoading || currentPage <= 1) {
    return;
  }
  currentPage--;
  showLoadingScreen();
  isLoading = true;
  setTimeout(() => {
    searchRecords(document.getElementById('search-input').value);
    isLoading = false;
  }, 3000);
});

nextPageButton.addEventListener('click', () => {
  const numPages = Math.ceil(records.length / recordsPerPage);
  if (isLoading || currentPage >= numPages) {
    return;
  }
  currentPage++;
  showLoadingScreen();
  isLoading = true;
  setTimeout(() => {
    searchRecords(document.getElementById('search-input').value);
    isLoading = false;
  }, 3000);
});

function showLoadingScreen() {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '<div class="loading"><div class="loader"></div></div>';
}