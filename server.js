const express = require("express");
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

const app = express();

// custom middleware logger
app.use(logger);

const whitelist = [
  "http://www.google.com",
  "http://localhost:3500",
  "http://www.youtube.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middlewars to handel url-encoded data
//for ex: form data
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// Serve static files
// for ex: css
app.use(express.static(path.join(__dirname, "/public")));

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

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepted("json")) {
    res.json({ error: "404 Page Not Found" });
  } else {
    res.type("txt").send("404 Page Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
