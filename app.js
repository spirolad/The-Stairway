const express = require('express');
const routes = require('./routes/router')

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

const port = 80;
app.listen(port);

console.log('App listening on port ' + port);