$.getJSON("/manga", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#showdisplay").append("<a href='" + data[i].link + "'><p data-id='" + data[i]._id + "'>" + data[i].title + "<img src='" + data[i].imgSrc + "'></p></a>");
    }
});

