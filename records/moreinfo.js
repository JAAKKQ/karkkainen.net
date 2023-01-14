const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch("../records.json")
    .then((response) => response.json())
    .then((records) => {
        const record = records.find((record) => record.result.id === id);
        // populate the elements with the data
        console.log(id);
        document.getElementById("record-title").innerHTML = record.result.title;
        document.getElementById("record-artist").innerHTML = record.result.artist;
        document.getElementById("record-year").innerHTML = record.result.year;
        document.getElementById("record-genre").innerHTML = record.result.genre;
        document.getElementById("record-format").innerHTML = record.result.format;
        document.getElementById("record-label").innerHTML = record.result.label;
    });

const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
    window.location.href = "index.html";
});
