let Brower = 'Google Chrome';
let time = 'now: 20210814';
let errormsg = 'Error state: 404';

function setBrower() {
    return Brower
};
function showBrowerName() {
    return Brower
};
function showBrowerTime() {
    return time
};
function showBrowerError() {
    return errormsg
};
// 不exports的話就會是隱藏的，想要套用模組的地方用不到
// .
// .
// .

// ------------------我是抗議分隔線------------------
// JavaScript is weird!
// 創模組就會偷偷幫你預設空物件
// exports = module.exports = {}


// 雖然輸出的為module.exports但用點的方式可以更改到原生物件
// exports.setBrower = setBrower;
// exports.showBrowerName = showBrowerName;
// exports.showBrowerTime = showBrowerTime;


// JavaScript is weird!!
// 想整理成物件看起來比較舒服，但其實不行。
// 因為這樣會創出一個新物件，而module.exports還會是對應"空物件"
// exports = {
//   setBrower,
//   showBrowerName,
//   showBrowerTime
// }


// 所以如果還是要用漂亮寫法，直接改module.exports也是可以的，
// 雖然exports依舊是空的但是誰管你，畢竟出去的是module.exports
module.exports = {
    setBrower,
    showBrowerName,
    showBrowerTime
}

  // JavaScript is weird!!! <--JS騎重機-->
  // 雖然是寫 exports 但 return 的 --> 其實是module.exports
  // return module.exports