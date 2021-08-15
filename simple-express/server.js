const express = require("express");

let app = express();

app.get("/", function (request, response, next) {
  response.send("hello");
});

app.listen(3000, function () {
  console.log("我們的web server 啟動了~~~");
});
