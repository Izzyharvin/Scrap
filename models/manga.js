var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var MangaSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    }
});


var Manga = mongoose.model("Manga", MangaSchema);

module.exports = Manga;
