const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

//view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//body parser Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/',(req,res) => {
  res.render('contact');
})

app.post('/send', (req,res) => {
  const output = `<p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
  <li>Name: ${req.body.name}</li>
  <li>Name: ${req.body.company}</li>
  <li>Name: ${req.body.name}</li>
  <li>Name: ${req.body.name}</li>
  `
})

app.listen(3001, () => console.log('server started'))
