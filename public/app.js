$.getJSON("/manga", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#showdisplay").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "</p><img src='"+ data[i].imgSrc + "'>");
    }
});

