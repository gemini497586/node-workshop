const express = require("express");

let app = express();

app.use((req, res, next) => {
  console.log("點餐～～吃早餐了");
  next();
});

app.use((req, res, next) => {
  console.log("快樂早餐時光");
  next();
});

app.use((req, res, next) => {
  console.log("午餐吃什麼？");
  next();
});

app.get("/", function (request, response, next) {
  response.send("hello");
});

app.get("/about", (request, response, next) => {
  response.send("關於我們~~~~~~~~~~~~");
});

app.listen(3000, function () {
  console.log("我們的web server 啟動了~~~");
});
