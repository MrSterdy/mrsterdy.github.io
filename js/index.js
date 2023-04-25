fetchProfile().then(profile => document.getElementById("logo-icon").src = profile.avatar_url);

fetchRepositories().then(repositories => {
    const list = document.createElement("ul");
    list.classList.add("splide__list");
    
    for (const repository of repositories.reverse()) {
        if (repository.archived || repository.disabled)
            continue;

        const li = document.createElement("li");
        li.classList.add("splide__slide");
        
        const header = document.createElement("h3");
        header.innerText = repository.name.toUpperCase();
        
        li.append(header);
        
        if (repository.description) {
            const description = document.createElement("p");
            description.innerText = repository.description;
            
            li.append(description);
        }

        const icons = document.createElement("ul");
        icons.classList.add("icons");

        icons.append(createIcon("img/icons/code-branch.png", repository.html_url));
        
        if (repository.homepage) 
            icons.append(createIcon("img/icons/globe.png", repository.homepage));
        
        li.append(icons);
        
        list.append(li);
    }
    
    document.querySelector("#repositories .splide__track").append(list);
    
    new Splide("#repositories", { rewind: true, arrowPath: "M 7 24 a 1 1 0 0 1 -0.71 -0.29 a 1 1 0 0 1 0 -1.42 l 8.17 -8.17 a 3 3 0 0 0 0 -4.24 L 6.29 1.71 A 1 1 0 0 1 7.71 0.29 l 8.17 8.17 a 5 5 0 0 1 0 7.08 L 7.71 23.71 A 1 1 0 0 1 7 24 Z" }).mount();
});

function fetchProfile() {
    return fetchCore("https://api.github.com/users/MrSterdy");
}

function fetchRepositories() {
    return fetchCore("https://api.github.com/users/MrSterdy/repos");
}

function createIcon(iconSrc, linkHref) {
    const icon = document.createElement("li");
    
    const url = document.createElement("a");
    url.href = linkHref;
    url.target = "_blank";
    
    const img = document.createElement("img");
    img.src = iconSrc;
    
    icon.append(url, img);
    
    return icon;
}

async function fetchCore(url) {
    const response = await fetch(url);
    
    return await response.json();
}