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
    const name=Object.keys(object)[0];
    //const name=nameOfFile.replace(/[^a-zA-Z0-9 ]/g, '');
    const i18nStrings=object[name];
    if(i18nStrings===null) return;
    
    i18nStrings.forEach((string)=>{
        documentNodes.forEach((item)=>{
            const text=item.textContent;
            if(matchLabelsWithString(text,string))
            {
                const newElement=document.createElement("mark");
                newElement.classList.add(name);
                newElement.setAttribute("id","highlight");
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
})
