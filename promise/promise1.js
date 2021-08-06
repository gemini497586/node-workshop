// 本次目標：使用promise -> 改善callback hell
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
let work02 = doWork("吃早餐", 5000, true);
let work03 = doWork("寫功課", 3000, true);
let work04 = doWork("玩遊戲", 6000, true);
let work05 = doWork("睡午覺", 8000, true);

// work01.then(
//   function (resolve) {
//     console.log(resolve, "可以進行下一個");
//   },
//   function (reject) {
//     console.log(reject);
//   }
// );

work01.then(
  function (resolve) {
    console.log(resolve, "可以進行下一個");
    work02.then(
      function (resolve) {
        console.log(resolve, "可以進行下一個");
        work03.then(
          function (resolve) {
            console.log(resolve, "可以進行下一個");
            work04.then(
              function (resolve) {
                console.log(resolve, "可以進行下一個");
                work05.then(
                  function (resolve) {
                    console.log(resolve, "可以進行下一個");
                  },
                  function (reject) {
                    console.log(reject);
                  }
                );
              },
              function (reject) {
                console.log(reject);
              }
            );
          },
          function (reject) {
            console.log(reject);
          }
        );
      },
      function (reject) {
        console.log(reject);
      }
    );
  },
  function (reject) {
    console.log(reject);
  }
);


// callback 寫法
// let doWork = function (job, timer, cb) {
//   setTimeout(() => {
//     let dt = new Date();
//     // callback 慣用設計
//     // 第一個參數：error
//     // 第二個參數：要回覆的資料
//     cb(null, `完成工作：${job} at ${dt.toISOString()}`);
//   }, timer);
// };

// let dt = new Date();
// console.log(`開始工作 at ${dt.toISOString()}`);

// doWork("刷牙", 3000, function (err, data) {
//   if (err) {
//     console.error("發生錯誤了:", err);
//     return;
//   }
//   console.log(data);
//   doWork("吃早餐", 5000, function (err, data) {
//     if (err) {
//       console.error("發生錯誤了:", err);
//       return;
//     }
//     console.log(data);
//     doWork("寫功課", 3000, function (err, data) {
//       if (err) {
//         console.error("發生錯誤了:", err);
//         return;
//       }
//       console.log(data);
//     });
//   });
// });
