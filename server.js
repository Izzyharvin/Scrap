var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


var cheerio = require("cheerio");
var axios = require("axios");


var db = require("./models");

var PORT = 3000;

var app = express();


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Connect to Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/manga";

mongoose.connect(MONGODB_URI);


console.log("\n***********************************\n" +
    "Scrapping from Crunchyroll:" +
"\n***********************************\n");

app.get("/scrape", function (req, res) {
    axios.get("https://www.crunchyroll.com/comics/manga").then(function (response) {
        var $ = cheerio.load(response.data);

        // console.log($(".portrait-element").children(".series-title").text())

        $(".portrait-element").each(function (i, element) {
            var result = {};

            result.title = $(this)
            .children(".series-title")
            .text();
            result.link = "https://www.crunchyroll.com" + $(this)
            .attr("href");
            result.imgSrc = $(this)
            .find($(".portrait"))
            .attr("src")

            db.Manga.create(result)
              .then(function (dbManga) {
                  console.log(dbManga);
              })
              .catch(function(err) {
                  console.log(err);
              });
        });

        res.send("Scrape Complete");
    });
});

app.get("/manga", function(req, res) {
    db.Manga.find({})
      .then(function (dbManga) {
          res.json(dbManga);
      })
      .catch(function (err) {
          res.json(err);
      });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});