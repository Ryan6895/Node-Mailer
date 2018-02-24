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
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('contact');
})

app.post('/send', (req, res) => {
      const output = `<p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
  <li>Name: ${req.body.name}</li>
  <li>Company: ${req.body.company}</li>
  <li>Email: ${req.body.email}</li>
  <li>Phone: ${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;

      nodemailer.createTestAccount((err, account) => {

          let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: account.user, // generated ethereal user
              pass: account.pass // generated ethereal password
            }
            ,tls: {
              rejectunauthorized: false
            }
          });

          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Nodemailer Contact" <foo@example.com>', // sender address
            to: 'Rymaster95@gmail.com', // list of receivers
            subject: 'Hello There', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.render('contact', {msg:'email has been sent'})
          });
        })
      });

    app.listen(3001, () => console.log('server started'))
