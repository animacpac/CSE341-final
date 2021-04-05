if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express');
const app = express();
const hbs = require("hbs");
const path = require("path");
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config');


initializePassport(
 passport,
 email => user.find(user => user.email === email),
 id => user.find(user => user.id === id)
 )
const users = []

const port = process.env.PORT || 3000



const newLocal = './utils/weatherData';
const weatherData = require(newLocal);



const publicStaticDirPath = path.join(__dirname, './public');

const viewsPath = path.join(__dirname, './views/pages');

const partialsPath = path.join(__dirname, './views/partials');



app.set('view engine', 'hbs', 'html');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));
app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('', (req, res) => {
  res.render('index', { 
    //name: req.user.name,
    title: 'Weather App'
  })
})

app.get('/weather', (req, res) => {

  const address = req.query.address
  if (!address) {

    return res.send({
      error: "You must enter address in search field"
    })
  }
  weatherData(address, (error, { temperature, description, cityName }) => {
    if (error) {
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

app.get('/About', (req, res) => {
  res.render('about')
});

app.get('/Login', (req, res) => {
  res.render('login')
});

app.get('/Register', (req, res) => {
  res.render('register')
});
app.post('/Register',  async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
     name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/Login')
  }
  catch{
    res.redirect('/Register')
  }
})
app.post('/Login', passport.authenticate('local', {
  successRedirect: '/', 
  failureRedirect: '/Login',
  failureFlash: true
}) )

app.delete('/Logout', (req, res) => {
  req.logOut()
  req.redirect('/Login')
});

app.get('/Goals', (req, res) => {
  res.render('goal')
});

app.get('/Instructions', (req, res) => {
  res.render('instructions')
});

app.get('/Manage', (req, res) => {
  res.render('manage')
});

app.get('/Index', (req, res) => {
  res.render('index')
});

app.get("*", (req, res) => {
  res.send("Page not found")

});

app.listen(port, () => {
  console.log("Server is working on port:", port);
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/Login')
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }

  
}





