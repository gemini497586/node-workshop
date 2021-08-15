const express = require("express");

let app = express();

app.get("/", function (request, response, next) {
  response.send("hello");
});

app.get("/about", (request, response, next) => {
  response.send("關於我們~~~~~~~~~~~~");
});

app.listen(3000, function () {
  console.log("我們的web server 啟動了~~~");
});