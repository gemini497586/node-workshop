const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  port: "3306",
  password: "666666",
  database: "stock",
});

connection.connect((err) => {
  if (err) {
    console.error(err);
  }
});
// npm mysql套件語法，如果不關閉，node.js會覺得程式碼還沒執行完畢。
connection.end();

// 版本一 async / await 跟 Promise 分開寫
// function resultPromise() {
//   return new Promise((resolve, reject) => {
//     fs.readFile("stock.txt", "utf8", (error, stockCode) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(stockCode);
//       }
//     });
//   });
// }
// function resultAxios(stockCode) {
//   return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//     params: {
//       response: "json",
//       date: moment().format("YYYYMMDD"),
//       stockNo: stockCode,
//     },
//   });
// }

// (async function () {
//   try {
//     let stockCode = await resultPromise();
//     let response = await resultAxios(stockCode);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// })();
