const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const memos = [];

app.use(bodyParser.json());

app.get("/api/memos", (req, res) => {
  res.send(memos);
});

app.post("/api/memos", (req, res) => {
  // console.log(req.body);
  memos.push(req.body.content);
  res.send(memos);
});

app.put("/api/memos/:index", (req, res) => {
  console.log(req.params.index);
  console.log(req.body);
  memos[req.params.index] = req.body.content;
  res.send(memos);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 백엔드는 내용이 바뀌면 재시작을 해줘야 한다.
