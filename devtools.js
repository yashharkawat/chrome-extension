const con=chrome.devtools.inspectedWindow.eval;
//con('console.log("dev")')
//const mp=new Map();
// chrome.devtools.network.onRequestFinished.addListener(
//     function(request) {
      
//         chrome.devtools.inspectedWindow.eval(
//             'console.log(unescape("' +
//             escape(request.request.url) + '"))');
      
//     }
// );
//const arr=[];
chrome.devtools.network.onRequestFinished.addListener(request => {
    request.getContent((body) => {
      if (request.request && request.request.url) {
        const urlLink=request.request.url;
        const name=urlLink.split("/").pop();
        //arr.push(name);
        con('console.log(unescape("' +escape(name) + '"))');
        con('console.log(unescape("' +escape(body) + '"))');
        //mp.set(name,body);
      }
    });
  });


//let ss=arr.size;
//con('console.log(unescape("' +escape(ss) + '"))');
// for(let keys in mp){
//     con('console.log("done")');
//     con('console.log(unescape("' +escape(keys) + '"))');
//     con('console.log(unescape("' +escape(mp.get(keys)) + '"))');
// }
//con('console.log("DONE")');