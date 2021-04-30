const router = require('express').Router();

const User = require('../models/User.model');
const Post = require('../models/Post.model');

// ****************************************************************************************
// GET route to display the form to create a new post
// ****************************************************************************************

// localhost:3000/post-create
router.get('/post-create', (req, res) => {
  User.find()
    .then((dbUsers) => {
      res.render('posts/create', { dbUsers: dbUsers });
    })
    .catch((err) =>
      console.log(`Err while displaying post input page: ${err}`)
    );
});

router.post('/post-create', (req, res, next) => {
  // const title = req.body.title;
  // const content = req.body.content;
  // const author = req.body.author;

  const { title, content, author } = req.body;

  // Post.create({
  //   title: title,
  //   content: content,
  //   author: author,
  // })
  Post.create({ title, content, author })
    .then((dbPost) => {
      return User.findByIdAndUpdate(author, { $push: { posts: dbPost._id } });
    })
    .then(() => {
      res.redirect('/posts');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/posts', (req, res) => {
  Post.find()
    .populate('author', { username: 1 })
    .then((dbPosts) => {
      res.render('posts/list', { posts: dbPosts });
    })

    .catch((error) => {
      next(error);
    });
});
// ****************************************************************************************
// POST route to submit the form to create a post
// ****************************************************************************************

// <form action="/post-create" method="POST">

// ... your code here

// ****************************************************************************************
// GET route to display all the posts
// ****************************************************************************************

// ... your code here

// ****************************************************************************************
// GET route for displaying the post details page
// shows how to deep populate (populate the populated field)
// ****************************************************************************************

// ... your code here

module.exports = router;
