// 本次目標：玩callback hell
// 模擬非同步工作 doWork function
// 做事情順序：開始工作 -> 刷牙(3s) -> 吃早餐(5s) -> 寫功課(3s)

// ;(function () {
let doWork = function (job, timer, cb) {
  setTimeout(() => {
    let dt = new Date();
    // callback 慣用設計
    // 第一個參數：error
    // 第二個參數：要回覆的資料
    cb(null, `完成工作：${job} at ${dt.toISOString()}`);
  }, timer);
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

// 解決: 接續做的工作
// ---> 動作如果要接續著做，只能把下一個動作放在上一個動作的 callback
//   --> callback hell

// return 可以幫助程式碼相對好閱讀
doWork("刷牙", 3000, function (err, data) {
  if (err) {
    console.error("發生錯誤了:", err);
    return;
  }
  console.log(data);
  doWork("吃早餐", 5000, function (err, data) {
    if (err) {
      console.error("發生錯誤了:", err);
      return;
    }
    console.log(data);
    doWork("寫功課", 3000, function (err, data) {
      if (err) {
        console.error("發生錯誤了:", err);
        return;
      }
      console.log(data);
    });
  });
});

// if else 太多層會很難閱讀
// doWork("刷牙", 3000, function (err, data) {
//   if (err) {
//     console.error("發生錯誤了:", err);
//   } else {
//     console.log(data);
//     doWork("吃早餐", 5000, function (err, data) {
//       if (err) {
//         console.error("發生錯誤了:", err);
//       } else {
//         console.log(data);
//         doWork("寫功課", 3000, function (err, data) {
//           if (err) {
//             console.error("發生錯誤了:", err);
//           } else {
//             console.log(data);
//           }
//         });
//       }
//     });
//   }
// });

// 如果不包起來，會沒辦法按照順序的做事情
// doWork("刷牙", 3000, function (err, data) {
//   if (err) {
//     console.error("發生錯誤了:", err);
//     return;
//   }
//   console.log(data);
// });

// doWork("吃早餐", 5000, function (err, data) {
//   if (err) {
//     console.error("發生錯誤了:", err);
//     return;
//   }
//   console.log(data);
// });

// doWork("寫功課", 3000, function (err, data) {
//   if (err) {
//     console.error("發生錯誤了:", err);
//     return;
//   }
//   console.log(data);
// });
// })();
