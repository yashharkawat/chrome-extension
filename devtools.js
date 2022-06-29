chrome.devtools.network.onRequestFinished.addListener(request => {
    request.getContent((body) => {
      if (request.request && request.request.url) {
        const urlLink=request.request.url;
        const name=urlLink.split("/").pop();
        const regEx1=new RegExp("^fr_FR");
        const regEx2=new RegExp("^en_US");
        const regEx3=new RegExp("\.js$");

        if((regEx1.test(name)||regEx2.test(name))&&regEx3.test(name))
        {
          //x+=1;
          const nameOfFile = urlLink.replace(/[^a-zA-Z0-9 ]/g, '');
          const last=body.split("default={").pop();
          const first=last.split("}}}]")[0];
          const keyValPair=first.split('",');
          const i18nStrings=[];

          keyValPair.forEach((item)=>{
            var value=item.split(':"').pop();
            if(value[value.length-1]==='"') 
            {
              value = value.slice(0,value.length-1);
            }
            value=JSON.parse(JSON.stringify(value));
            value=value.trim();
            i18nStrings.push(value);

          })
          const responseObject={};
          responseObject[nameOfFile]=i18nStrings;
          chrome.storage.sync.set(responseObject);
         } 
      }
    });
  });
