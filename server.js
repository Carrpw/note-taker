
const express = require("express");
const path = require("path");

// Create server application at port 3000
const app = express();
const PORT = process.env.PORT || 3000;

// Read URL or JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Include js files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Add listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});