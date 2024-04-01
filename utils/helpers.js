module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },

  // Custom helper to check equality of two values
  equal: (value1, value2) => {
    return value1 === value2;
  }
};
