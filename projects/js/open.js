const username = "jaakkq";

const urlParams = new URLSearchParams(window.location.search);
const project = urlParams.get('project');

fetch(`https://raw.githubusercontent.com/${username}/${project}/main/README.md`)
    .then(response => response.text())
    .then(data => {

        // Get the container element
        const container = document.getElementById('markdown-container');

        // Convert Markdown to HTML and insert it into the container
        container.innerHTML = marked(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
        for (const repo of data) {
            if (repo.name == project) {
                console.log(repo.name)
                var projectLink = document.getElementById('project-link');

                console.log(repo);

                addLinksAndTags(repo);
                projectLink.textContent = 'Projects > ' + repo.name;

                fetch(`https://api.github.com/repos/${username}/${project}/contents/media`)
                    .then(response => response.json())
                    .then(data => {
                        for (const image of data) {
                            addImage(image.download_url)
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });

                const subject = document.getElementById("subject");
                subject.textContent = project.replace("-", " ");

                const description = document.getElementById("description");
                description.textContent = repo.description;
            }
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function changeImage(imagePath) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imagePath;
}

function addImage(url) {
    console.log(url)
    const thumbnails = document.getElementById('thumbnails');
    const image = document.createElement('img');
    image.className = "thumbnail";
    image.src = url; // Replace with the actual image path
    image.alt = 'Thumbnail';
    thumbnails.appendChild(image);
    changeImage(url);

    image.addEventListener("click", function () {
        changeImage(url);
    });
}

function addLinksAndTags(repo) {
    // Add links
    const linksContainer = document.querySelector('.links');
    const linkDiv = document.createElement('div');
    linkDiv.className = "link"
    linkDiv.innerHTML = '<i class="fa fa-github" aria-hidden="true"></i> Source';
    linkDiv.addEventListener("click", function () {
        window.open(repo.html_url, "_blank");
    });
    linksContainer.appendChild(linkDiv);

    // Add tags
    const tagsContainer = document.querySelector('.tags');
    for (const tag of repo.topics) {
        if (tag != "list") {
            const tagsDiv = document.createElement('div');
            tagsDiv.className = "tag"
            tagsDiv.innerHTML = '<i class="fa fa-hashtag" aria-hidden="true"></i> ' + tag;
            tagsDiv.addEventListener("click", function () {
                window.open("https://github.com/topics/" + tag, "_blank");
            });
            tagsContainer.appendChild(tagsDiv);
        }
    }
}