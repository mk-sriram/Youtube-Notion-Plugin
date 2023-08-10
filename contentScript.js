(() => {
    let youtubeLeftControls, youtubePlayer; //manipulating the youtube video page ( DOM )
    let currentVideo = "";
    let currentVideoBookmarks = [];
    var databaseId = null; 
    var apiToken = null; 
    const { Client } = require('@notionhq/client');

    // chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    //     if (message.type === 'INFOMSG') {
    //       var databaseId = message.data.databaseId;
    //       var apiToken = message.data.apiToken;
    //     }
    //   });
    
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

    
   
    const addToNotion = async() => { //creates a function using arrow function syntax
        const videoUrl = youtubePlayer.getURL(); // this retrieves the current URL of the Youtube Video
        const videoTitle = youtubePlayer.getVideodData().title;

        // Replace with your own Notion API credentials and database information
        const notionApiUrl = "https://api.notion.com/v1/pages";
        // const notionDatabaseId = databaseId;
        // const notionApiToken = apiToken;
        const notionDatabaseId = "643d5887a64d4d78bf4a0dc619f0bb81";
        const notionApiToken = "secret_9Y9GYULiViTgBzJXJnZ98D7PF4OrwrknMKuo8d18L0m";

        const notion = new Client({ auth: notionApiToken });

        try {
            // Create a new page in the specified database
            const response = await notion.pages.create({
            parent: {
                database_id: notionDatabaseId,
            },
            properties: {
                Name: {
                title: [
                    {
                    text: {
                        content: videoTitle,
                    },
                    },
                ],
                },
                URL: {
                rich_text: [
                    {
                    text: {
                        content: videoUrl,
                        link: { url: videoUrl },
                    },
                    },
                ],
                },
            },
            });

            console.log('New Notion page created:', response);
        } catch (error) {
            if (databaseId == null || apiToken == null){
                console.error("Missing Notion API credentials", error);
            }
            else{
                console.error("Error adding video URL to Notion:", error);
            }
            
        }

    };



    newVideoLoaded();
})();

