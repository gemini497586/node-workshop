// 本次目標：使用promise then chain -> 改善promise1.js 依舊有波動拳結構的情形
// 模擬非同步工作 doWork function
// 做事情順序：開始工作 -> 刷牙(3s) -> 吃早餐(5s) -> 寫功課(3s) -> 玩遊戲(6s) -> 睡午覺(8s)

// Promise 寫法
let doWork = function (job, timer, isOK) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        // 成功
        resolve(`完成工作：${job} at ${dt.toISOString()}`);
      } else {
        // 失敗
        reject(`${job} 失敗了！ at ${dt.toISOString()}`);
      }
    }, timer);
  });
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

let work01 = doWork("刷牙", 3000, true);
// let work02 = doWork("吃早餐", 5000, true);
// let work03 = doWork("寫功課", 3000, true);
// let work04 = doWork("玩遊戲", 6000, true);
// let work05 = doWork("睡午覺", 8000, true);
// promise 是同步工作，如果先宣告就會先執行，直到遇見setTimeout()這個非同步的，接著丟給暗樁做。
// 所以 return work02-05 都會在同一個起跑點。 

work01
  .then((result) => {
    console.log("第 1 個 then 被呼叫了", result);
    return doWork("吃早餐", 5000, true);
    // 即使我們回傳的是數字，還是會包成 promise 物件
    // Promise.resolve(1)
  })
  .then((result) => {
    console.log("第 2 個 then", result);
    return doWork("寫功課", 3000, true);
  })
  .then((result) => {
    console.log("第 3 個 then", result);
    return doWork("玩遊戲", 6000, true);
  })
  .then((result) => {
    console.log("第 4 個 then", result);
    return doWork("睡午覺", 8000, true);
  })
  .then((result) => {
    console.log("第 5 個 then", result);
  })
  .catch((error) => {
    // 捕捉錯誤
    console.log("reject函式被呼叫了", error);
  })

// let job1 = doWork("刷牙", 3000, true);
// job1
//   .then((result) => {
//     console.log("第 1 個函式被呼叫了", result);
//     return 1;
//     // 即使我們回傳的是數字，還是會包成 promise 物件
//     // Promise.resolve(1)
//   })
//   .then((result) => {
//     console.log("第 2 個 then", result);
//   })
//   .catch((error) => {
//     // 捕捉錯誤
//     console.log("第 2 個函式被呼叫了", error);
//   })
//   .finally(() => {
//     // 無論成功或失敗都會在這裡
//     console.log("finally");
//   });

// work01.then(
//   function (resolve) {
//     console.log(resolve, "可以進行下一個");
//   },
//   function (reject) {
//     console.log(reject);
//   }
// );