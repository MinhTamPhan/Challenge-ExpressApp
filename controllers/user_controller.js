const dbconfig = require('../models/db');
const userSchema = require("../models/user_model");
const mongoose = require('mongoose');
var buffer = require('buffer');
var path = require('path');
var fs = require('fs');
mongoose.Promise = global.Promise;

function saveImage64(data64, filePath){
  if(fs.existsSync(filePath)){
    fs.unlinkSync(filePath);
  }
  fs.mkdirSync(filePath, 0744);
  filePath += '/main.jpeg';
  console.log(filePath);
  let buf = Buffer.from(data64,'base64');
  fs.writeFile(filePath, buf, function(error){
    if(error){
      console.log('some thing wrong when save image', error);
    }else{
      console.log('File created from base64 string!');
      return true;
    }
  });
}

function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const User = mongoose.model("User",userSchema);
mongoose.connect(dbconfig.url);
module.exports = {
  index(req, res, next) {
    User.find({}, null, { sort: { _id: 1 } }, function (err, docs) {
      // docs is an array
      res.render('./users/index', { title: 'Dashboard', pageHeader: 'Danh Sách User',users: docs});      
    });
  },

  new (req, res, next) {
    res.render('./users/new', { title: 'Dashboard', pageHeader: 'Chụp hình đăng kí' });
  },

  create(req, res, next) {
    let newUser = new User({
      name: req.body.name,
      phone_number: req.body.phone_number      
    });
    newUser.save((error, results) => {
      if (error) {
        console.log(error);
        next(error);
      }
      else {
        let base64Data = req.body.avatar;
        let filename = req.body.phone_number;
        let filePath = path.join(__dirname,'../public/images/user_images',filename);
        saveImage64(base64Data, filePath);
        res.render('./users/edit', { title: 'Dashboard', pageHeader: 'Update Thông Tin' , user: newUser});
      }
    });    
  },

  edit(req, res, next) {
    console.log("call edit", req.params.id);
    User.findById(req.params.id, function (err, user) {
      res.render('./users/edit', { title: 'Dashboard', pageHeader: 'Update Thông Tin' , user: user})    
    });
  },

  update(req, res, next) {
    User.findById(req.body.id, function (err, user) {
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.phone_number) {
        user.phone_number = req.body.phone_number;
      }
      user.save((error, results) => {
        let base64Data = req.body.avatar;
        let filename = req.body.phone_number;
        let filePath = path.join(__dirname,'../public/images/user_images',filename);
        saveImage64(base64Data, filePath);
        res.redirect('/index');
      });
    });
  },

  delete(req, res, next) {
    User.findById(req.body.id, function (err, user) {
      if (err) 
        return next(err);
      let filename = user.phone_number;
      let filePath = path.join(__dirname,'../public/images/user_images',filename);
      if(fs.existsSync(filePath)) {
        deleteFolderRecursive(filePath);
      }
      user.remove((error, results) => {
        if (error) return next(error);
        res.redirect('/index');
      });
    });
  },
}