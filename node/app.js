const express = require('express');
var favicon = require('serve-favicon');
const i18n = require('i18n-express');
const multiparty = require("multiparty");
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

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
//app.use(favicon(path.join(__dirname,'../public','img','favicon.ico')));


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
