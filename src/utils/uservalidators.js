const validators = require('validator');

const validateUserData = (req) => {
  const { firstName, lastName } = req.body

  if (!firstName || !lastName) {
    throw new Error('Please provide name');
  }
}

const validateUserProfileEditData = (req) => {
  const allowedFields = ["firstName", "lastName", "age", "skills"];
  const isUpdateAllowed = Object.keys(req.body).every(field => allowedFields.includes(field));
  return isUpdateAllowed
}

module.exports = {
  validateUserData,
  validateUserProfileEditData
};
