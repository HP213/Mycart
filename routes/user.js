var express = require("express");
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/profile',isLoggedIn,  function(req, res){
  res.send("profile Page");
});


router.use('/', notLoggedIn, function(req, res, next){
  next();
})

router.get('/signup', function(req, res){
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken : req.csrfToken(), messages : messages, hasError : messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect  : "/user/profile",
  failureRedirect : "/user/signup",
  failureFlash : true,
}));

router.get('/signin', function(req, res){
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken : req.csrfToken(), messages : messages, hasError : messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect  : "/user/profile",
  failureRedirect : "/user/signin",
  failureFlash : true,
}));


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};

function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}


module.exports = router;
