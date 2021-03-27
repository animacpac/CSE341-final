const express = require('express');
const app = express();
const hbs = require("hbs");
const path = require("path");

const port = process.env.PORT || 3000



const newLocal = './utils/weatherData';
const weatherData = require(newLocal);



const publicStaticDirPath = path.join(__dirname, './public');

const viewsPath = path.join(__dirname, './views/pages');

const partialsPath = path.join(__dirname, './views/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) => {
  res.render('index', {
      title: 'Weather App'
  })
})

app.get('/weather', (req, res) =>{
  const address = req.query.address
  if(!address){
    
    return res.send({
      error: "You must enter address in search field"
    })
  }  
  weatherData(address, (error, {temperature, description, cityName}) => {
    if(error) {
      return res.send({
        error: error
      })
    }

    console.log(temperature, description, cityName);
    res.send({
      temperature, description, cityName
    })
  });

});

app.get('/About',(req, res) =>{
res.redirect('./views/pages/about.hbs')
});

app.get("*", (req, res) =>{
  res.send("Page not found")

});

app.listen(port, () => {
    console.log("Server is working on port:", port);
})






