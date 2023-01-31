// All rights reserved to Isabella Rasku and Aditya Ponde 2023.

// making the context menu


chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
      id: "Lookup",
      title: "Lookup On RMP",
      type: 'normal',
      contexts: ['selection']
    });

});




// opens RMP when context menu is clicked with the search perms using selected text
chrome.contextMenus.onClicked.addListener((item, tab) => {
  
  var name = item.selectionText;
  var uname = name.replace(/ /g, "+");
  let url = new URL("https://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=&queryoption=HEADER&")
  url.searchParams.set('query', uname)

  // gets resolution of the main window to open the popup in the right corner
  chrome.windows.getCurrent((cw) => {
    let w, h;
    
      w = cw.width - 500;
    
    // creates new popup window
    chrome.windows.create(
      
    {

      url: url.href,
      type: "popup",
      left: w,
      width: 500,
      height: 900,
      

    });

    // gets ID of the popup window
    chrome.windows.getCurrent((pop) => 
    {

      let popid = pop.id;

      // when focus changes the window closes
      chrome.windows.onFocusChanged.addListener( (stat) =>
        {
          chrome.windows.onFocusChanged.addListener( (stat) =>
        {
          chrome.windows.remove(popid);
        });
        });
    });



  });

  

});


