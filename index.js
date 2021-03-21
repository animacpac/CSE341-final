const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

const port = process.env.PORT || 8080

const publicStaticDirPath = path.join(__dirname, '/public')

const viewsPath = path.join(__dirname, '/views/page');

const partialsPath = path.join(__dirname, '/views/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));


app.get('', (req, res) =>{
  res.send("This is weather app");

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

