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
document.getElementById("js").addEventListener("click",()=>{
    const fileType=document.querySelector('input[name="fileType"]:checked').value;
    chrome.storage.local.set({"typeOfFile":fileType});
})
document.getElementById("json").addEventListener("click",()=>{
    const fileType=document.querySelector('input[name="fileType"]:checked').value;
    chrome.storage.local.set({"typeOfFile":fileType});
})

document.getElementById("text").addEventListener("change",()=>{
    const inputText=document.getElementById("text").value;
    chrome.storage.local.set({"regexString":inputText});
})
const refresh=document.getElementById("refresh");
refresh.addEventListener("click",()=>{
    chrome.storage.sync.clear();
    chrome.tabs.query({active:true,currentWindow:true},([tab])=>{
        chrome.tabs.reload(tab.id);
    })
})
refresh.addEventListener("mouseover",()=>{
    refresh.style.backgroundColor="#F8F8FA";
})
refresh.addEventListener("mouseout",()=>{
    refresh.style.backgroundColor="#FFFFFF";
})

chrome.storage.local.get("regexString",(result)=>{
    if("regexString" in result)
    {
        document.getElementById("text").value=result.regexString;
    }
})  
chrome.storage.local.get("typeOfFile",(type)=>{
    if("typeOfFile" in type)
    {
        if(type.typeOfFile===".js") 
        {
            document.getElementById("js").checked=true;
        }
        else{
            document.getElementById("json").checked=true;
        }
    }
})  



