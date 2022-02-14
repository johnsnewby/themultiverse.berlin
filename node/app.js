const express = require('express');
var favicon = require('serve-favicon');
const fs = require('fs');
const i18n = require('i18n-express');
const multiparty = require("multiparty");
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

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

function filenamesWithAlts(files) {
    list = [];
    for (const file of files) {
	list.push({
	    'filename': file,
	    'alt': file.split('.')[0] });

    }
    return list;
}

var coffee_images = [];
fs.readdir("../public/img/coffee", function(err, files) {
    coffee_images = filenamesWithAlts(files);
});

var sweets_image = [];
fs.readdir("../public/img/sweets", function(err, files) {
    sweets_images = filenamesWithAlts(files);
});


app.set('views', path.join(__dirname, '../public/pages'));
app.set('view engine', 'ejs');

app.listen(
  port,
  () => console.log('Server started on port ' + port)
)

app.get(`/`, (req, res) => {
  console.log("get /");
  res.render('Home', {
      coffee_images: coffee_images.sort((a, b) => 0.5 - Math.random()),
      sweets_images: sweets_images.sort((a, b) => 0.5 - Math.random())
  }
  );
});
