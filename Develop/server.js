const fs = require("fs");
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`APP now on port ${PORT}`);
});
