const express = require('express');
// const favicon = require('serve-favicon');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session);
// const products = require('./models/product');
// const productsseeder = require('./seed/product-seedr');

var routes = require('./routes/index');
var userroutes = require('./routes/user');
const app = express();


//Setting Up the mongoose
// mongoose.connect('localhost:27017/shopping');
mongoose.connect('mongodb://localhost/shoppings');
require('./config/passport');

//view Setup Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(validator());
app.use(session({
  secret : "thechefway",
  resave : false,
  saveUninitialized : false,
  store : new MongoStore({mongooseConnection : mongoose.connection}),
  cookie : {maxAge : 180 * 60 * 1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});


// app.get('/', function(req, res){
//   res.render('index.ejs')
// });

app.use('/', routes);
app.use('/user', userroutes);

app.listen(3000, ()=>{
  console.log("Local Host on 3000");
});
