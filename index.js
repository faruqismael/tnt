const express = require("express");
const shortid = require("shortid");

const { getUrls, addUrls, increaseVisits } = require("./utils");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index", { urls: getUrls() });
});

app.get("/new", function (req, res) {
  res.render("new");
});

app.post("/new", function (req, res) {
  const longUrl = req.body.longUrl;
  const name = req.body.name;
  const shortUrl = shortid();
  const url = { longUrl, name, shortUrl, visits: 0 };

  addUrls(url);

  res.redirect("/");
});

app.get("/:shortUrl", function (req, res) {
  const shortUrl = req.params.shortUrl;
  const urls = getUrls();

  const url = urls.find((url) => url.shortUrl == shortUrl);

  if (url?.longUrl) {
    increaseVisits(url.shortUrl);
    res.redirect(url.longUrl);
  } else res.redirect("/");
});

app.listen(2000, function () {
  console.log("server started on port 2000");
});
