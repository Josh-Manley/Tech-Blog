const { Post } = require('../models');

const postdata = [
  {
    title: 'first post',
    text: 'This is the first test blog post',
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;