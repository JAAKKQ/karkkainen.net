fetch("../records.json")
    .then((response) => response.json())
    .then((records) => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const record = records.find((record) => record.result.id === parseInt(id));
        console.log(record);

        document.getElementById("record-title").innerHTML = `${result.result.country} (${result.result.year})`;
        document.getElementById("record-year").innerHTML = `Genre: ${result.result.genre.join(', ')}`;
        document.getElementById("record-genre").innerHTML = `Style: ${result.result.style.join(', ')}`;
        document.getElementById("record-format").innerHTML = `Format: ${result.result.format.join(', ')}`;
        document.getElementById("record-label").innerHTML = `Label: ${result.result.label.join(', ')}`;
        let songsHTML = '';
        for (let song of record.songs) {
            const { title, duration } = song;
            songsHTML += `<li> ${title} ${duration} min</li>`;
        }
        document.getElementById("record-songs").innerHTML = songsHTML;

    });



const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
    window.location.href = "index.html";
});
