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
  chrome.tabs.create({ url: url.href, index: tab.index + 1 });

});


