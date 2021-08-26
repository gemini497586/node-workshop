const fs = require("fs");

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

module.exports = { readStockCode };
