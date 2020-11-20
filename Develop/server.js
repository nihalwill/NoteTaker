const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT  = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "public"));
app.use(express.static("./"));


require("./routes/api")(app);
require("./routes/html")(app);

app.listen(PORT, function() {
    console.log(`Testing server on Port: ${PORT}`);
});
