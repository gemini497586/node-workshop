const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) {
    console.error(error);
  }
});

let stockCode = "";
function checkStockCode() {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM stock WHERE stock_id = ?",
      [stockCode],
      function (error, result, fields) {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
}

function resultPromise(checkedStockCode) {
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

function resultAxios(stockNo) {
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: moment().format("YYYYMMDD"),
      stockNo: stockNo,
    },
  });
}

(async function () {
  try {
    let checkedStockCode = await checkStockCode();
    let stockNo = await resultPromise(checkedStockCode);
    let response = await resultAxios(stockNo);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    // npm mysql套件語法，如果不關閉，node.js會覺得程式碼還沒執行完畢。
    connection.end();
  }
})();
