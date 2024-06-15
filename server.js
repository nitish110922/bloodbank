const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
//dot config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));



//routes
// app.use((req, res, next) => {
//   console.log(`Request Headers:', ${req.headers['authorization']}`.bgGreen);
//   next();
// });
app.use((req, res, next) => {
  res.send("hello");
  next();
});
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

//port
const PORT = process.env.PORT || 4000;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In  ModeOn Port ${process.env.PORT}`
    
      
  );
});

