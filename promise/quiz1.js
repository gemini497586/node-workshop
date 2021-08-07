// 請問下列程式碼印出的順序為何？

function syncF() {
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);
  console.log(3);
}

console.log(4);
syncF();
console.log(5);

// 輸出結果：
// 4 
// 1
// 3
// 5
// 2

// 原因：
// 4 
// 因為syncF function尚未被呼叫，所以 L12 第一個執行 

// 1
// L13 呼叫 syncF()，執行 L4 

// 3
// L6 setTimeout 交給暗樁，存在queue，L4 還沒執行，所以輪到 L9

// 5
// 存在queue，L4 還沒執行，還在等callstack空掉，所以 L14先執行

// 2
// callstack空掉，event loop 將存在queue，L4轉移到callstack執行