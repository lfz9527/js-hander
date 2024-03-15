// 数组去重
const array = [1, 1, "1", "1"];
const numArray = [1, 2, 3, 4, 5, 4, 3, 2, 1];

// 双层for循环

function unique1(arr) {
  const copyArr = [...arr];
  const res = [];

  for (let i = 0; i < array.length; i++) {
    let bool = true;
    for (let j = 0; j < copyArr.length; j++) {
      if (res[j] === array[i]) {
        bool = false;
        break;
      }
    }
    if (bool) {
      res.push(array[i]);
    }
  }
  return res;
}

// console.log(unique1(array));

// 使用 indexOf
function unique2(arr) {
  var res = [];
  for (var i = 0, len = array.length; i < len; i++) {
    const index = res.indexOf(arr[i]);
    if (index === -1) {
      res.push(arr[i]);
    }
  }
  return res;
}

// console.log(unique2(array));

// 排序后去重,只能针对能排须的数组进行去重
function unique3(arr) {
  const res = [];
  const sortedArray = arr.concat().sort();
  let seen;
  for (let i = 0; i < sortedArray.length; i++) {
    // 如果是第一个元素或者相邻的元素不相同
    if (!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i]);
    }
    seen = sortedArray[i];
  }
  return res;
}

// console.log(unique3(numArray));


/**
 * 写一个名为 unique 的工具函数，我们根据一个参数 isSorted 判断传入的数组是否是已排序的，
 * 如果为 true，我们就判断相邻元素是否相同，如果为 false，我们就使用 indexOf 进行判断
 */

const array1 = [1, 2, '1', 2, 1];
const array2 = [1, 1, '1', 2, 2];

// 第一版
function uniqueTool (array,isSorted){
  let res = [];
  let seen = [];

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if(isSorted) {
      if (!i || seen !== value) {
        res.push(value);
      }
      seen = value
    } else if(res.indexOf(value) === -1) {
      res.push(value)
    }
  }

  return res
}

// console.log(uniqueTool(array1)); // [1, 2, "1"]
// console.log(uniqueTool(array2, true)); // [1, "1", 2]


/**
 *  新需求：字母的大小写视为一致，比如'a'和'A'，保留一个就可以了！
 * @param {*} array 
 * @param {*} isSorted 
 * @param {*} iteratee 
 */

//第三版
function uniqueTool1 (array, isSorted, iteratee){
  let res = []
  let seen = []

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    const computed = iteratee ? iteratee(value, i, array) : value;
    if(isSorted) {
      if (!i || seen !== computed) {
        res.push(value);
      }
      seen = computed
    } 
    else if(iteratee) {
      if (seen.indexOf(computed) === -1) {
          seen.push(computed);
          res.push(value);
      }
    }
    else if(res.indexOf(value) === -1) {
      res.push(value)
    }
  }
  return res
}

function iteratee(str){
  return typeof str == 'string' ? str.toLowerCase() : str
}

var array3 = [1, 1, 'a', 'A', 2, 2];

// console.log(uniqueTool1(array3, false, iteratee)); // [1, "a", 2]

/**
 * 使用 Es6 filter 方法简化外层循环
 */
var array22 = [1, 2, 1, 1, '1'];
function uniqueEnt (arr = []) {
  return arr.filter((item,index,array)=>{
    return array.indexOf(item) === index
  })
}
console.log(uniqueEnt(array22)); // [ 1, 2, '1' ]

// 排序去重
function uniqueSort(array){
  return arr.concat().sort().filter((v,i,a)=>{
    return !index || item !== array[index - 1]
  })
}


/**
 * Object 键值对
 * 有缺陷：因为对象的key 值都是String 所有无法有效区分 1 和 '1'
 */

function uniqueObject(array) {
    var obj = {};
    return array.filter(function(item, index, array){
        return obj.hasOwnProperty(item) ? false : (obj[item] = true)
    })
}


/**
 * 使用 typeof item + item 拼成字符串作为 key 值来尝试避免这个问题
 */
function uniqueObject1(array) {
  var obj = {};
  return array.filter(function(item, index, array){
      return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
  })
}

// console.log(uniqueObject1([1, 2, 1, 1, '1'])); // [1, 2, "1"]

/**
 * 依然无法正确区分出两个对象，比如 {value: 1} 和 {value: 2}，
 * 因为 typeof item + item 的结果都会是 object[object Object]，
 * 不过我们可以使用 JSON.stringify 将对象序列化
 * 
 * 缺点：序列化对任意 正则表达式 都是 {} 所以这个方法并不适用于处理正则表达式去重
 */

function uniqueObject2(array) {
    var obj = {};
    return array.filter(function(item, index, array){
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}

// console.log(uniqueObject2([{value: 1}, {value: 1}, {value: 2}])); // [{value: 1}, {value: 2}]

// console.log(JSON.stringify(/a/)); // {}
// console.log(JSON.stringify(/b/)); // {}


// ES6 出来后，去重变得更加简单

function uniqueEs6(array) {
   return Array.from(new Set(array));
}

console.log(uniqueEs6([1, 2, 1, 1, '1'])); // [1, 2, "1"]

// 简化
function uniqueEs61(array) {
  return [...new Set(array)];
}

// 再简化
const uniqueEs62 = arr => [...new Set(arr)]


// 此外，如果用 Map 的话：
function uniqueEs63 (arr) {
  const seen = new Map()
  return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
}


// 特殊类型比较 
var str1 = '1';
var str2 = new String('1');
console.log(,new Number(1),str1); // [Number: 1] 1

console.log(str1 == str2); // true
console.log(str1 === str2); // false

console.log(null == null); // true
console.log(null === null); // true

console.log(undefined == undefined); // true
console.log(undefined === undefined); // true

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(/a/ == /a/); // false
console.log(/a/ === /a/); // false

console.log({} == {}); // false
console.log({} === {}); // false