const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', express.static(path.join(__dirname + '../public/css')));
app.use('/js', express.static(path.join(__dirname + '../public/scripts')));
app.use('/img', express.static(path.join(__dirname + '../public/img')));


app.set('views', path.join(__dirname, '../public/pages'));
app.set('view engine', 'ejs');


app.listen(
    3000,
    () => console.log('Server started on port 80')
)

app.get(`/`, (req, res) => {
    res.render('Home');
});