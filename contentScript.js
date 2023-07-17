(() => {
    let youtubeLeftControls, youtubePlayer; //manipulating the youtube video page ( DOM )
    let currentVideo = "";
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    const newVideoLoaded =() => {
        //checking if a bookmark button alrady exists 
        //check if the logo is a specific file, if not then add a bookmark button ( instead of checking notion )
        const bBtnExists = document.getElementsByClassName("bookmark-btn")[0];

        if (!bBtnExists) {
            const bookmarkbtn = document.createElement("img");

            //adding the bookmark styling 
            bookmarkbtn.src = chrome.runtime.getURL("assests/bookmark.png");
            bookmarkbtn.className = "ytp-button" + "bookmark-btn";
            bookmarkbtn.title = "Click to add to notion";

        }
    }
   
})();

