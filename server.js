const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./config/dbConnection");
const dotenv = require("dotenv").config();

dbConnection();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", require("./routes/contactRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
