const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemActions module for handling item-related operations
const itemActions = require("./controllers/itemActions");

// Route to get a list of items
router.get("/items", itemActions.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemActions.read);

// Route to add a new item
router.post("/items", itemActions.add);

/* ************************************************************************* */

module.exports = router;
