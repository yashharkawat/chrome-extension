// import uniqolor from 'uniqolor/src/index.js';
// const uniqolor = require('uniqolor');
console.log("content scipt working");
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 15)];
    }
    return color;
}
const high=(name,node)=>{
    const range = new Range();
    const text=node.textContent;
    range.setStart(node,0);
    range.setEnd(node,text.length);
    const highlight = new Highlight(range);
    CSS.highlights.set('my-custom-highlight', highlight);
}
const helperFun=(string)=>{
    let n=string.length;
    let str="";
    for(let i=0;i<n;i++)
    {
        if(string[i]==='.'){
            str+="\\";
        }
        str+=string[i];
    }
    let k=-1;
    let arr=[];
    for(let i=1;i<str.length-1;i++)
    {
        if(str[i]==='{'&&str[i-1]==='{') k=i-1;
        if(str[i]==='}'&&str[i+1]==='}')
        {
            if(k>=0) 
            {
                arr.push([k,i+1]);
                k=-1;        
            } 
        }

    }
    return [str,arr];
}
//returns all string which has the same pattern as the corresponding string. 
const patternMatch=(text,string)=>{
    let [str,arr]=helperFun(string);
    let newStr="";
    let k=0;

    arr.forEach((item)=>{
        newStr+=str.slice(k,item[0]);
        newStr+="\\w*";
        k=item[1]+1;
    })
    newStr+=str.slice(k,str.length);
    
    let regEx=new RegExp(`${newStr}`);
    let array=[];

    return regEx.test(text);
}
//helper function to loop through all nodes.
const dfs = (node,arrayOfNodes) => {
  if(node===null) return;
  if(node.nodeName==='STYLE') return;

  arrayOfNodes.push(node);
  node.childNodes.forEach((item) => {
      dfs(item,arrayOfNodes);
  });
  return arrayOfNodes;
};

const func=(object,name)=>{
    //const name=name;
    for(let key in object)
    {
        const str=object[key];
        const arrayOfNodes=dfs(document.body,[]);
        arrayOfNodes.forEach((item)=>{
            if(item.nodeType===Node.TEXT_NODE)
            {
                
                const text=item.textContent;
                //console.log(text);
                

                if(patternMatch(text,str))
                {
                    // const range = new Range();
                    // range.setStart(item,0);
                    // range.setEnd(item,text.length);
                    // const highlight = new Highlight(range);
                    // CSS.highlights.set('my-custom-highlight', highlight);
                    // document.getSelection().removeAllRanges();
                    // document.getSelection().addRange(range);/
                    const newElement=document.createElement("mark");
                    
                    newElement.classList.add(name);
                    newElement.innerHTML=text;
                    const parent=item.parentNode;
                    parent.replaceChild(newElement,item);
                }
            }
        })
    }
    const strr=`.${name}`;
    //const st=JSON.stringify(strr);
    const arr=document.querySelectorAll(strr);
    var color=getRandomColor();
    arr.forEach((item)=>{
        //var color = uniqolor(name);
        //var randomColor = Math.floor(Math.random()*16777215).toString(16);
        item.style.backgroundColor=color;
    })
}

const obj=
{
    "You have changed the language {{count}} times": "You have changed the language {{count}} times"
}
;
const obj2=
{
    "welcome": "Welcome!"
};
// func(obj);
// func(obj2);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    func(message[0],message[1]);
    //console.log(sender)
    sendResponse("hi")
})

// "content_scripts":[
//     {
//     "matches":["<all_urls>"],
//     "js":["content.js"]
// }   
// ],