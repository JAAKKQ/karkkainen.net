// Copyright (c) 2023 Rene Karkkainen

const username = "jaakkq";

const urlParams = new URLSearchParams(window.location.search);
const project = urlParams.get('project');

fetch(`https://raw.githubusercontent.com/${username}/${project}/main/media/README.md`)
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
                            if (image.download_url == null || image.download_url.substr(image.download_url.lastIndexOf('.') + 1 ) == "md") {

                            } else {
                                addImage(image.download_url, false);
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
                fetch(`https://api.github.com/repos/${username}/${project}/contents/media/3D`)
                    .then(response => response.json())
                    .then(data => {
                        for (const folder of data) {
                            if (folder.download_url == null) {
                                fetch(`https://api.github.com/repos/${username}/${project}/contents/media/3D/` + folder.path.substring(folder.path.lastIndexOf('/') + 1))
                                    .then(response => response.json())
                                    .then(data => {
                                        for (const file of data) {
                                            console.log("File endings: " + file.name.substring(file.name.lastIndexOf('.') + 1));
                                            if (file.name.substring(file.name.lastIndexOf('.') + 1) == "gltf") {
                                                console.log("Found 3D file!")
                                                addImage(file.download_url, true);
                                            }
                                        }
                                    })
                                    .catch(error => {
                                        console.log('No 3D models to load.', error);
                                    });
                            }
                        }
                    })
                    .catch(error => {
                        console.log('Error fetching data:', error);
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
    const viewer = document.getElementById('viewer');
    viewer.innerHTML = `<img class="main-image" src="${imagePath}" alt="Product Image">`
}

function addImage(url, is3D) {
    console.log("Adding url: " + url);
    if (is3D) {
        console.log("Adding 3D preview!");
        const thumbnails = document.getElementById('thumbnails');
        const image = document.createElement('img');
        image.className = "thumbnail";
        image.src = url.replace(url.substring(url.lastIndexOf('/') + 1), "/preview.png");
        image.alt = 'Thumbnail';
        thumbnails.insertBefore(image, thumbnails.firstChild);
        image.addEventListener("click", function () {
            console.log("Change model to: " + url);
            changeModel(url);
        });
    } else {
        const thumbnails = document.getElementById('thumbnails');
        const image = document.createElement('img');
        image.className = "thumbnail";
        image.src = url;
        image.alt = 'Thumbnail';
        thumbnails.insertBefore(image, thumbnails.firstChild);
        changeImage(url);

        image.addEventListener("click", function () {
            console.log("Change image to: " + url);
            changeImage(url);
        });
    }
}

function changeModel(url) {
    // Create a <model-viewer> element
    console.log("Adding model!")
    const viewer = document.getElementById('viewer');
    viewer.innerHTML = `<model-viewer src="${url}" camera-controls touch-action="pan-y"><div slot="progress-bar"><img class="main-image" id="modelLoading" src="assets/img/logo.gif" alt="Loading Image"></div></model-viewer>`
    const modelViewer = document.querySelector('model-viewer');
    modelViewer.addEventListener('load', function(evt) {
        console.log("Model Loaded!");
        const loadingImage = document.getElementById('modelLoading');
        loadingImage.remove();
    })
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