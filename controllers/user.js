const user = require("../models/user");
module.exports = {
  index(req, res, next) {
    res.render('./users/index', { title: 'Dashboard', pageHeader: 'Danh Sách User' });
  }
}