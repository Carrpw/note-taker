const fs = require("fs");
let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(data);
    });
    app.get("/api/notes:id", function(req, res) {
        res.json(data[Number(req.params.id)]);
    });
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        newNote.id = uniqueId;
        data.push(newNote);
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);
        });
        res.json(data);
    });
    app.delete("/api/notes/:id", function(req,res) {
        let noteID = req.params.id;
        let newId = 0;
        console.log(`Deleting note with id ${noteID}`);
        data = data.filter(currentNote => {
            return currentNote.id !=noteID;
        });
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        };
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    });
};