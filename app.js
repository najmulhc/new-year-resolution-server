const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(cors());
app.use(express.json())

//getting data from database
const data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "utf-8"));

app.get("/api/v1/", (req, res) => {
  res.status(200).json({
    status: "success",
    data,
  });
});

app.post("/api/v1", (req, res) => {
  const colors = [
    "#300449",
    "#e66a1f",
    "#fdd02b",
    "#e42a69",
    "#3cb64f",
  ];
  const newResolution = req.body;
  data.push({...newResolution, color: colors[Math.ceil(Math.random()*5)]});
  const stringyFied  = JSON.stringify(data)
  fs.writeFile(`${__dirname}/data.json`, stringyFied, 'utf-8', err => {
    console.error(err)
  })
  res.status(200).json({
    status: "success",
    data,
  });
});

// for server functionality!
const port = 3020;
app.listen(port, () => {
  console.log("server is running", port);
});
