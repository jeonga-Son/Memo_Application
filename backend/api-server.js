const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const database = require("./database");

const memos = [];

app.use(bodyParser.json());

app.get("/api/memos", async (req, res) => {
  const result = await database.run("select * from memos");
  res.send(result);
});

app.post("/api/memos", async (req, res) => {
  await database.run(
    `insert into memos (content) values ('${req.body.content}') `
  );
  const result = await database.run("select * from memos");
  res.send(result);
});

app.put("/api/memos/:id", async (req, res) => {
  await database.run(
    `update memos set content = '${req.body.content}' where id = ${req.params.id} `
  );
  const result = await database.run("select * from memos");
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 백엔드는 내용이 바뀌면 재시작을 해줘야 한다.
