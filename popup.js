const button=document.getElementById("buttonElement");
button.addEventListener("click",async ()=>
{    
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
button.addEventListener("mouseover",()=>{
    button.style.backgroundColor="#1858CE";
})
button.addEventListener("mouseout",()=>{
    button.style.backgroundColor="#0E61F6";
})
const Submit=document.getElementById("Submit");
Submit.addEventListener("click",async ()=>{
    Submit.classList.add("highlighted");
    chrome.storage.sync.clear();
    const inputText=document.getElementById("text").value;
    const fileType=document.querySelector('input[name="fileType"]:checked').value;
    chrome.storage.local.set({"typeOfFile":fileType});
    chrome.storage.local.set({"regexString":inputText});
    chrome.tabs.query({active:true,currentWindow:true},([tab])=>{
        chrome.tabs.reload(tab.id);
    })
})
