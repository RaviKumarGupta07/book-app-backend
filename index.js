const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")

const port = process.env.PORT || 5000;
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://book-store-frontend-three-tau.vercel.app'],
  credentials: true
}))

const bookRoutes = require("./src/books/book.route")
const orderRoutes = require("./src/orders/order.route")
const userRoutes = require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")
app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use("/", (req, res) => {
    res.send("Book Store Server is Running");
  });

  setInterval(() => {
    mongoose.connection.db.admin().ping().catch(() => { });
  }, 600000);
}

main()
  .then(() => console.log("mongo db connected succesfully"))
  .catch((err) => console.log(err));


app.listen(port, () => {
  console.log(`Example app listening on ${port}`);
});
