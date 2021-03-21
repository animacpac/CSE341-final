const { response } = require("express");
var express = require("express");
var app = express();


app.set("port", (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get("port"), function(){
    console.log("listening for connection on port: ", app.get("port"));

});
app.get('/', function(request, response) {
  response.render('pages/index');
});

