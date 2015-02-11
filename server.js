var vectorouter = require('./vectorouter');

var app = vectorouter();

//mounting middleware to just a specific URL
app.use("/", function (req, res, next) {
    res.write("Written at just / via middleware 1, ");
    next();
});

//mounting middleware everywhere aka execute always
app.use(function (req, res, next) {
    res.write("Written everywhere via middleware 2, ");
    next();
});


//mounting different methods to same URL, classifying based on the http verbs

//This one demonstrates chaining as well
app.get("/", function (req, res, next) {
    res.write("Get @ / request and ");
    next();
}, function (req, res, next) {
    res.end("Chaining works at / for get request");
});


app.put("/", function (req, res) {
    res.end("Put @ / request");
});
app.post("/", function (req, res) {
    res.end("Post @ / request");
});
app.del("/", function (req, res) {
    res.end("Delete @ / request");
});

//mounting different URLs to different http verbs
app.get("/get", function (req, res) {
    res.end("Get request");
});
app.put("/put", function (req, res) {
    res.end("Put request");
});
app.post("/post", function (req, res) {
    res.end("Post request");
});
app.del("/delete", function (req, res) {
    res.end("Delete request");
});


app.listen(8080);


//exporting for the test case
module.exports = app;
