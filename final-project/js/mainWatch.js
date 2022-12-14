import * as CONST from './modules/const.js';
import util from './modules/utilities.js';

util.includeNavBar(document.getElementById("headerNav"));

const currentVideoID = util.getParam("v");
const currentVideo = CONST.ALL_VIDEOS[currentVideoID];
util.setPageTitle(currentVideo.title);
util.setVideoInfo(currentVideo, document.getElementById("mainVideo"), document.getElementById("videoTitle"), document.getElementById("viewInfo"), document.getElementById("uploadDate"), document.getElementById("videoDesc"));

util.buildVideoResults(document.getElementById("results"), CONST.ALL_VIDEO_IDs, CONST.ALL_VIDEOS);