import * as CONST from './modules/const.js';
import util from './modules/utilities.js';

const query = util.getQuery("q");
util.setPageTitle(query);

const headerNav = document.getElementById("headerNav");

fetch("common/header.html")
.then((result) => { return result.text(); })
.then((content) => { 
    headerNav.innerHTML = content; 
    const searchBox = headerNav.querySelector('#searchNav');
    searchBox.value = query;
});

const resultsHTML = document.getElementById("results");
CONST.ALL_VIDEO_IDs.forEach(element => {
    resultsHTML.appendChild(util.buildVideoSummary(element, CONST.ALL_VIDEOS[element]));
});