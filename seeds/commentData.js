const { Comment } = require('../models');

const commentdata = [
  {
    text: 'this is the first test comment',
    post_id: 1,
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;
