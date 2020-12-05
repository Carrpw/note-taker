// Allows express to work with the front, path for filename paths, fs to read & write files
const express = require("express");
const fs = require("fs");
const path = require("path");


// Sets up express and the where the port is
const app = express();
const PORT = process.env.PORT || 3000;


// Empty array for user notes
let notes = [];


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname)));


// 
app.get("/api/notes", function(req, res) {
    notes = fs.readFileSync("db.json", "utf8");
    notes = JSON.parse(notes);
    res.json(notes);
});

app.post("/api/notes", function(req, res) {
    notes = fs.readFileSync("db.json", "utf8");
    notes = JSON.parse(notes);
    req.body.id = notes.length;
    notes.push(req.body);
    notes = JSON.stringify(notes);
    fs.writeFile("db.json", notes, "utf8");
    res.json(JSON.parse(notes)); 
});

app.delete("/api/notes/:id", function(req, res) {
    notes = fs.readFileSync("db.json", "utf8");
    notes = JSON.parse(notes);
    notes = notes.filter(function(note) {
        return note.id != req.params.id;
    });
    notes = JSON.stringify(notes);
    fs.writeFile("db.json", notes, "utf8");
    res.send(JSON.parse(notes));
});


// Routes to transfer users with the home being defaulted to if an incorrect route it written
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "db.json"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});


// Lets the server listen
app.listen(PORT, function() {
    console.log("Server is listening on PORT " + PORT)
})