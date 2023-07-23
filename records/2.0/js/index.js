let records = [];

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