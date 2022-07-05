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

// const tooltipEl = document.createElement('div');
// tooltipEl.id = 'i18n-detector-tooltip';
// tooltipEl.position = 'absolute';
// document.body.appendChild(tooltipEl);

// const renderTooltip = (mouseX, mouseY, selection) => {
//     const tooltipEl = document.getElementById('i18n-detector-tooltip');
//   tooltipEl.innerHTML = selection;
//   tooltipEl.style.position = 'absolute';
//   tooltipEl.style.visibility = 'visible';
  
//   tooltipEl.style.top = mouseY + 'px';
//   tooltipEl.style.left = mouseX + 'px';
//   tooltipEl.style.backgroundColor = 'white';
// }
// const temp1=document.getElementById("buttonElement");
// temp1.addEventListener('mouseover', event => {
//    const selection = event.target.innerHTML;
//    console.log(event.target.getAttribute("id"));
//     if (selection.length > 0) {
//     renderTooltip(event.clientX, event.clientY, selection);
//   }
// }, false);

// temp1.addEventListener('mouseleave', event => {
//     const tooltipEl = document.getElementById('i18n-detector-tooltip');
//     tooltipEl.innerHTML = '';
//     tooltipEl.style.visibility = 'hidden';
// }, false)

