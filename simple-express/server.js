const express = require("express");
const db = require("./utils/db");
const stock = require("./utils/stock");
const twse = require("./utils/twse");

let app = express();

//處理cors問題 要放在所有路由、中間件前面
const cors = require("cors");
app.use(cors());

app.use((request, response, next) => {
  console.log("第１個中間件：點餐～～吃早餐了");
  next();
});

app.use((request, response, next) => {
  console.log("第２個中間件：快樂早餐時光");
  next();
});

app.use((request, response, next) => {
  console.log("第３個中間件：午餐吃什麼？");
  next();
});

app.listen(3000, () => {
  console.log("我們的web server 啟動了~~~");
});

app.get("/", (request, response, next) => {
  response.send("hello world 致敬一下經典");
});

app.get("/about", (request, response, next) => {
  response.send("關於我們~~~~~~~~~~~~");
});

app.get("/stock", async (request, response, next) => {
  let stockCode = await stock.readStockCode();
  response.json(stockCode);
});

app.get("/stock/:stockCode", async (request, response, next) => {
  let stockCode = await stock.readStockCode();
  let result = await twse.getStockData(stockCode);

  if (request.params.stockCode !== stockCode) {
    return response.send(`沒有提供這個股票代碼: ${request.params.stockCode}`);
    // 在股票代碼不對的情況下，該怎麼送到下面的use
  }
  response.json(result);
});

app.use((request, response, next) => {
  response.status(404);
  response.send("Not Found");
});