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

console.log(unique3(numArray));