// ==UserScript==
// @name         Granular Community Filter
// @namespace    https://github.com/aclist
// @version      0.1.0
// @description  Use slash commands for emoticons.
// @author       artillect
// ==/UserScript==

function initGranularFilter (toggle) {
    if (toggle) {
        filterPosts();
    } else {
        showFilteredPosts();
    }
}

function filterPosts () {
    const settings = getModSettings("granular-community-filter");
    const filter = settings.filter;

    // Split filter into dictionary of community names and derank factors, e.g. { "community1": 0.5, "community2": 0.1 }
    const filterDict = filter.split("\n").reduce((dict, item) => {
        const [community, derankFactor] = item.split(" ");
        dict[community] = parseFloat(derankFactor);
        return dict;
    });

    // Get all posts
    const posts = document.querySelectorAll("article.entry");

    // Get community names for each post and randomly hide them based on derank factor
    posts.forEach(post => {
        const community = post.querySelector(".magazine-inline").textContent;
        const derankFactor = filterDict[community];
        if (derankFactor && Math.random() > derankFactor) {
            post.classList.add("filtered");
            post.style.display = "none";
        }
    });
}

function showFilteredPosts () {
    const posts = document.querySelectorAll("article.entry");
    posts.forEach(post => {
        post.classList.remove("filtered");
        post.style.display = "grid";
    });
}