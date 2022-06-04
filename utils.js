const fs = require("fs");

function getUrls() {
  const urls = fs.readFileSync("./urls.json", { encoding: "utf-8" });

  return JSON.parse(urls);
}

function addUrls(url) {
  const urls = getUrls();
  const allUrls = [...urls, url];

  fs.writeFileSync("./urls.json", JSON.stringify(allUrls), {
    encoding: "utf-8",
  });

  return 1;
}

function increaseVisits(shortUrl) {
  const urls = getUrls();
  const newUrls = urls.map((url) => {
    if (url.shortUrl == shortUrl) {
      url.visits++;
      console.log(url);
    }

    return url;
  });

  fs.writeFileSync("./urls.json", JSON.stringify(newUrls), {
    encoding: "utf-8",
  });
}

module.exports = {
  addUrls,
  getUrls,
  increaseVisits,
};
