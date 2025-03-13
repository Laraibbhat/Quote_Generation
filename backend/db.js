const mysql = require("mysql2");

let connectionPool;
async function connectDB() {
  if (!connectionPool) {
    try {
      connectionPool = mysql
        .createPool({
          host: "localhost",
          user: "laraib",
          password: "Laraib9241",
          database: "quote_db",
        })
        .promise();
      console.log("Connected to the database !!");
      return connectionPool;
    } catch (error) {
      console.log(`Connection Error ${error.message}`);
    }
  }
  return connectionPool;
}

module.exports = connectDB;
