const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

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
function resultAxios(stockCode) {
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: moment().format("YYYYMMDD"),
      stockNo: stockCode,
    },
  });
}

(async function () {
  try {
    let stockCode = await resultPromise();
    let response = await resultAxios(stockCode);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
})();
