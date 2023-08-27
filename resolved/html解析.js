const html = `
  view {
    heading { 

    }
    p  {
      text { }
    }
  }
  section  {
    div  {
      a{  }
    }
    img{}
  }
`;

// 取巧方法
function parseHtmlSmart(html){
  let htmlObj,res = [];
  try{
    eval(`htmlObj = {${html.replace(/{/g,':{').replace(/}/g,'},')}}`);
  }catch(e){
    console.error('invalid input: ',html);
  }
  if(htmlObj){
    parseObj(htmlObj,res);
  }
  console.log(JSON.stringify(res,null, 2));
  return res;
}
function parseObj(obj,arr){
  for(const key in obj){
    let tag = {
      tagName:key,
      children:[]
    };
    arr.push(tag);
    parseObj(obj[key],tag.children);
  }
}

// 正经方法
function parseHtml(html){
  const res = [];
  parseHtmlTree(html,res);
  console.log(JSON.stringify(res,null, 2));
  return res;
}

function parseHtmlTree(html,arr){
  const reg = /\s*([A-Za-z][^{\s]*)\s*{/;
  
  let match = reg.exec(html);
  while(match){
    const prev = match[0];
    const tagName = match[1];
    const startIndex = match.index;
    const endIndex = findNextCompare(html,startIndex);
    const tag = {
      tagName,
      children:[],
    }
    arr.push(tag);
    parseHtmlTree(html.slice(prev.length + startIndex,endIndex),tag.children)
    html = html.slice(endIndex + 1);
    match = reg.exec(html);
  }

}

// 找到匹配的闭合括号位置
function findNextCompare(str,startIndex,left='{',right='}'){
  let stack = [];
  for(let i = startIndex;i<str.length;i++){
    if(str[i] === left){
      stack.push(1);
    }else if(str[i] === right){
      stack.pop();
      if(!stack.length){
        return i;
      }
    }
  }
  return -1;
}


parseHtmlSmart(html);
parseHtml(html);