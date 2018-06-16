var express = require("express");
var router = express.Router();
var Products = require('../models/product');
var Cart = require('../models/cart');
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/', function(req, res){
  Products.find(function(err, docs){
      res.render('index', {products : docs});
  });
});

router.get('/addtocart', function(req, res){
  res.render('cart');
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


module.exports = router;
