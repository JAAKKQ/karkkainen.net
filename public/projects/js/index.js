// Copyright (c) 2023 Rene Karkkainen

const username = 'jaakkq'; // Your Github username

function addProject(data) {
    const projectList = document.querySelector('.project-list');

    // Create a new project element
    const newProject = document.createElement('li');
    newProject.className = 'project';

    const img = document.createElement('img');
    img.src = "assets/img/logo.gif";
    img.alt = 'Project Image';
    img.className = 'project-image';
    fetch(`https://api.github.com/repos/${username}/${data.name}/contents/media`)
    .then(response => response.json())
    .then(data => {
        img.src = data[data.length -1].download_url;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    const projectContent = document.createElement('div');
    projectContent.className = 'project-content';

    const h2 = document.createElement('h2');
    h2.textContent = data.name.replaceAll("-", " ");

    const p = document.createElement('p');
    p.textContent = data.description;

    const projectFooter = document.createElement('div');
    projectFooter.className = 'project-footer';

    const ownerAvatars = document.createElement('ul');
    ownerAvatars.className = 'owner-avatars';

    const ownerAvatarLi = document.createElement('li');
    const ownerAvatar = document.createElement('img');
    ownerAvatar.src = data.owner.avatar_url;
    ownerAvatar.alt = 'Owner Avatar';

    ownerAvatarLi.appendChild(ownerAvatar);
    ownerAvatars.appendChild(ownerAvatarLi);

    const tags = document.createElement('ul');
    tags.className = 'tags';

    for (const tag of data.topics.slice(0, 2)) {
        if (tag != "list") {
            const tagLi = document.createElement('li');
            const tagSpan = document.createElement('span');
            tagSpan.textContent = tag;

            tagLi.appendChild(tagSpan);
            tags.appendChild(tagLi);
        }
    }

    projectFooter.appendChild(ownerAvatars);
    projectFooter.appendChild(tags);

    projectContent.appendChild(h2);
    projectContent.appendChild(p);
    projectContent.appendChild(projectFooter);

    newProject.appendChild(img);
    newProject.appendChild(projectContent);

    // Append the new project to the project list
    projectList.appendChild(newProject);

    newProject.addEventListener("click", function () {
        window.location.href = "open.html?project=" + data.name;
    });
}

fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repos => {
        for (const repo of repos) {
            if (repo.topics.includes("list")) {
                addProject(repo);
            };
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });