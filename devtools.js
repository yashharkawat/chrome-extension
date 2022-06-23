const con=chrome.devtools.inspectedWindow.eval;
const display=(item)=>{
  con('console.log(unescape("' +escape(item) + '"))');
}

chrome.devtools.network.onRequestFinished.addListener(request => {
    request.getContent((body) => {
      if (request.request && request.request.url) {
        const urlLink=request.request.url;
        const name=urlLink.split("/").pop();

        const regEx=new RegExp("\.json$");
        if(regEx.test(name)&&name!=="manifest.json")
        {
          const newName=name.split('.');
          const Name=newName[0];
          // chrome.tabs.onActivated.addListener((tab) => {
          //   display(JSON.stringify(tab));
          //   chrome.tabs.get(tab.tabId, (CurrentTabData) => {
          //     chrome.scripting.executeScript({
          //     target: { tabId: CurrentTabData.id },
          //     files: ['content.js']
          //   });
          //   })
          //   setTimeout(()=>{
          //     chrome.tabs.sendMessage(tab.tabId,JSON.parse(body),(response)=> { 
          //       display(response)
          //       })
          //   },2000);
          //   //display(name);
          //   //display(body);
          
          // })
          const array=[JSON.parse(body),Name];
          chrome.tabs.query({currentWindow:true,active:true},(tabs) => {
            var tab=tabs[0];
            //display(JSON.stringify(tab));
            setTimeout(()=>{
              chrome.tabs.sendMessage(tab.id,array,(response)=> { 
                display(response)
                })
            },2000);
            chrome.tabs.get(tab.id, (CurrentTabData) => {
              chrome.scripting.executeScript({
              target: { tabId: CurrentTabData.id },
              files: ['content.js']
            });
            })
            
            //display(name);
            //display(body);
          
          })
        }
        
        
      }
    });
  });

//display(dict.size);
  
  // load
  // chrome.storage.local.get( "mp",
  //   function(saved){
  //     const mp = new Map(Object.entries(result.mp));
  //   }
  // )
  // chrome.storage.sync.get("map", ({ mp }) => {
  //   con('console.log(unescape("' +escape(mp.size) + '"))');
  // });
//let ss=arr.size;
//con('console.log(unescape("' +escape(ss) + '"))');
// for(let [keys,value] of mp){  
//   display(keys);
//   display(value);   
// }
// display(mp.size);
// display(mp.size+1);

// if(regEx.test(name)&&name!=="manifest.json")
//         {
//           const obj=JSON.parse(body);

//           chrome.storage.sync.get("object",({object})=>{
//             const newObject=JSON.parse(JSON.stringify(object));
//             let a=0;
//             display(a);
//             display(JSON.stringify(newObject));
//             newObject[urlLink]=body;
            
            
//             display(JSON.stringify(newObject));
//             //display(JSON.stringify(newObject));
//             display(a);
//             // for(let key in newObject)
//             // {
//             //   a+=1;
//             //   display(a);
//             //   display(key);
//             //   display(newObject[key]);
//             // }
            
            
//             chrome.storage.sync.set({"object":newObject});
//             //display(object[b]);
//           })
//           //display(JSON.stringify(newObject));
          
//           chrome.storage.sync.get("object",({object})=>{
//             display("object  is");
//             display(JSON.stringify(object));
//           })
//           // for(let key in obj)
//           // {
//           //   dict.push(obj[key]);
//           // }
//           //display(obj);
//         }