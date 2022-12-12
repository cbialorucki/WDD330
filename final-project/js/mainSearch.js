import * as CONST from './modules/const.js';
import util from './modules/utilities.js';

const query = util.getQuery("q");
util.setPageTitle(query);

const navSearchBar = document.getElementById("searchNav");
navSearchBar.value = query;

const resultsHTML = document.getElementById("results");
CONST.ALL_VIDEO_IDs.forEach(element => {
    resultsHTML.appendChild(util.buildVideoSummary(element, CONST.ALL_VIDEOS[element]));
});