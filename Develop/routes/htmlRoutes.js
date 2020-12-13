const path = require("path");

module.exports = (app) => {
  app.use("*.js", (req, res, next) => {
    res.set("Content-Type", "text/javascript");
    next();
  });
  app.get("/notes/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get("/assets/js/index.js", (req, res) => {
    res.sendfile(path.join(__dirname, "../public/assets/js/index.js"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
