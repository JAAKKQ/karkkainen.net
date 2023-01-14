fetch("../records.json")
    .then((response) => response.json())
    .then((records) => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const record = records.find((record) => record.result.id === parseInt(id));
        document.getElementById("record-title").innerHTML = record.result.title;
        document.getElementById("record-artist").innerHTML = record.result.artist;
        document.getElementById("record-year").innerHTML = record.result.year;
        document.getElementById("record-genre").innerHTML = record.result.genre;
        document.getElementById("record-format").innerHTML = record.result.format;
        document.getElementById("record-label").innerHTML = record.result.label;
        // Display the songs
        const songsContainer = document.getElementById("record-songs");
        record.result.songs.forEach((song) => {
            const songElement = document.createElement('li');
            songElement.innerHTML = song.title;
            songsContainer.appendChild(songElement);
        });
    });


const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
    window.location.href = "index.html";
});
