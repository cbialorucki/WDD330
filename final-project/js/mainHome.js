import * as CONST from './modules/const.js';
import util from './modules/utilities.js';

const headerNav = document.getElementById("headerNav");

fetch("common/header.html")
.then((result) => { return result.text(); })
.then((content) => { headerNav.innerHTML = content; });