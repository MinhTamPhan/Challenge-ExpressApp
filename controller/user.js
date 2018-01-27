const user = require("../models/user");
module.exports = {
  index(req, res, next) {
    res.render('./users/index', { title: 'Dashboard', pageHeader: 'Danh Sách User' });
  },
  list(req, res) {
    const conn = db.getConnection();
    if (!conn) {
      console.error("Database is not ready");
      res.status(500).json({
        error: "Database is not ready"
      });
      return;
    }
    conn
      .collection("list")
      .find({})
      .toArray(function(err, result) {
        if (err) {
          console.error(err);
          res.status(500).json({
            error: "Database error"
          });
          return;
        }
        res.json(result);
      });
  },
  addItem(req, res) {
    const name = req.params["name"];
    const conn = db.getConnection();
    if (!conn) {
      console.error("Database is not ready");
      res.status(500).json({
        error: "Database is not ready"
      });
      return;
    }
    conn.collection("list").insertOne({ name }, function(err, result) {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: "Database error"
        });
        return;
      }
      res.json({
        success: true
      });
    });
  }
}