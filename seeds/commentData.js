const { Comment } = require('../models');

const commentdata = [
  {
    text: "this is the first test comment"
  }
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;