const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;



app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"));
});





app.get("/api/notes", function(req, res) {
    return res.json(activeNote);
});

app.post("/api/notes", function(req, res) {
    return res.json(activeNote);
});

app.delete("/api/notes/:id", function(req, res) {
    return res.json(activeNote);
});

app.listen(PORT, function() {
    console.log("Server is listening on PORT " + PORT)
})