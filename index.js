const { response } = require("express");
var express = require("express");
var app = express();

app.get('', (req, res) =>{
  res.send("This is weather app")

});

app.get('/weather', (req, res) =>{
  res.send("This is weather end point")

});

app.get("*", (req, res) =>{
  res.send("Page not found")

});
app.listen(app.get("port"), function(){
    console.log("listening for connection on port: ", app.get("port"));

});
app.get('/', function(request, response) {
  response.render('pages/index');
});

