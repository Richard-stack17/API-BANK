const User = require('../models/users.model');

const createUser = async (req, res) => {
  const { name, password } = req.body;
  const accountNumber = Math.round(Math.random() * 900000 + 100000);
  const amount = 1000;
  const newUser = await User.create({
    name,
    password,
    accountNumber,
    amount,
  });
  res.status(201).json({
    status: 'success',
    message: 'The user was created successfully',
    newUser,
  });
};

const loginUser = async (req, res) => {
  const { password, accountNumber } = req.body;
  const user = await User.findOne({
    where: {
      status: true,
      accountNumber,
      password,
    },
  });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message:
        'The user does not exist, please check your password or account number',
    });
  }
  return res.status(500).json({
    status: 'success',
    message: 'The login was succesfull',
  });
};

module.exports = {
  createUser,
  loginUser,
};
