const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  connectionLimit: 5,
  database: "memo",
});

module.exports = {
  async run(query, params) {
    return new Promise((resolve) => {
      pool
        .getConnection()
        .then((conn) => {
          conn
            .query(query, params)
            .then((rows) => {
              resolve(rows);
            })
            .catch((err) => {
              console.log(err);
              conn.end();
            });
        })
        .catch((err) => {
          //not connected
        });
    });
  },
};
