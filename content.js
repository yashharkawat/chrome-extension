const tooltipEl = document.createElement('div');
tooltipEl.id = 'i18n-detector-tooltip';
tooltipEl.position = 'absolute';
document.body.appendChild(tooltipEl);

const renderTooltip = (mouseX, mouseY, selection) => {
    const tooltipEl = document.getElementById('i18n-detector-tooltip');
  tooltipEl.innerHTML = selection;
  tooltipEl.style.position = 'absolute';
  tooltipEl.style.visibility = 'visible';
  
  tooltipEl.style.top = mouseY + 'px';
  tooltipEl.style.left = mouseX + 'px';
  tooltipEl.style.backgroundColor = 'white';
}
const getRandomHexValue=()=> {
    const letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 15)];
    }
    return color;
}
const getTargetStringRegex=(string)=>{

    let transformedString=string.replace('.',"\\.").replace('(',"\\(").replace(')',"\\)");
    
    const regex=/{{([^}]+)}}/g;
    let regexString="";
    if(transformedString[0]!=='{') regexString+='^';
    regexString+=transformedString.replace(regex,"\\w*");
    if(transformedString[transformedString.length-1]!='}') regexString+='$';
    
    return regexString;
}

const matchLabelsWithString=(text,string)=>{
    if(text===string) return true;
    const regexString=getTargetStringRegex(string);
    let regEx=new RegExp(`${regexString}`);

    return regEx.test(text);
}


const highlightNodes=(object,documentNodes)=>{
    const nameOfFile=Object.keys(object)[0];
    const name=nameOfFile.replace(/[^a-zA-Z0-9 ]/g, '');
    const i18nStrings=object[nameOfFile];
    if(i18nStrings===null) return;
    
    i18nStrings.forEach((string)=>{
        documentNodes.forEach((item)=>{
            const text=item.textContent;
            if(matchLabelsWithString(text,string))
            {
                const newElement=document.createElement("mark");
                newElement.classList.add("highlight");
                newElement.classList.add(name);
                newElement.setAttribute("id",nameOfFile);
                newElement.innerHTML=text;
                const parent=item.parentNode;
                if(parent.contains(item)) parent.replaceChild(newElement,item);
            }
            
        })
        
    })
    const markedNodes=document.querySelectorAll(`.${name}`);
    const color=getRandomHexValue();
    markedNodes.forEach((item)=>{
        item.style.backgroundColor=color;
    })
    
}
const dfs = (node,documentNodes) => {
    if(node===null) return;
    if(node.nodeName==='STYLE') return;
    if(node.nodeName==='MARK') return;
    if(node.nodeType===Node.TEXT_NODE) documentNodes.push(node); 
    node.childNodes.forEach((item) => {
        dfs(item,documentNodes);
    });
    return documentNodes;
  };
chrome.runtime.onMessage.addListener((message) => {
    const documentNodes=dfs(document.body,[]);
    highlightNodes(message,documentNodes); 
    document.querySelectorAll(".highlight").forEach((temp1)=>{
        temp1.addEventListener('mouseover', event => {
            const selection = event.target.getAttribute("id");
             if (selection.length > 0) {
             renderTooltip(event.clientX, event.clientY, selection);
           }
         }, false);
         
         temp1.addEventListener('mouseleave', event => {
             const tooltipEl = document.getElementById('i18n-detector-tooltip');
             tooltipEl.innerHTML = '';
             tooltipEl.style.visibility = 'hidden';
         }, false)
    })  
})


