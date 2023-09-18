let records = [];

// Create a new XHR object
var xhr = new XMLHttpRequest();

// Open a new connection to the JSON file
xhr.open('GET', 'https://haveibeenpwned.com/api/v3/breaches', true);

// Set the response type to JSON
xhr.responseType = 'json';

// When the XHR object receives a response, execute this function
xhr.onload = function () {
    // Check if the response status is OK (200)
    if (xhr.status === 200) {
        // Access the JSON data using the response property
        records = xhr.response;
        records.sort((a, b) => {
            const titleA = a.BreachDate;
            const titleB = b.BreachDate;

            if (titleA < titleB) {
                return 1; // Negative value means a comes before b
            }
            if (titleA > titleB) {
                return -1; // Positive value means b comes before a
            }
            return 0; // 0 means a and b are equal in terms of sorting
        });
        // Do something with the JSON data
        console.log(records);
        displayResults(records);
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
    displayResults(results);
}

const resultsContainer = document.getElementById("results-container");

function addResult(record) {
    const resultsContainer = document.getElementById("results-container");

    const recordElement = document.createElement("div");
    recordElement.classList.add("record");

    const recordImage = document.createElement("img");

    recordImage.addEventListener("error", function handleImageError() {
        recordImage.src = "assets/logo.gif";
        setTimeout(function () {
            recordImage.src = record.LogoPath;
        }, 60000);
    });;

    recordImage.src = record.LogoPath;
    recordImage.alt = "Data Breach Logo";

    const recordInfo = document.createElement("div");
    recordInfo.classList.add("record-info");

    const recordTitle = document.createElement("div");
    recordTitle.classList.add("record-title");
    recordTitle.textContent = record.Title;

    const recordArtist = document.createElement("div");
    recordArtist.classList.add("record-artist");
    recordArtist.textContent = record.Domain;

    const recordDate = document.createElement("div");
    recordDate.classList.add("record-date");
    recordDate.textContent = `Breach: ${record.BreachDate}`;

    const recordAdded = document.createElement("div");
    recordAdded.classList.add("record-date");
    recordAdded.textContent = `Modified: ${record.ModifiedDate.split("T")[0]}`;

    const recordMod = document.createElement("div");
    recordMod.classList.add("record-date");
    recordMod.textContent = `Added: ${record.AddedDate.split("T")[0]}`;

    recordInfo.appendChild(recordTitle);
    recordInfo.appendChild(recordArtist);
    recordInfo.appendChild(recordDate);
    recordInfo.appendChild(recordAdded);
    recordInfo.appendChild(recordMod);

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
    results.forEach(record => {
        addResult(record);
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

function searchDate(date) {
    records.sort((a, b) => {
        const titleA = a[date];
        const titleB = b[date];

        if (titleA < titleB) {
            return 1; // Negative value means a comes before b
        }
        if (titleA > titleB) {
            return -1; // Positive value means b comes before a
        }
        return 0; // 0 means a and b are equal in terms of sorting
    });

    displayResults(records);
}
