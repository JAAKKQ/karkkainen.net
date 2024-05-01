// Copyright (c) 2023 Rene Karkkainen

let records = [];
var items = document.getElementsByClassName("loaded?");
items[0].style.display = "none";

// Create a new XHR object
var xhr = new XMLHttpRequest();

// Open a new connection to the JSON file
xhr.open('GET', '../../records.json', true);

// Set the response type to JSON
xhr.responseType = 'json';

// When the XHR object receives a response, execute this function
xhr.onload = function() {
  // Check if the response status is OK (200)
  if (xhr.status === 200) {
    // Access the JSON data using the response property
    records = xhr.response;
    // Do something with the JSON data
    searchRecords("");
  }
};

// Send the request to the server
xhr.send();


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
      <img orgsrc="${result.result.cover_image}" src="${result.result.cover_image}" style="float: left; width: 100%; margin-top: 15px; margin-right: 10px;" onerror="handleImageError(this)">
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

let counter = 0

function handleImageError(img) {
  counter++
  img.src = "logo.gif";
  setTimeout(function() {
    img.src = img.getAttribute("orgsrc");
  }, 5000 * counter);
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