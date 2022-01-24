const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', express.static(path.join(__dirname + '../public/css')));
app.use('/js', express.static(path.join(__dirname + '../public/scripts')));
app.use('/img', express.static(path.join(__dirname + '../public/img')));


app.set('views', path.join(__dirname, '../public/pages'));
app.set('view engine', 'ejs');

app.listen(
  port,
  () => console.log('Server started on port ' + port)
)

app.get(`/`, (req, res) => {
    res.render('Home');
});
