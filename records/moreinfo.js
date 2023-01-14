fetch("../records.json")
    .then((response) => response.json())
    .then((records) => {
        const id = new URLSearchParams(window.location.search).get("id");
        if (!id) {
            throw new Error("no id found in URL");
        }
        const record = records.find((record) => record.result.id == id);
        const resultElement = document.createElement('div');

        resultElement.innerHTML = `
        <img src="${record.result.cover_image}" style="float: left; width: 100%; margin-top: 15px; margin-right: 10px;">
        <div style="float: left; width: 70%;">
          <h2 style="margin-bottom: 10px;"><a href="moreinfo.html?id=${record.result.id}" target="_blank" id="title-link">${record.result.title}</a></h2>
          <p style="margin-bottom: 10px;">${record.result.country} (${record.result.year})</p>
          <p style="margin-bottom: 10px;">Genre: ${record.result.genre.join(', ')}</p>
          <p style="margin-bottom: 10px;">Style: ${record.result.style.join(', ')}</p>
          <p style="margin-bottom: 10px;">Format: ${record.result.format.join(', ')}</p>
          <p style="margin-bottom: 10px;">Label: ${record.result.label.join(', ')}</p>
          <p>PRICES:</p>
          <ul>
            ${Object.entries(record.price).map(([key, value]) => {
            if (value && value.value) {
                return `<li>${key}: ${Number(value.value).toFixed(2)} ${value.currency}</li>`
            } else {
                return `<li>${key}: N/A</li>`
            }
        }).join('')}
          </ul>
        </div>
      `;
    })
    .catch((error) => {
        console.log(error);
    });

const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
    window.location.href = "index.html";
});
