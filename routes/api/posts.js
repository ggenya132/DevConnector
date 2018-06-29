const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const passport = require("passport");
const postValidator = require("../../validation/post");

router.get("/test", (req, res) => res.json({ msg: "posts GOOD" }));

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, isValid } = postValidator(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => {
      res.json(post);
    });
  }
);

router.get("/", (req, res) => {
  Post.find()
    .sort({ data: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(404).json(err));
});

router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      res.json(post);
    })
    .catch(err => res.status(404).json(err));
});

router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOne({ user: req.user.id })
      .then(post => {
        if (post.user.toString() !== req.user.id) {
          return res.json(401).json({ notAuthorized: "User not authorized" });
        }

        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.json(err));
  }
);

router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        console.log("we found the post", post);
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ aleadyliked: "User has already liked this post" });
        }
        post.likes.unshift({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.json(err));
  }
);

router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        console.log("we found the post", post);
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notlike: "User has not liked this post" });
        }

        const likeToRemove = post.likes
          .map(like => like.user.toString())
          .indexOf(req.user.id);

        post.likes.splice(likeToRemove, 1);
        console.log("LIKE TO REMOVE", likeToRemove, "POST", post);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.json(err));
  }
);

router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        let { errors, isValid } = postValidator(req.body);
        if (!isValid) {
          return res.status(400).json(errors);
        }

        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
  }
);

router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        // let { errors, isValid } = postValidator(req.body);
        // if (!isValid) {
        //   return res.status(400).json(errors);
        // }

        const indexOfCommentToRemove = post.comments
          .map(comment => comment._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(indexOfCommentToRemove, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ postnotfound: "Comment not found" })
      );
  }
);
module.exports = router;
