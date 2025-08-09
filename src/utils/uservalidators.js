const validators = require('validator');

const validateUserData = (req) => {
  const { firstName, lastName } = req.body

  if (!firstName || !lastName) {
    throw new Error('Please provide name');
  }
}

module.exports = validateUserData;
