chrome.tabs.onUpdated.addListener((tabId, tab) => { //checking if the tab is a youtube link 
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      const queryParameters = tab.url.split("?")[1]; //spliting the url to get the ID 
      const urlParameters = new URLSearchParams(queryParameters);
      
      console.log(urlParameters); 
      
      chrome.tabs.sendMessage(tabId, { //getting info about the url ID 
        type: "NEW",
        videoId: urlParameters.get("v"),
      });
    }
  });
  