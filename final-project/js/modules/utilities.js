/**
 * A class used to handle UI features as part of the Play application.
 * @module utilities
 */
export default class utilities{
    /**
    * Builds a view of a recommended video.
    * 
    * @param {number} taskId The ID associated with the task.
    * @param {string} taskTitle The title of the task.
    * @param {boolean} isComplete True if the task was completed, false if it was not.
    * @param {CallableFunction} completeCallback The callback for when the task is completed.
    * @param {CallableFunction} deleteCallback The callback for when the task is deleted.
    * @return {HTMLLIElement} The list item view for the task.
    */
    static buildVideoSummary(videoId, vidObj){
        const vidLink = document.createElement("a");
        const container = document.createElement("div");
        const image = document.createElement("img");
        const textSection = document.createElement("div");
        const title = document.createElement("p");
        const viewInfo = document.createElement("p");
        const viewInfo2 = document.createElement("p");

        vidLink.setAttribute("href", `watch.html?v=${videoId}`);
        container.setAttribute("class", "videoDisplaySum");
        image.setAttribute("src", vidObj.thumbnail);
        title.innerText = vidObj.title;
        viewInfo.innerText = `${this.getViewFormat(vidObj.views)} views`;
        viewInfo2.innerText = `${vidObj.uploaded.toLocaleDateString()}`;
        textSection.setAttribute("class", "textVideoRec");
        title.setAttribute("class", "videoRecTitle");

        container.appendChild(image);
        textSection.appendChild(title);
        textSection.appendChild(viewInfo);
        textSection.appendChild(viewInfo2);
        container.appendChild(textSection);
        vidLink.appendChild(container);

        return vidLink;
    }

    /**
    * Gets a parameter value from the current URL.
    * NOTE: This function only works if there is only one parameter in the current URL.
    * 
    * @param {string} param The parameter to get the value for.
    * @return {string} The value of the parameter.
    */
    static getQuery(param){
        return window.location.href.substring(window.location.href.indexOf(`?${param}=`) + 2 + param.length).replace(/\+/g,  " ");
    }
    
    /**
    * Builds a string representing the number of views on a video.
    * 
    * @param {number} number The number of views.
    * @return {string} A string representing the number of views.
    */
    static getViewFormat(number){
        if(number >= 1000000000)
            return Math.round(number/1000000000) + "B"
        else if(number >= 1000000)
            return Math.round(number/1000000) + "M"
        else
            return number;
    }

    /**
    * Sets the page title.
    * 
    * @param {string} title The title to append to the front of the page title.
    */
     static setPageTitle(title){
        document.title = `${title} - Play`;
    }

    /**
    * Populates a video watch page with the correct information.
    * 
    * @param {Array} currentVideo The current video object for the page.
    * @param {HTMLElement} videoHTML The HTML video element.
    * @param {HTMLElement} videoTitleHTML The HTML video title element.
    * @param {HTMLElement} viewInfoHTML The HTML span element for describing the number of views on the video.
    * @param {HTMLElement} uploadDateHTML The HTML span element describing when the video was uploaded.
    * @param {HTMLElement} descHTML The HTML p element for the video description.
    */
     static setVideoInfo(currentVideo, videoHTML, videoTitleHTML, viewInfoHTML, uploadDateHTML, descHTML){
        videoHTML.setAttribute("src", currentVideo.source);
        videoTitleHTML.innerText = currentVideo.title;
        viewInfoHTML.innerText = `${this.getViewFormat(currentVideo.views)} views`;
        uploadDateHTML.innerText = `Published ${currentVideo.uploaded.toLocaleDateString()}`;
        descHTML.innerText = currentVideo.desc;
    }
}