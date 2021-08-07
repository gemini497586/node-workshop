const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
let stockCode = "";

// 版本一 async / await 跟 Promise 分開寫
function resultPromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (error, stockCode) => {
      if (error) {
        reject(error);
      } else {
        resolve(stockCode);
      }
    });
  });
}

(async function runAxios() {
  stockCode = await resultPromise();
  axios
    .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: stockCode,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
})();
