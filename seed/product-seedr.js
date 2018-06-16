var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/shoppings");

var products = [
  new Product({
    imagePath : 'https://cdn.pixabay.com/photo/2014/05/02/21/49/home-office-336373__340.jpg',
    title : 'Thumbnail label',
    description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price : 90000
  }),
  new Product({
    imagePath : 'https://cdn.pixabay.com/photo/2014/05/02/21/49/home-office-336373__340.jpg',
    title : 'Thumbnail label',
    description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price : 90000
  }),
  new Product({
    imagePath : 'https://cdn.pixabay.com/photo/2014/05/02/21/49/home-office-336373__340.jpg',
    title : 'Thumbnail label',
    description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price : 90000
  }),
  new Product({
    imagePath : 'https://cdn.pixabay.com/photo/2014/05/02/21/49/home-office-336373__340.jpg',
    title : 'Thumbnail label',
    description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price : 90000
  }),
  new Product({
    imagePath : 'https://cdn.pixabay.com/photo/2014/05/02/21/49/home-office-336373__340.jpg',
    title : 'Thumbnail label',
    description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price : 90000
  }),
  new Product({
    imagePath : 'https://cdn.pixabay.com/photo/2014/05/02/21/49/home-office-336373__340.jpg',
    title : 'Thumbnail label',
    description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price : 90000
  }),
];

var done = 0;
for(var i=0; i<products.length; i++){
  products[i].save(function(err, res){
    done++;
    if(done === products.length){
      exit1();
    }
  });
}

function exit1(){
    mongoose.disconnect();
}

// module.exports
