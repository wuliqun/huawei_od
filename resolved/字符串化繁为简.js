
/**
题目描述
给定一个输入字符串，字符串只可能由英文字母（ 'a' ~ 'z'、'A' ~ 'Z' ）和左右小括号（ '('、')' ）组成。

当字符里存在小括号时，小括号是成对的，可以有一个或多个小括号对，小括号对不会嵌套，小括号对内可以包含1个或多个英文字母，也可以不包含英文字母。

当小括号对内包含多个英文字母时，这些字母之间是相互等效的关系，而且等效关系可以在不同的小括号对之间传递，即当存在 'a' 和 'b' 等效和存在 'b' 和 'c' 等效时，'a' 和 'c' 也等效，另外，同一个英文字母的大写字母和小写字母也相互等效（即使它们分布在不同的括号对里）

需要对这个输入字符串做简化，输出一个新的字符串，输出字符串里只需保留输入字符串里的没有被小括号对包含的字符（按照输入字符串里的字符顺序），并将每个字符替换为在小括号对里包含的且字典序最小的等效字符。

如果简化后的字符串为空，请输出为"0"。

示例 :
输入字符串为"never(dont)give(run)up(f)()"，初始等效字符集合为('d', 'o', 'n', 't')、('r', 'u', 'n')，由于等效关系可以传递，因此最终等效字符集合为('d', 'o', 'n', 't', 'r', 'u')，将输入字符串里的剩余部分按字典序最小的等效字符替换后得到"devedgivedp'

输入描述
input_string

输入为1行，代表输入字符串

输出描述
output_string

输出为1行，代表输出字符串

备注
输入字符串的长度在1~100000之间

用例
输入	()abd
输出	abd
说明	输入字符串里没有被小括号包含的子字符串为"abd"，其中每个字符没有等效字符，输出为"abd"
输入	(abd)demand(fb)()for
输出	aemanaaor
说明	等效字符集为('a', 'b', 'd', 'f')，输入字符串里没有被小括号包含的子字符串集合为'demandfor"，将其中字符替换为字典序最小的等效字符后输出为："aemanaaor"
输入	()happy(xyz)new(wxy)year(t)
输出	happwnewwear
说明	等效字符集为(‘x’, 'y', 'z', 'w')，输入字符串里没有被小括号包含的子字符串集合为"happynewyear"，将其中字符替换为字典序最小的等效字符后输出为："happwnewwear"
输入	()abcdefgAC(a)(Ab)(C)
输出	AAcdefgAC
说明	等效字符集为('a', 'A', 'b')，输入字符里没有被小括号包含的子字符串集合为"abcdefgAC"，将其中字符替换为字典序最小的等效字符后输出为："AAcdefgAC"
 */
 
function getResult(str) {
  const strArr = [];
  const equalArr = [];
  let index = -1,flag = false;
  for(let i = 0;i<str.length;i++){
    if(str[i] === '('){
      flag = true;
      index ++;
      equalArr.push(new Set());
    }else if(str[i] === ')'){
      flag = false;
    }else{
      if(flag){
        equalArr[index].add(str[i]);
      }else{
        strArr.push(str[i]);
      }
    }
  }
  const charMap = formatEqualArr(equalArr);
  return strArr.map((s)=>{
    return charMap[s] || s;
  }).join('')

}

/**
 * 
 * @param {Set<string>[]} arr 
 */
function formatEqualArr(arr){
  let res = arr.filter(s=>s.size > 0).sort((a,b)=>b.size - a.size);
  for(let i = 0;i<res.length;i++){
    for(let j = i+1;j<res.length;j++){
      if(hasSameChar(res[i],res[j])){
        res[i] = new Set([...res[i],...res[j]]);
        res.splice(j,1);
        j = i;
      }
    }
  }
  const charMap = {};
  res.forEach(s=>{
    let arr = [...s].sort();
    for(let i = 1;i<arr.length;i++){
      charMap[arr[i]] = arr[0];
    }
  });
  return charMap;
}

/**
 * 
 * @param {Set<string>} set1 
 * @param {Set<string>} set2 
 */
function hasSameChar(set1,set2){
  for(const char of set2){
    if(set1.has(char.toUpperCase()) || set1.has(char.toLowerCase())){
      return true;
    }
  }
  return false;
}

// 测试用例
console.log(getResult("never(dont)give(run)up(f)()") === 'devedgivedp');
console.log(getResult("()abd") === 'abd');
console.log(getResult("(abd)demand(fb)()for") === 'aemanaaor');
console.log(getResult("()happy(xyz)new(wxy)year(t)") === 'happwnewwear');
console.log(getResult("()abcdefgAC(a)(Ab)(C)") === 'AAcdefgAC');
