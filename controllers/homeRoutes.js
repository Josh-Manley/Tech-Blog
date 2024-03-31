const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map(Post => Post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    // const projectData = await Project.findByPk(req.params.id, {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          // attributes: ['name'],
          attributes: ['name', 'id'],
        },
        { model: Comment, include: [User], attributes: ['text'] },
      ],
    });

    const post = postData.get({ plain: true });
    const userId = req.session.user_id;
    const postUserId = post.user_id;
    const sameUser = userId === postUserId;

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
      sameUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


// router.get('/comment/:id', withAuth, async (req, res) => {
//   const postData = await Post.findByPk(req.params.id, 
//     {include: [User,  
//       {model:Comment, attributes:['text'], include:[User],
//   }]});

//   const postDataPlain = postData.get({ plain: true });

//   res.render('comment', {postDataPlain, logged_in: req.session.logged_in, userId: req.session.user_id});
// })
// router.get('/edit/:id', withAuth, async (req, res) => {
//   const postData = await Post.findByPk(req.params.id, 
//     {include: [User,  
//       {model:Comment, attributes:['text'], include:[User],
//   }]});

//   const postDataPlain = postData.get({ plain: true });

//   res.render('edit', {postDataPlain, logged_in: req.session.logged_in, userId: req.session.user_id});
// })


module.exports = router;
