const express = require("express");
const connectDB = require("../db");
const { randomInt } = require("crypto");

const router = express.Router();

// Connect to the database
let db;
connectDB()
  .then((pool) => {
    db = pool;
    // console.log("The DB is", db);
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM quote");
    res.status(200).json(results);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

router.post("/", async (req, res) => {
  console.log("The body is", req.body);
  const { text, author } = req.body;
  const query = "INSERT INTO quote VALUES (?,?,?)";
  const id = randomInt(1, 10000000);
  try {
    const results = await db.query(query, [id, text, author]);
    console.log("The Result is", results);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ mesage: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [results] = await db.query(`SELECT * FROM quote where id = ${id}`);
    res.status(200).json(results);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

module.exports = router;
