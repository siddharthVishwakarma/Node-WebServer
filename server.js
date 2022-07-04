const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3500;

const app = express();

app.get("^/$|index(.html)?", (req, res) => {
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

// showing err
app.get("/old-page(.html)?", (req, res) => {
  res.status(301).redirect("/new-page.html");
});

// Route Handelers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attemt to load hello page");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
