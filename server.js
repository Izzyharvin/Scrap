var express = require("express");
// var exphdbrs = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static("public"));

// Connect to Mongo DB
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);

console.log("\n***********************************\n" +
    "Scrapping from Crunchyroll:" +
"\n***********************************\n");

// app.get("/scrape", function (req, res) {
    axios.get("https://www.crunchyroll.com/").then(function (response) {
        var $ = cheerio.load(response.data);

        $("li.clearfix").each(function (i, element) {
            var results = {};

            result.title = $(element).text();
            result.link = $(element).children("a").attr("href");

            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                title: title,
                link: link
            });
        });

        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
    });
// })
