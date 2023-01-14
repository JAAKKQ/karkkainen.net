const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch("../records.json")
    .then((response) => response.json())
    .then((records) => {
        const record = records.find((record) => record.id === id);
        // populate the elements with the data
        document.getElementById("record-title").innerHTML = record.title;
        document.getElementById("record-artist").innerHTML = record.artist;
        document.getElementById("record-year").innerHTML = record.year;
        document.getElementById("record-genre").innerHTML = record.genre;
        document.getElementById("record-format").innerHTML = record.format;
        document.getElementById("record-label").innerHTML = record.label;
    });

const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
    window.location.href = "index.html";
});
