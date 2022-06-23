console.log("background  file running");
const object={"a":1};
// const name="age";
chrome.storage.sync.set({"object":object});
function getData(key) {
    // Immediately return a promise and start asynchronous work
    return new Promise((resolve, reject) => {
      // Asynchronously fetch all data from storage.sync.
      chrome.storage.sync.get(key, (items) => {
        // Pass any observed errors down the promise chain.
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        // Pass the data retrieved from storage down the promise chain.
        resolve(items);
      });
    });
  }
const nn={};
getData("object").then((item)=>{
    Object.assign(nn,item);
})
const nam="age";
nn[nam]=10;
console.log(nn);
chrome.storage.sync.set({"object":nn});

getData("object").then((item)=>{
    Object.assign(nn,item);
    console.log(item);
})
console.log(nn);
// const xx=getObject("object");
// console.log("xx:",xx);

//var newObject={};
// chrome.storage.sync.get("object",({object})=>{
//     console.log("obect",JSON.stringify(object));
//     newObject=JSON.parse(JSON.stringify(object));
//     newObject[name]=10;
//     console.log("nnew object",JSON.stringify(newObject));
// });
// console.log("outside",JSON.stringify(newObject));
// chrome.storage.sync.set({"object":newObject});
// chrome.storage.sync.get("object",({object})=>{
//     console.log("after setting",JSON.stringify(object));
//     // const newObject=JSON.parse(JSON.stringify(object));
//     // newObject[name]=10;
//     // chrome.storage.sync.set({"object":newObject});
// });
// chrome.storage.sync.set({"object":ab});
// chrome.storage.sync.get("object",({object})=>{
//     for(let key in object)
//         {
//             console.log(key);
//             console.log(object[key]);
//         }
// });
//namespace file
const arr=[];
arr.push(1);
arr.push(2);
console.log(arr);
// chrome.tabs.onActivated.addListener((tab) => {

//     console.log(tab)

//     chrome.tabs.get(tab.tabId, (CurrentTabData) => {

//         if (CurrentTabData.url === "http://localhost:3000/") {

//             chrome.scripting.executeScript({
//                 target: { tabId: CurrentTabData.id },
//                 files: ['content.js']
//             });

//             setTimeout(() => {
//                 chrome.tabs.sendMessage(
//                     tab.tabId,
//                     "hey I have injected you tab: " + tab.tabId,
//                     (response) => {
//                         console.log(response)
//                     }
//                 )
//             }, 2000)
//         }

//     })

// })
//insert CSS