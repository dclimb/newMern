const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/users");

router.get("/", (req, res) => {
  res.send("test");
});

//register route

router.post("/register", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.status(409).json({ error: "Email already exists" });
      } else {
        const newUser = new Users({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        console.log(newUser);
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            (newUser.password = hash),
              newUser.save((err, data) => {
                if (err) {
                  res.status(500).json(err);
                } else {
                  res.status(201).json(data);
                }
              });
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

//login

module.exports = router;
