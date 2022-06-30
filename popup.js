const button=document.getElementById("buttonElement");
button.addEventListener("click",async ()=>{
    button.classList.add("highlighted");
    await chrome.tabs.query({active:true,currentWindow:true},([tab])=>{
        chrome.storage.sync.get(null,(result)=>{
            for(let key in result){
                let namespaceFile={};
                namespaceFile[key]=result[key];
                chrome.tabs.sendMessage(tab.id,namespaceFile);
            }
        })
    })
})

