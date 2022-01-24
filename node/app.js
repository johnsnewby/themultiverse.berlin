const express = require('express');
const i18n = require('i18n-express');
const path = require('path');
var favicon = require('serve-favicon');
const port = process.env.PORT || 3000;

const app = express();

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
    res.render('Home');
});
