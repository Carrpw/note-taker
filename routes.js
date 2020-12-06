// Routes for the api notes page to get the notes, push the notes to be stored, and delete the notes
const fs = require("fs");
let constant = JSON.parse(fs.readFileSync("./db.json", "utf8"));
const path = require("path");

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(constant);
    });
    app.get("/api/notes:id", function(req, res) {
        res.json(constant[Number(req.params.id)]);
    });
    app.post("/api/notes", function(req, res) {
        let Note = req.body;
        let info = (constant.length).toString();
        Note.id = info;
        constant.push(Note);
        fs.writeFileSync("./db.json", JSON.stringify(constant));
        res.json(constant);
    });
    app.delete("/api/notes/:id", function(req,res) {
        let Note = req.params.id;
        let info = 0;
        constant = constant.filter(newNote => {
            return newNote.id != Note;
        });
        for (newNote of constant) {
            newNote.id = info.toString();
            info++;
        };
        fs.writeFileSync("./db.json", JSON.stringify(constant));
        res.json(constant);
    });

    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "/notes.html"));
    });
    
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "/index.html"));
    });
    
};