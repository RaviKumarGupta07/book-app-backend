const express = require("express");
const Order = require("./order.model")
const router = express.Router();
const {createAOrder, getOrderByEmail} = require("./order.controller")

// post a book

// create order endpoint
router.post("/",createAOrder)

// get order by user email
router.get("/email/:email", getOrderByEmail)

module.exports = router 