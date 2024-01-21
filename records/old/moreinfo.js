// Copyright (c) 2023 Rene Karkkainen

const urlParams = new URLSearchParams(window.location.search);

fetch("../../records.json")
    .then((response) => response.json())
    .then((records) => {
        const id = urlParams.get('id');

        const record = records.find((record) => record.result.id === parseInt(id));
        console.log(record);
        document.title = `${record.result.title} (${record.result.year})`;
        document.getElementById("record-cover").innerHTML = `<img src="${record.result.cover_image}"></img>`;
        document.getElementById("record-title").innerHTML = `${record.result.title} (${record.result.year})`;
        document.getElementById("record-year").innerHTML = `Genre: ${record.result.genre.join(', ')}`;
        document.getElementById("record-genre").innerHTML = `Style: ${record.result.style.join(', ')}`;
        document.getElementById("record-format").innerHTML = `Format: ${record.result.format.join(', ')}`;
        document.getElementById("record-label").innerHTML = `Label: ${record.result.label.join(', ')}`;
        let songsHTML = '';
        for (let song of record.songs) {
            const { title, position, artists } = song;
            let artistsHTML = '';
            try {
                for (let artist of artists) {
                    const { name } = artist;
                    artistsHTML += `${name}`;
                }
                songsHTML += `<li>${position}: ${title} - ${artistsHTML}</li>`;
            } catch (e) {
                songsHTML += `<li>${position}: ${title}</li>`;
            }
        }
        document.getElementById("record-songs").innerHTML = songsHTML;
        var link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = record.result.cover_image;

        document.getElementById("record-prices").innerHTML = Object.entries(record.price).map(([key, value]) => {
            if (value && value.value) {
                return `<li>${key} ${Number(value.value).toFixed(2)} ${value.currency}</li>`
            } else {
                return `<li>${key} N/A</li>`
            }
        }).join('');

    });



const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
    window.history.back();
});
