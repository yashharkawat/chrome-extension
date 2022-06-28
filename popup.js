const button=document.getElementById("buttonElement");
button.addEventListener("click",async ()=>{
    button.classList.add("but");
    await chrome.tabs.query({active:true,currentWindow:true},([tab])=>{
        chrome.storage.sync.get(null,(result)=>{
            for(let key in result){
                let object={};
                object[key]=result[key];
                chrome.tabs.sendMessage(tab.id,object);
            }
        })
        //chrome.tabs.sendMessage(tab.id);
    })
})