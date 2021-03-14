var dbConnection = require("../dbConnection.js");

exports.create = function (req, res) {
  dbConnection.query(
    "INSERT INTO consultations SET ?",
    req.body,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(400);
        res.send({
          failed: "error ocurred",
        });
      } else {
        res.send({
          code: 200,
          success: "consultation created sucessfully",
        });
      }
    },
  );
};

exports.get = function (req, res) {
  var consultationId = req.params.consultationId;

  dbConnection.query(
    "SELECT * FROM consultations WHERE `id` = ?",
    consultationId,
    function (error, results, fields) {
      console.log(results);
      if (error) {
        console.log(error);
        res.status(400);
        res.send({
          failed: "error ocurred",
        });
      } else if (results.length <= 0) {
        res.status(400);
        res.send({
          message: "consultation not found",
        });
      } else {
        res.send(results[0]);
      }
    },
  );
};

exports.search = function (req, res) {
  var startTime = req.body.dateTime.gt;
  var endTime = req.body.dateTime.lt;

  dbConnection.query(
    "SELECT * FROM consultations WHERE dateTime >= ? AND dateTime <= ?",
    [startTime, endTime],
    function (error, results, fields) {
      console.log(results);
      if (error) {
        console.log(error);
        res.status(400);
        res.send({
          failed: "error ocurred",
        });
      } else {
        res.send({
          consultations: results,
        });
      }
    },
  );
};
