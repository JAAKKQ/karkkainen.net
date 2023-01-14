fetch("../records.json")
    .then((response) => response.json())
    .then((records) => {
        const id = new URLSearchParams(window.location.search).get("id");
        if (!id) {
            throw new Error("no id found in URL");
        }
        const record = records.find((record) => record.result.id === id);
        // rest of the code here
        document.getElementById("record-title").innerHTML = record.result.title;
        document.getElementById("record-artist").innerHTML = record.result.artist;
        document.getElementById("record-year").innerHTML = record.result.year;
        document.getElementById("record-genre").innerHTML = record.result.genre;
        document.getElementById("record-format").innerHTML = record.result.format;
        document.getElementById("record-label").innerHTML = record.result.label;
    })
    .catch((error) => {
        console.log(error);
    });

const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
    window.location.href = "index.html";
});
