var express = require("express");
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Order = require('../models/order');
var Cart = require('../models/cart');
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// router.get('/profile',isLoggedIn,  function(req, res){
  // Order.find({user : req.user}, function(err, orders){
  //   if(err){
  //     return res.send("Error!");
  //   }
  //   var cart;
  //   orders.forEach(function(order){
  //     cart = new Cart(order.cart);
  //     order.item = cart.generateArray();
  //   });
  //   res.render('user/profile', {orders : orders})
  // });
  //
// });

router.get('/profile', isLoggedIn, function(req, res){
  Order.find({user : req.user}, function(err, orders){
    if(err){
      return res.send("Error!!!");
    }
    var cart;
    orders.forEach(function(order){
      cart = new Cart(order.cart);
      order.item= cart.generateArray();
    });
    console.log(orders);
    console.log(orders.items);
    res.render("user/profile.ejs", {orders : orders, hello : "hello"});
  });

})


router.use('/', notLoggedIn, function(req, res, next){
  next();
})

router.get('/signup', function(req, res){
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken : req.csrfToken(), messages : messages, hasError : messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {

  failureRedirect : "/user/signup",
  failureFlash : true,
}),function(req, res){
  if(req.session.oldUrl){
    res.redirect(req.session.oldUrl);
    req.session.oldUrl = null;
  }else{
    res.redirect("/user/profile");
  }

});

router.get('/signin', function(req, res){
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken : req.csrfToken(), messages : messages, hasError : messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {

  failureRedirect : "/user/signin",
  failureFlash : true,
}),function(req, res){
  if(req.session.oldUrl){
    res.redirect(req.session.oldUrl);
    req.session.oldUrl = null;
  }else{
    res.redirect("/user/profile");
  }

});


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
