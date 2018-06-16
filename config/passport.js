const passport = require('passport');
const User = require('../models/user');
const localStratergy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use('local.signup', new localStratergy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true,
}, function(req ,email, password, done){
  // req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid Password - Length Must be greater than 5').notEmpty().isLength({min : 5});
  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return  done(null, false, req.flash('error', messages));
  }
  User.findOne({'email' : email}, function(err, user){
    if(err){
      return done(err);
    }
    if(user){
      return done(null, false, {message : 'Email is already in use.'});
    }
    var newUser = new User();
    newUser.email = email;
    // new User.password = password;
    newUser.password = newUser.encryptPassword(password);
    newUser.save(function(err, result){
      if(err){
        return done(err);
      }
      else{
        return done(null, newUser);
      }
    });

  });
}));


passport.use('local.signin', new localStratergy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true,
}, function(req ,email, password, done){
  // req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid Password').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return  done(null, false, req.flash('error', messages));
  }
  User.findOne({'email' : email}, function(err, user){
    if(err){
      return done(err);
    }
    if(!user){
      return done(null, false, {message : 'No User Found'});
    }

    if(!user.validPassword(password)){
      return done(null, false, {message : 'Wrong Password'});
    }
    return done(null, user);
    });


}));
