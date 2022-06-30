const getRandomHexValue=()=> {
    const letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 15)];
    }
    return color;
}
const getTargetStringRegex=(string)=>{
    let newString="";
    for(let i=0;i<string.length;i++)
    {
        if(string[i]==='.'||string[i]==='('||string[i]===')'){
            newString+="\\";
        }
        newString+=string[i];
    }
    let k=-1;
    let indexArray=[];
    for(let i=1;i<newString.length-1;i++)
    {
        if(newString[i]==='{'&&newString[i-1]==='{') k=i-1;
        if(newString[i]==='}'&&newString[i+1]==='}')
        {
            if(k>=0) 
            {
                indexArray.push([k,i+1]);
                k=-1;        
            } 
        }

    }
    let RegexString="";
    k=0;
    if(newString[0]!=='{') RegexString+='^';
    indexArray.forEach((item)=>{
        RegexString+=newString.slice(k,item[0]);
        RegexString+="\\w*";
        k=item[1]+1;
    })
    RegexString+=newString.slice(k,newString.length);
    if(k!==newString.length) RegexString+='$';
    return RegexString;
}

const matchLabelsWithString=(text,string)=>{
    if(text===string) return true;
    const regexString=getTargetStringRegex(string);
    let regEx=new RegExp(`${regexString}`);

    return regEx.test(text);
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
const HighlightNodes=(object,documentNodes)=>{
    const name=Object.keys(object)[0];
    const i18nStrings=object[name];
    if(i18nStrings===null) return;
    
    i18nStrings.forEach((string)=>{
        documentNodes.forEach((item)=>{
            const text=item.textContent;
            if(matchLabelsWithString(text,string))
            {
                const newElement=document.createElement("mark");
                newElement.classList.add(name);
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
chrome.runtime.onMessage.addListener((message) => {
    const documentNodes=dfs(document.body,[]);
    HighlightNodes(message,documentNodes);   
})
// chrome.runtime.sendMessage({
//     from: 'content',
//     subject: 'showPageAction',
//     msg:"hi",
//   });