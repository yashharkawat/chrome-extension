const namespaceStorage={};
chrome.devtools.network.onRequestFinished.addListener(request => {
    request.getContent((body) => {
      if (request.request && request.request.url) {
        const urlLink=request.request.url;
        const name=urlLink.split("/").pop();
        const regEx=new RegExp("\.json$");
        
        if(regEx.test(name)&&name!=="manifest.json")
        {
          const nameOfFile = urlLink.replace(/[^a-zA-Z0-9 ]/g, '');
          const bodyObject=JSON.parse(body);
          const i18nStrings=[];
          for(let key in bodyObject){
            i18nStrings.push(bodyObject[key]);
          }
          const responseObject={};
          responseObject[nameOfFile]=i18nStrings;

          chrome.storage.sync.set(responseObject)
          
          // chrome.tabs.query({currentWindow:true,active:true},([tab]) => {
          //   chrome.tabs.sendMessage(tab.id,responseObject)
          // })
        }  
        
      }
    });
  });
