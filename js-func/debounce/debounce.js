var count = 1;
var container = document.getElementById("container");

function getUserAction(e) {
  console.log("this", this);
  console.log("e", e);
  container.innerHTML = count++;
}

// container.onmousemove = debounce1(getUserAction,1000);
// container.onmousemove = debounce2(getUserAction,1000);
// container.onmousemove = debounce3(getUserAction, 1000);
// container.onmousemove = debounce4(getUserAction, 1000, true);
// container.onmousemove = debounce5(getUserAction, 1000, true);
var func = debounce6(getUserAction, 1000, false);

container.onmousemove = func;
document.getElementById("button").addEventListener("click", function () {
  func.cancel();
});
/**
 * 第一版
 * @param {*} func
 * @param {*} wait
 * @returns
 */
function debounce1(func, wait) {
  var timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

/**
 * 第二版 将 func 里面的this指向正确的对象
 */
function debounce2(func, wait) {
  var timeout;
  return function () {
    var context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context);
    }, wait);
  };
}

/**
 * 第三版 修复event 对象传入 func入
 */

function debounce3(func, wait) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

/**
 * 第四版 我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。
 */

function debounce4(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行，则不再执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}

/**
 * 第五版 需要有返回值
 */

function debounce5(func, wait, immediate) {
  var timeout, result;
  return function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行，则不再执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };
}

/**
 * 第六版 实现防抖取消功能
 */

function debounce6(func, wait, immediate) {
  var timeout, result;

  var debounced = function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行，则不再执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}
