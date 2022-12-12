import * as CONST from './modules/const.js';
import util from './modules/utilities.js';

const currentVideoID = util.getQuery("v");
const currentVideo = CONST.ALL_VIDEOS[currentVideoID];

util.setPageTitle(currentVideo.title);

const mainVideo = document.getElementById("mainVideo");
mainVideo.setAttribute("src", currentVideo.source);

const htmlTitle = document.getElementById("videoTitle");
htmlTitle.innerText = currentVideo.title;

const viewInfo = document.getElementById("viewInfo");
viewInfo.innerText = `${util.getViewFormat(currentVideo.views)} views`;

const uploadDate = document.getElementById("uploadDate");
uploadDate.innerText = `Published ${currentVideo.uploaded.toLocaleDateString()}`;

const htmlDesc = document.getElementById("videoDesc");
htmlDesc.innerText = currentVideo.desc;

const recommendsHTML = document.getElementById("recommends");
CONST.ALL_VIDEO_IDs.forEach(element => {
    recommendsHTML.appendChild(util.buildVideoSummary(element, CONST.ALL_VIDEOS[element]));
});
