// let dt = new Date
// let year = dt.getFullYear();
// let month = dt.getMonth()+1;
// let day = dt.getDate();
// console.log(`${year}${month}${day}`);
// 輸出：202187

const axios = require("axios");
const moment = require("moment");

axios
  .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      // date: '20210807',
      date: moment().format("YYYYMMDD"),
      stockNo: "2330",
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
