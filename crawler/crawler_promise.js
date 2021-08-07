// let dt = new Date
// let year = dt.getFullYear();
// let month = dt.getMonth()+1;
// let day = dt.getDate();
// console.log(`${year}${month}${day}`);
// 輸出：202187

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

let stockCode = "";
fs.readFile("stock.txt", "utf8", (error, stockCode) => {
  axios
    .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        // date: '20210807',
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
});