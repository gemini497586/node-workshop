async function asyncF() {
    console.log(1);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(2);
        resolve();
      }, 0);
    });
    console.log(3);
  }
  
  console.log(4);
  asyncF();
  console.log(5);

// 輸出結果：
// 4 
// 1
// 5
// 2
// 3

// 原因：
// 4 
// 因為syncF function尚未被呼叫，所以 L12 第一個執行 

// 1
// L13 呼叫 syncF()，執行 L2

// 5
// L4 setTimeout 交給暗樁，存在queue，L4 還沒執行，
// 但是因 await跟 promise L9需要等前面的先做好，所以非同步的 L14先完成

// 2
// 存在queue，L4 等 callstack 空掉後，開始執行

// 3
// await完成後，才輪到 L9