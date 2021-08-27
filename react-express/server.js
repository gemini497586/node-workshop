const express = require("express");
const connection = require("./utils/db");
// let port = process.env.DB_PORT;
let app = express();

const cors = require("cors");
const pool = require("./utils/db");
app.use(cors());

app.listen(3001, () => {
  console.log("我們的web server 啟動了~~~");
});

app.get("/", (req, res, next) => {
  res.send("hello react-express");
});

app.get("/test", async (req, res, next) => {
  let result = {
    name: "abcdd",
    id: 01,
    price: 1302,
  };
  res.json(result);
});

app.get("/stock", (req, res, next) => {
  let sql = "SELECT * FROM stock";
  pool.query(sql, (err, result, fields) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get("/stock/:stockId", function (req, res, next) {
  let sql = "SELECT * FROM stock_price Where stock_id = ?";
  pool.query(sql, [req.params.stockId], (err, result, fields) => {
    if (err) throw err;
    res.json(result);
  });
});

app.use((req, res, next) => {
  res.status(404);
  res.send("Not Found");
});
