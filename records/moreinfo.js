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
        <img src="${result.result.cover_image}" style="float: left; width: 100%; margin-top: 15px; margin-right: 10px;">
        <div style="float: left; width: 70%;">
          <h2 style="margin-bottom: 10px;"><a href="moreinfo.html?id=${result.result.id}" target="_blank" id="title-link">${result.result.title}</a></h2>
          <p style="margin-bottom: 10px;">${result.result.country} (${result.result.year})</p>
          <p style="margin-bottom: 10px;">Genre: ${result.result.genre.join(', ')}</p>
          <p style="margin-bottom: 10px;">Style: ${result.result.style.join(', ')}</p>
          <p style="margin-bottom: 10px;">Format: ${result.result.format.join(', ')}</p>
          <p style="margin-bottom: 10px;">Label: ${result.result.label.join(', ')}</p>
          <p>PRICES:</p>
          <ul>
            ${Object.entries(result.price).map(([key, value]) => {
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
