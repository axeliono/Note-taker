const fs = require("fs");
const data = require("../db/db.json");

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, notes) => {
      if (err) throw err;
      let parsed;
      try {
        parsed = [].concat(JSON.parse(notes));
      } catch (err) {
        parsed = [];
      }

      res.json(parsed);
    });
  });

  app.post("/api/notes", (req, res) => {
    console.log(data, "new note being added", req.body);
    fs.readFile("./db/db.json", "utf-8", (err, resp) => {
      let allNotes = JSON.parse(resp);

      var recentNote = allNotes[allNotes.length - 1].id;
      recentNote = recentNote + 1;

      const createdNote = { ...req.body, id: recentNote };
      allNotes.push(createdNote);
      fs.writeFile("./db/db.json", JSON.stringify(allNotes), (err) => {
        if (err) throw err;
        res.json(allNotes);
      });
    });
  });

  app.delete("/api/notes/:id", (req, result) => {
    let noteId = req.params.id;

    fs.readFile("./db/db.json", "utf-8", (err, response) => {
      if (err) throw err;
      const allNotes = JSON.parse(response);
      const newNotes = allNotes.filter((note) => note.id != noteId);
      fs.writeFile("./db/db.json", JSON.stringify(newNotes, null, 2), (err) => {
        if (err) throw err;
        result.json(true);
        console.log("Notes have been deleted!");
      });
    });
  });
};
