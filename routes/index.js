var express = require("express");
var router = express.Router();
var Products = require('../models/product');
var Order = require('../models/order');
var Cart = require('../models/cart');
var csrf = require('csurf');
var passport = require('passport');
var csrfProtection = csrf();
var stripe = require('stripe')('sk_test_YUZJh1isP0U7WqgC0usTgT5i');
router.use(csrfProtection);

router.get('/', function(req, res){
  var successMsg = req.flash('success')[0];
  Products.find(function(err, docs){
      res.render('index', {products : docs,successMsg : successMsg, noMessage : !successMsg});
  });
});

router.get('/addtocart', function(req, res){
  if(!req.session.cart){
    return res.render('cart', {products : null});
  }
  var cart = new Cart(req.session.cart);
  var successMsg = req.flash('success')[0];
  var errorMsg = req.flash('error')[0];
  res.render('cart', {products : cart.generateArray(), totalPrice: cart.totalPrice, successMsg : successMsg, errorMsg : errorMsg, noMessage : !successMsg, noerrorMessage : !errorMsg});
});

router.get('/addtocart/:id', function(req, res){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items : {}});

  Products.findById(productId, function(err, product){
    if(err){
      return res.redirect('/');
    }
    else{
      console.log(product.id);
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/');
    }
  });
});

// router.get('/reduce/:id', function(req, res, next){
//   var productId = req.params.id;
//   var cart = new Cart(req.session.cart ? req.session.cart : {items : {}});
//
//   cart.reduceOne(productId);
//   req.session.cart = cart;
//   res.redirect('/addtocart');
// })

router.get('/change/:id',function(req,res){
  if(req.query.change < 0){
    req.flash('error',"Value Cannot Be Negetive")
    res.redirect('/addtocart')
  }else{
    cart = new Cart(req.session.cart);
    cart.change(req.params.id,req.query.change);
    req.session.cart = cart;
    res.redirect('/addtocart');
  }
})
router.get('/delete/:id',function(req,res){
  cart = new Cart(req.session.cart);
  cart.remove(req.params.id)
  req.session.cart = cart;
  req.flash('success',"Item Remove Successfully From The Cart")
  res.redirect('/addtocart');
})

router.get('/checkout',isLoggedIn, function(req, res, next){
  if(!req.session.cart){
    return res.redirect('/addtocart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('checkout', {csrfToken : req.csrfToken(), totalPrice: cart.totalPrice, errMsg : errMsg, noError : !errMsg});
});
//
// router.post('/checkout', function(req, res, next){
//   if(!req.session.cart){
//     return res.redirect('/addtocart');
//   }
// var cart = new Cart(req.session.cart);
// var stripe = require("stripe")(
//   "sk_test_YUZJh1isP0U7WqgC0usTgT5i"
// );
//
// stripe.charges.create({
//   amount: cart.totalPrice,
//   currency: "inr",
//   source: req.body.stripeToken,
//   description: "Test Charge!!!"
// }, function(err, charge) {
//
//   if(err){
//     req.flash('error', err.message);
//     return res.redirect('/checkout');
//   }
//   req.flash('success', 'Successfully bought the Product');
//   req.cart = null;
//   res.redirect('/');
// });
// console.log(req.body.stripeToken);
//
// })

router.post('/checkout',isLoggedIn, function(req, res){
  var token = req.body.stripeToken;
  console.log(token);
  var chargeAmount = req.body.chargeAmount;
  var charge = stripe.charges.create({
    amount : chargeAmount,
    currency : 'gbp',
    source : token
  },function(err, charge){
    if(err ){
      return console.log("Your card was declined!!!");
    }
    console.log(charge);
    var order = new Order({
      user: req.user,
      cart : req.session.cart,
      address : req.body.address,
      name : req.body.name,
      paymentId : charge.id,
    });
    order.save(function(err, result){
      console.log("Payment was successful");
      console.log(result);
      req.flash('success', 'Successfully bought the Product');
        req.session.cart = null;
         res.redirect('/');
    });

  });
});


module.exports = router;


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
};
