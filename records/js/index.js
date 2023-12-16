// Copyright (c) 2023 Rene Karkkainen

let records = [];

// Create a new XHR object
var xhr = new XMLHttpRequest();

// Open a new connection to the JSON file
xhr.open('GET', '../../records.json', true);

// Set the response type to JSON
xhr.responseType = 'json';

// When the XHR object receives a response, execute this function
xhr.onload = function () {
    // Check if the response status is OK (200)
    if (xhr.status === 200) {
        // Access the JSON data using the response property
        records = xhr.response;
        records.sort((a, b) => {
            const titleA = a.result.year;
            const titleB = b.result.year;

            if (titleA < titleB) {
                return -1; // Negative value means a comes before b
            }
            if (titleA > titleB) {
                return 1; // Positive value means b comes before a
            }
            return 0; // 0 means a and b are equal in terms of sorting
        });
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

const resultsContainer = document.getElementById("results-container");
function addRecordToResults(title, artist, imageUrl, recordUri) {
    const resultsContainer = document.getElementById("results-container");

    const recordElement = document.createElement("div");
    recordElement.classList.add("record");

    recordElement.addEventListener("click", function () {
        window.open("https://www.discogs.com" + recordUri, "_blank");
    });

    const recordImage = document.createElement("img");

    recordImage.addEventListener("error", function handleImageError() {
        recordImage.src = "assets/logo.gif";
        setTimeout(function () {
            recordImage.src = imageUrl;
        }, 60000);
    });;

    recordImage.src = imageUrl;
    console.log(recordImage.src);
    recordImage.alt = "Vinyl Record";

    const recordInfo = document.createElement("div");
    recordInfo.classList.add("record-info");

    const recordTitle = document.createElement("div");
    recordTitle.classList.add("record-title");
    recordTitle.textContent = title;

    const recordArtist = document.createElement("div");
    recordArtist.classList.add("record-artist");
    recordArtist.textContent = artist;

    recordInfo.appendChild(recordTitle);
    recordInfo.appendChild(recordArtist);

    recordElement.appendChild(recordImage);
    recordElement.appendChild(recordInfo);

    resultsContainer.appendChild(recordElement);
}

const resultsText = document.getElementById('results-text');
function displayResults(results) {
    resultsContainer.innerHTML = "";
    if (results.length == 1) {
        resultsText.innerText = results.length + " result";
    } else {
        resultsText.innerText = results.length + " results";
    }
    results.forEach(result => {
        addRecordToResults(result.result.title, result.result.genre.join(', '), result.result.cover_image, result.result.uri)
    });
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', event => {
    if (searchInput.value == "~") {
        location.reload();
    } else {
        searchRecords(searchInput.value);
    }
});

function randomRecord() {
    displayResults([records[Math.floor(Math.random() * records.length)]]);
}

function searchByGenre(query) {
    let queredRecords = []
    for (const record of records) {
        for (const genre of record.result.genre) {
            if (genre.toLowerCase() == query.toLowerCase()) {
                queredRecords.push(record);
            }
        }
    }

    displayResults(queredRecords);
}
