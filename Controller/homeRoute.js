const router = require('express').Router();
const { Renter, Pet, Review, User} = require("../models")

router.delete("/", async (req, res) => {
});

router.put("/", async (req, res) => {
});

router.post("/", async (req, res) => {
  try {
    const dbData = await Posts.create({
      user_id: req.session.loggedIn,
      title: req.body.title,
      content: req.body.content,
    });

    req.session.save(() => {
      res.status(200).json(dbData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {

    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
      }

    //   add come to get review, pet n renter information)