(() => {
    let youtubeLeftControls, youtubePlayer; //manipulating the youtube video page ( DOM )
    let currentVideo = "";
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.type === 'CONFIG') {
          var databaseId = message.data.databaseId;
          var apiToken = message.data.apiToken;
        }
      });
    
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    const newVideoLoaded = async () => {
        //checking if a bookmark button alrady exists 
        //check if the logo is a specific file, if not then add a bookmark button ( instead of checking notion )
        const bBtnExists = document.getElementsByClassName("bookmark-btn")[0];

        if (!bBtnExists) {
            const bookmarkbtn = document.createElement("img");

            //adding the bookmark styling 
            bookmarkbtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkbtn.className = "ytp-button" + " bookmark-btn";
            bookmarkbtn.title = "Click to add to notion";

            bookmarkbtn.style.width = "35px";
            bookmarkbtn.style.height = "35px";
            bookmarkbtn.style.display = "block";
            bookmarkbtn.style.position = "relative";
            bookmarkbtn.style.top = "50%";
            bookmarkbtn.style.transform = "translateY(-50%)";
            bookmarkbtn.style.marginRight = "10px";
            
            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName('video-stream')[0];

            youtubeLeftControls.appendChild(bookmarkbtn);
            bookmarkbtn.addEventListener("click", addToNotion);
            //bookmarkbtn.addEventListener("click", bookmarkclicked); ( to update the icon)

        }
    };
    // const bookmarkclicked = () => {

    // } ( to update the icon )
    const addToNotion = () => {
        const videoUrl = window.location.href;

    };

    newVideoLoaded();
})();

