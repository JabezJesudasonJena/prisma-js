const express = require("express");
const route = require("./routes/a.js")
const authrouter = require("./routes/auth.js")

const app = express();

app.use(express.json())

app.use("/api", route)

app.use("/auth",authrouter)

app.listen(3000, () => {console.log("Server started at http://localhost:3000/")});