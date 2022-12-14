/**
 * The array of all videos on the website. If this were a fully-functional website, I would build out an API against a SQL server that points to all the videos.
 * @type {Array}
 */
 export const ALL_VIDEOS = {
    "DLqx3YOpj_c": {
        title: "A Subway Moving Past",
        desc: "A personal video of the London Underground.",
        thumbnail: "images/DLqx3YOpj_c-tn.jpg",
        uploaded:  new Date(1432425700000),
        views: 330,
        source: "video/subway.mp4"
    },
    "vIeBg-ZY8IQ": {
        title: "Ferris Wheel at Night",
        desc: "I took this video when going to the Lorem Ipsum carnival. Enjoy! :)",
        thumbnail: "images/vIeBg-ZY8IQ-tn.jpg",
        uploaded: new Date(1171694489000),
        views: 500,
        source: "video/ferris-wheel.mp4"
    },
    "QvYTfFlDeSU": {
        title: "SMPTE Color Bars",
        desc: "SMPTE color bars are a television test pattern used where the NTSC video standard is utilized, including countries in North America. The Society of Motion Picture and Television Engineers (SMPTE) refers to the pattern as Engineering Guideline (EG) 1-1990. Its components are a known standard, and created by test pattern generators.",
        thumbnail: "images/QvYTfFlDeSU-tn.jpg",
        uploaded: new Date(252486000000),
        views: 100000000,
        source: "video/test.ogg"
    },
    "ehukpdse8_w": {
        title: "WDD 330 Portfolio Overview",
        desc: "Thanks for taking a look at my portfolio! I hope it contains all the information and work you need to assign my grade. If there is any issues, please let me know. The grade I recieve in this class is very important to me.\n\n-CJ Bialorucki",
        thumbnail: "images/ehukpdse8_w-tn.png",
        uploaded: new Date(1671056889000),
        views: 2,
        source: "video/ehukpdse8_w.mp4"
    }
};

 /**
  * The array of all the video IDs. This is used to generate recomendations and search results. If this were a fully-functional website, I would build an API for searching videos and retrieving recomendations.
  * @type {Array}
  */
 export const ALL_VIDEO_IDs = ["DLqx3YOpj_c", "vIeBg-ZY8IQ", "QvYTfFlDeSU", "ehukpdse8_w"];