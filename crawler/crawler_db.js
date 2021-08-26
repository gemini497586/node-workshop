// 需求：
// 1. 讀 stock.txt 把股票代碼讀進來
// 2. 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
// 3. 如果是，才去證交所抓資料
// 4. 抓回來的資料存到資料庫的 stock_price 表格裡去

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();

let connection = mysql.createConnection({
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

function readStockCode() {
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

function validStockCode(stockCode) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM stock WHERE stock_id = ?",
      [stockCode],
      function (error, result, fields) {
        if (error) {
          reject(error);
        }
        if (result.length === 0) {
          reject("資料庫查無此股票代碼!");
        }
        resolve(result);
      }
    );
  });
}

function queryStockInfo(stockNo) {
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: moment().format("YYYYMMDD"),
      stockNo: stockNo,
    },
  });
}

// function praparedDataFunc(twseData, stockCode) {
//   return new Promise((resolve, reject) => {
//     twseData.data.map((data) => {
//       console.log("in Promise", data);
//       data = data.map((value) => {
//         return value.replace(/,/g, "");
//       });
//       data[0] = parseInt(data[0].replace(/\//g, ""), 10) + 19110000;
//       data.unshift(stockCode);
//       console.log("before resolve", data);
//       resolve(data);
//     });
//   });
// }

function insertPraparedData(praparedData) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
      [praparedData],
      function (error, result, fields) {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
}

(async function () {
  try {
    // 1. 讀 stock.txt 把股票代碼讀進來
    // 2. 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
    // 3. 如果是，才去證交所抓資料
    // 4. 抓回來的資料存到資料庫的 stock_price 表格裡去
    //    抓到正常資料，整理資料格式，存入資料庫

    let stockCode = await readStockCode();
    let dbResult = await validStockCode(stockCode);
    let response = await queryStockInfo(stockCode);
    const twseData = response.data;
    if (twseData.stat !== "OK") {
      throw "證交所資料有誤，請再試一次～";
    }
    let praparedData = twseData.data.map((data) => {
      data = data.map((value) => {
        return value.replace(/,/g, "");
      });
      data[0] = parseInt(data[0].replace(/\//g, ""), 10) + 19110000;
      data.unshift(stockCode);
      return data;
    });
    // console.log(praparedData);
    let insertResult = await insertPraparedData(praparedData);
    console.log(insertResult);
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
})();

// (async function () {
//   try {
//     // 1. 讀 stock.txt 把股票代碼讀進來
//     // 2. 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
//     // 3. 如果是，才去證交所抓資料
//     // 4. 抓回來的資料存到資料庫的 stock_price 表格裡去
//     //    抓到正常資料，整理資料格式，存入資料庫

//     let stockCode = await readStockCode();
//     let dbResult = await validStockCode(stockCode);
//     let response = await queryStockInfo(stockCode);
//     const twseData = response.data;
//     if (twseData.stat !== "OK") {
//       throw "證交所資料有誤，請再試一次～";
//     }
//     let praparedData = await praparedDataFunc(twseData, stockCode);
//     console.log(praparedData);

//     let insertResult = await insertPraparedData(praparedData);
//     console.log(insertResult);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     connection.end();
//   }
// })();
