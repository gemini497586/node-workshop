// await / async 基於 promise 的語法糖
// 本次目標：使用 await / async -> 改善promise chain
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

(async function(){
    let work01 = await doWork("刷牙", 3000, true);
     console.log(work01);
    let work02 = await doWork("吃早餐", 5000, true);
     console.log(work02);
    let work03 = await doWork("寫功課", 3000, true);
     console.log(work03);
    let work04 = await doWork("玩遊戲", 6000, true);
     console.log(work04);
    let work05 = await doWork("睡午覺", 8000, true);
     console.log(work05);
})();

