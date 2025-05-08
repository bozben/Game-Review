const games = [
    {
        title: "Cyberpunk 2077", tags: ["Action ", "RPG", "Open World", "Cyberpunk", "First-person", "Story-driven"],
        image: "https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7", year: 2023,
        studio: "CD ProjektRed", publisher: "CD ProjektRed"
    },
    {
        title: "Mass Effect 2", tags: [" Action"," RPG", " Sci-fi", "Space Opera","Third-person","Story-driven"],
        image: "https://cdn1.epicgames.com/spt-assets/d63910571c9e4ea0aae84da15511bf89/mass-effect-2-digital-deluxe-edition-yviy5.jpg", year: 2010,
        studio: "BioWare", publisher: "Electronic Arts"
    },
    {
        title: "Portal 2", tags: ["Puzzle", "First-person", "Comedy"],
        image: "https://c4.wallpaperflare.com/wallpaper/181/468/46/portal-game-glados-portal-2-wallpaper-preview.jpg", year: 2011,
        studio: "Valve ", publisher: "Valve "
    },
    {
        title: "Yakuza 0", tags: ["Action", "Beat 'em up", "Open World", "Crime", "Drama", "Japanese", "Adventure"],
        image: "https://gamegator.net/_next/image?url=https%3A%2F%2Fimages.gamegator.net%2Fco252x&w=640&q=75", year: 2015,
        studio: "Ryu Ga Gotoku Studio", publisher: "Sega"
    },
    {
        title: "Kotor", tags: [" RPG", "Sci-fi", "Star Wars", "Third-person", "Story-driven"],
        image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/32370/header.jpg?t=1681144833", year: 2003,
        studio: "BioWare", publisher: "LucasArts"
    },
    {
        title: "Red Dead Redemption 2", tags: ["Action","Adventure", "Open World", "Western", "Third-person", "Story-driven"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3TOnOCV0oBQ062rrV2kMu1mXFeYmcrf2jg&s", year: 2018,
        studio: "Rockstar Studios", publisher: "Rockstar Studios"
    },
    {
        title: "Persona 4", tags: ["JRPG", "Turn-based", "Social Simulation", "Mystery", "Anime"],
        image: "https://wallpapers.com/images/featured/persona-4-background-kqzac743v8pbosl2.jpg", year: 2008 ,
        studio: "Atlus", publisher: "Atlus"
    },
    {
        title: "Baldur's Gate 3", tags: ["RPG", "Fantasy", "Turn-based"," Story-driven"],
        image: "https://www.psu.com/wp/wp-content/uploads/2023/08/Baldurs-Gate-3-PS5-Wallpapers-01.jpg", year: 2023,
        studio: "Larian Studios", publisher: "Larian Studios"
    },
    {
        title: "Final Fantasy VII Rebirth", tags: ["JRPG", "Action" ,"RPG", "Fantasy", "Third-person", "Story-driven"],
        image: "https://fyre.cdn.sewest.net/ffvii-hub/6471442498774a5fd66555de/ffviirebirth_mobile_banner_496x516-58664490614280910.jpg?quality=85&width=3840", year: 2024,
        studio: "Square Enix", publisher: "Square Enix"
    },
    {
        title: "Dragon Age: Origins", tags: ["RPG", "Fantasy", "Third-person", "Story-driven"],
        image: "https://wallpapersok.com/images/hd/dragon-age-origins-4gupvsvl6w6t2gts.jpg", year: 2009,
        studio: "BioWare", publisher: "Electronic Arts"
    },
    {
        title: "Vampire: The Masquerade - Bloodlines", tags: ["Action" ,"RPG", "Story-driven", "Supernatural"],
        image: "https://via.placeholder.com/300x180", year: 2004,
        studio: "Troika Games", publisher: "Activision"
    },
    {
        title: "Game 12", tags: [],
        image: "https://via.placeholder.com/300x180", year: 2022,
        studio: "StoryLab", publisher: "ScenePub"
    },
    {
        title: "Game 13", tags: [],
        image: "https://via.placeholder.com/300x180", year: 2020,
        studio: "BulletPoint", publisher: "AimPub"
    },
    {
        title: "Game 14", tags: [],
        image: "https://via.placeholder.com/300x180", year: 2021,
        studio: "CraftIt", publisher: "BuildPub"
    },
    {
        title: "Game 15", tags: [],
        image: "https://via.placeholder.com/300x180", year: 2019,
        studio: "HeartDev", publisher: "DateSoft"
    }
];

const allTags = Array.from(new Set(games.flatMap(g => g.tags))).sort();
let includeTags = [];
let excludeTags = [];
let currentPage = 1;
const pageSize = 10;

function renderTagButtons() {
    const includeArea = document.getElementById("includeButtons");
    const excludeArea = document.getElementById("excludeButtons");

    includeArea.innerHTML = "";
    excludeArea.innerHTML = "";

    const filteredGames = games.filter(g =>
        includeTags.every(tag => g.tags.includes(tag)) &&
        !excludeTags.some(tag => g.tags.includes(tag))
    );

    const tagCount = {};
    allTags.forEach(tag => {
        tagCount[tag] = filteredGames.filter(game => game.tags.includes(tag)).length;
    });

    allTags.forEach(tag => {
        const incBtn = document.createElement("button");
        incBtn.textContent = `${tag} (${tagCount[tag]})`;
        incBtn.className = includeTags.includes(tag) ? "selected include" : "";
        incBtn.onclick = () => toggleIncludeTag(tag);
        includeArea.appendChild(incBtn);

        const excBtn = document.createElement("button");
        excBtn.textContent = `${tag} (${tagCount[tag]})`;
        excBtn.className = excludeTags.includes(tag) ? "selected exclude" : "";
        excBtn.onclick = () => toggleExcludeTag(tag);
        excludeArea.appendChild(excBtn);
    });
}

function toggleIncludeTag(tag) {
    if (includeTags.includes(tag)) {
        includeTags = includeTags.filter(t => t !== tag);
    } else {
        includeTags.push(tag);
        excludeTags = excludeTags.filter(t => t !== tag);
    }
    currentPage = 1;
    renderTagButtons();
    renderCards();
}

function toggleExcludeTag(tag) {
    if (excludeTags.includes(tag)) {
        excludeTags = excludeTags.filter(t => t !== tag);
    } else {
        excludeTags.push(tag);
        includeTags = includeTags.filter(t => t !== tag);
    }
    currentPage = 1;
    renderTagButtons();
    renderCards();
}

function paginate(items, page, size) {
    const start = (page - 1) * size;
    return items.slice(start, start + size);
}

function renderPagination(totalItems) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    const pageCount = Math.ceil(totalItems / pageSize);

    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement("button");
        btn.textContent = i.toString();
        if (i === currentPage) btn.classList.add("active");
        btn.onclick = () => {
            currentPage = i;
            renderCards();
        };
        pagination.appendChild(btn);
    }
}

function renderCards() {
    const container = document.getElementById("cardContainer");
    container.innerHTML = "";

    const filteredGames = games.filter(item => {
        const hasAllIncluded = includeTags.every(tag => item.tags.includes(tag));
        const hasAnyExcluded = excludeTags.some(tag => item.tags.includes(tag));
        return hasAllIncluded && !hasAnyExcluded;
    });

    const paginated = paginate(filteredGames, currentPage, pageSize);

    paginated.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" />
            <div class="separator"></div>
            <div class="card-content">
              <div class="game-title">${item.title}</div>
              <div class="game-meta">Released: ${item.year}</div>
              <div class="game-meta">Studio: ${item.studio}</div>
              <div class="game-meta">Publisher: ${item.publisher}</div>
              
            </div>
            <div class="card-tags">
                ${item.tags.map(tag => `<span class="card-tag">${tag}</span>`).join("")}
              </div>
        `;
        container.appendChild(card);
    });

    renderPagination(filteredGames.length);
}

window.onload = () => {
    renderTagButtons();
    renderCards();

    document.getElementById("searchInclude").addEventListener("input", e => {
        const term = e.target.value.toLowerCase();
        filterButtons("includeButtons", term);
    });

    document.getElementById("searchExclude").addEventListener("input", e => {
        const term = e.target.value.toLowerCase();
        filterButtons("excludeButtons", term);
    });
};

function filterButtons(containerId, term) {
    const container = document.getElementById(containerId);
    Array.from(container.children).forEach(btn => {
        const text = btn.textContent.toLowerCase();
        btn.style.display = text.includes(term) ? "inline-block" : "none";
    });
}
