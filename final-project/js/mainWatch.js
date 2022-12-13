import * as CONST from './modules/const.js';
import util from './modules/utilities.js';

const headerNav = document.getElementById("headerNav");

fetch("common/header.html")
.then((result) => { return result.text(); })
.then((content) => { headerNav.innerHTML = content; });

const currentVideoID = util.getQuery("v");
const currentVideo = CONST.ALL_VIDEOS[currentVideoID];

util.setPageTitle(currentVideo.title);
util.setVideoInfo(currentVideo, document.getElementById("mainVideo"), document.getElementById("videoTitle"), document.getElementById("viewInfo"), document.getElementById("uploadDate"), document.getElementById("videoDesc"));

const recommendsHTML = document.getElementById("recommends");
CONST.ALL_VIDEO_IDs.forEach(element => {
    recommendsHTML.appendChild(util.buildVideoSummary(element, CONST.ALL_VIDEOS[element]));
});
