const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async(req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
      include: [User],
    });
    if (!deleteComment) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.status(200).json(deleteComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;