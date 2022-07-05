chrome.devtools.network.onRequestFinished.addListener(request => {
  request.getContent((body) => {
    
    if (request.request && request.request.url) {
      const urlLink=request.request.url;
      const name=urlLink.split("/").pop();

      chrome.storage.local.get("typeOfFile",(type)=>{
        if(type.typeOfFile===".json")
        {
          chrome.storage.local.get("regexString",(reg)=>{
            const regex=new RegExp(`${reg.regexString}`);

            if(regex.test(name)&&name!=="manifest.json")
            {
              const nameOfFile = urlLink.replace(/[^a-zA-Z0-9 ]/g, ''); //it is required to highlight labels therefore needs to be unique
              const i18nStrings=[];
              const  bod=JSON.parse(body);
              for(let key in bod){
                i18nStrings.push(bod[key]);
              }

              const namespaceFile={};
              namespaceFile[name]=i18nStrings;
              chrome.storage.sync.set(namespaceFile);
            } 
          })
          
        }
        else{
          chrome.storage.local.get("regexString",(reg)=>{
            const regex=new RegExp(`${reg.regexString}`);
            if(regex.test(name))
            {
              const nameOfFile = urlLink.replace(/[^a-zA-Z0-9 ]/g, ''); //it is required to highlight labels therefore needs to be unique
              const lastBodyPart=body.split("default={").pop();
              const bodyKeyValPair=lastBodyPart.split("}}}]")[0];
              const keyValPair=bodyKeyValPair.split('",');
              const i18nStrings=[];

              keyValPair.forEach((item)=>{
                var value=item.split(':"').pop();
                if(value[value.length-1]==='"') value = value.slice(0,value.length-1);
                value=JSON.parse(JSON.stringify(value)); 
                value=value.trim();
                i18nStrings.push(value); //putting all value pairs in i18nstrings array

              })
              const namespaceFile={};
              namespaceFile[name]=i18nStrings;
              chrome.storage.sync.set(namespaceFile);
            }
          })
        }
      })
      
    }
  });
});




  