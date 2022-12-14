import * as CONST from './modules/const.js';
import util from './modules/utilities.js';

util.includeNavBar(document.getElementById("headerNav"));
util.buildVideoResults(document.getElementById("results"), CONST.ALL_VIDEO_IDs, CONST.ALL_VIDEOS, util.buildHomeVideoSummary);