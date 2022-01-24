const app = express();
var favicon = require('serve-favicon');
const i18n = require('i18n-express');
const multiparty = require("multiparty");
const nodemailer = require('nodemailer');
const path = require('path');

const express = require('express');
const mailer = process.env.MAILHOST || 'localhost';
const port = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
  host: mailer, //replace with your email provider
  port: 25,
   tls: {
     rejectUnauthorized: false // TODO: maybe remove in prod?
   }
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("SMTP server " + mailer + " is ready to take our messages");
  }
});

app.use(express.static(path.join(__dirname, '../public')));

app.use(i18n({
  defaultLang: 'de',
  siteLangs: ['en', 'de', 'se'],
  textsVarName: 't',
  translationsPath: path.join(__dirname, '../locales')
}));

app.use('/css', express.static(path.join(__dirname + '../public/css')));
app.use('/js', express.static(path.join(__dirname + '../public/scripts')));
app.use('/img', express.static(path.join(__dirname + '../public/img')));
app.use(favicon(path.join(__dirname,'../public','img','favicon.ico')));


app.set('views', path.join(__dirname, '../public/pages'));
app.set('view engine', 'ejs');

app.listen(
  port,
  () => console.log('Server started on port ' + port)
)

app.get(`/`, (req, res) => {
  console.log("get /");
  res.render('Home');
});

app.post('/mail', (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    const mail = {
      from: data.name,
      to: process.env.EMAIL || 'john@newby.org',
      subject: 'Mail from ${data.name} ${data.surname}',
      text: 'foo'
    };

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});
