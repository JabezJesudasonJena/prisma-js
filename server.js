const express = require("express");
const route = require("./routes/a.js")

const app = express();

app.use(express.json())

app.use("/api", route)

app.listen(3000, () => {console.log("Server started at http://localhost:3000/")});