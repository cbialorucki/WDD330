import * as CONST from './modules/const.js';
import util from './modules/utilities.js';

const query = util.getParam("q");
util.setPageTitle(query);

util.includeNavBar(document.getElementById("headerNav"), query);
util.buildVideoResults(document.getElementById("results"), CONST.ALL_VIDEO_IDs, CONST.ALL_VIDEOS);