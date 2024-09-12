const express = require("express");

const app = express();

const auth = require("./routes/auth");
const admin = require("./routes/admin");
const groups = require("./routes/groups");
const messages = require("./routes/messages");

app.use("/auth", auth);
app.use("/admin", admin);
app.use("/group", groups);
app.use("/messages", messages);

module.exports = app;
