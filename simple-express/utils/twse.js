const moment = require("moment");
const axios = require("axios");

async function getStockData(stockCode) {
  let stockInfo = await axios.get(
    "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
    {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: stockCode,
      },
    }
  );

  let stockData = stockInfo.data;

  let insertData = stockData.data.map((item) => {
    item = item.map((value) => {
      return value.replace(/,/g, "");
    });
    item[0] = (parseInt(item[0].replace(/\//g, "")) + 19110000).toString();
    item.unshift(stockCode);
    return item;
  });
  return insertData;
}

module.exports = { getStockData };
