const express = require("express");
const path = require("path");
const hbs = require("hbs");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../uploads");
  },
  filename: function (req, file, cb) {
    let ext;
    if (file.mimetype === "application/pdf") {
      ext = ".pdf";
    }
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

var upload = multer({ storage: storage });

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    preflightContinue: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    origin: true,
  })
);

const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index");
});

app.options("/fileuploads", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

app.post("/fileupload", upload.single("file"), (req, res) => {
  console.log(req.file.filename);
  console.log(__dirname);
  const fileDir = path.join(__dirname, `../uploads/${req.file.filename}`);
  fs.readFile(fileDir, function (err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
  // res.send({ msg: "uploaded!" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`server is up at port ${port}`);
});
