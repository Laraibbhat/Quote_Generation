const { randomInt } = require("crypto");

const express = require("express");
const connectDB = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

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

/**
 * @swagger
 * components:
 *  schemas:
 *    Quote:
 *      type: object
 *      required:
 *        - text
 *        - author
 *      properties:
 *        id:
 *          type: integer
 *          description: Auto Generated ID
 *          example: 1234
 *        text:
 *          type: string
 *          description: The Text Of the Quote
 *          example: Quote of the day
 *        author:
 *          type: string
 *          description: The Name of the AUthor
 *          example: Laraib Mushtaq
 *
 */
/**
 * @swagger
 * tags:
 *  name: Quotes
 *  description: Managing All Quotes
 */

/**
 *
 * @swagger
 * /:
 *  get:
 *    summary: Returns the list of all the quotes
 *    tags: [Quotes]
 *    responses:
 *      200:
 *        description: The List of the books
 *        content:
 *          application/json:
 *            schema:
 *            type: array
 */

router.get("/", authMiddleware, async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM quote");
    res.status(200).json(results);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

/**
 * @swagger
 * /:
 *  post:
 *    summary: You can add new quote.
 *    tags: [Quotes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - text
 *              - author
 *            properties:
 *              text:
 *                type: string
 *                description:
 *                  The text of the quote
 *              author:
 *                type: string
 *                description: Name of the Author
 *    responses:
 *      200:
 *        description: Added the quote Succesfully
 *        content:
 *          application/json
 *      500:
 *        description: Some server error
 */
router.post("/", async (req, res) => {
  console.log("The body is", req.body);
  const { text, author } = req.body;
  const query = "INSERT INTO quote VALUES (?,?,?)";
  const id = randomInt(1, 10000000);
  try {
    const results = await db.query(query, [id, text, author]);
    console.log("The Result is", results);
    res.status(200).json({ message: "User Added succesfully" });
  } catch (error) {
    res.status(500).json({ mesage: error });
  }
});

/**
 * @swagger
 * /{id}:
 *  put:
 *    summary: We Can Update the Quote based on the id
 *    tags: [Quotes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Quote ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - text
 *              - author
 *            properties:
 *              text:
 *                type: string
 *                description: The Updated Quote
 *              author:
 *                type: string
 *                description: The Updated Name of the author
 *    responses:
 *        200:
 *          description: Updated the quote succesfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1234
 *                  text:
 *                    type: string
 *                    example: Hello
 *                  author:
 *                    type: string
 *                    example: Sadiya
 *
 *
 */
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { text, author } = req.body;

  if (!text || !author) {
    return res.status(400).json({ message: "Text and author are reqyired !" });
  }

  const query = "UPDATE quote SET text=? , author=? WHERE id = ?";

  try {
    const [result] = await db.query(query, [text, author, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Quote Not Found!!" });
    }
    res.status(200).json({ id, text, author });
  } catch (error) {
    console.error("Database Update Error:", error);
    res.status(500).json({ message: "Database update failed" });
  }
});

/**
 * @swagger
 * /{id}:
 *  get:
 *    summary: Get you the quote based on the id.
 *    tags: [Quotes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Quote id
 *    responses:
 *      200:
 *        description: Specific quote based on id.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *      404:
 *        description: No Book with this id
 *
 */
router.get("/:id", async (req, res) => {
  console.log("hiii", req.params.id);
  try {
    const id = req.params.id;
    const [results] = await db.query(`SELECT * FROM quote where id = ${id}`);
    if (results && Array.isArray(results) && results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

module.exports = router;
