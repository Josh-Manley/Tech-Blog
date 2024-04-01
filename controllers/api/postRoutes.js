const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // Check if any rows were affected
    if (updatePost[0] === 0) {
      return res.status(404).json({ error: 'Post not found or no changes were made.' });
    }

    res.status(200).json(updatePost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!deletePost) {
      res.status(404).json({ message: 'No Post found with this id' });
      return;
    }
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
