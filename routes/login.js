var dbConnection = require("../dbConnection.js");

exports.register = function (req, res) {
  const password = req.body.password;
  // const encryptedPassword = await bcrypt.hash(password, saltRounds)
  var users = req.body;

  dbConnection.query(
    "INSERT INTO users SET ?",
    users,
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
          success: "user registered sucessfully",
        });
      }
    },
  );
};

exports.login = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("find email:", email);

  dbConnection.query(
    "SELECT * FROM users WHERE email = ?",
    email,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(400);
        res.send({
          failed: "error ocurred",
        });
      } else {
        console.log("hi", results);
        if (results.length > 0) {
          if (password === results[0].password) {
            res.send(results[0]);
          } else {
            console.log("password is wrong");

            res.status(400);
            res.send({
              message: "Email or password is incorrected",
            });
          }
        } else {
          console.log("email not found");
          res.status(400);
          res.send({
            message: "Email or password is incorrect",
          });
        }
      }
    },
  );
};
