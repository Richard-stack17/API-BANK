const Transfer = require('../models/transfers.model');
const User = require('../models/users.model');

const transferProcess = async (req, res) => {
  const { amount, accountNumber, senderUserId } = req.body;

  const receiverUser = await User.findOne({
    where: {
      status: true,
      accountNumber,
    },
  });

  const receiverUserId = receiverUser.id;

  const senderUser = await User.findOne({
    where: {
      status: true,
      id: senderUserId,
    },
  });

  if (amount > senderUser.amount) {
    return res.status(400).json({
      status: 'fail',
      message: `The amount to be transferred is greater than your funds.`,
    });
  }

  if (senderUser.id === receiverUserId) {
    return res.status(400).json({
      status: 'fail',
      message: 'You can not make a transfer to yourself',
    });
  }
  const newAmountUserMakeTransfer = +senderUser.amount - amount;
  const newAmountUserReceiverTransfer = +receiverUser.amount + amount;

  await senderUser.update({
    amount: newAmountUserMakeTransfer,
  });
  await receiverUser.update({
    amount: newAmountUserReceiverTransfer,
  });

  await Transfer.create({
    amount,
    senderUserId,
    receiverUserId,
  });

  res.status(200).json({
    status: 'successfully',
    message: 'The transfer was successfully',
  });
};

module.exports = {
  transferProcess,
};
