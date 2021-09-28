const { User } = require('../../models');
const bcrypt = require('bcrypt');

//* Re-Useable Error message
const { success, failed, messageSuccess, messageFailed, messageEmpty } = {
	success: 'success',
	failed: 'failed',
	messageSuccess: (type, id) => `${type} User/s success${id ? ` id : ${id}` : ``}`,
	messageFailed: (type, id) => `${type} User/s fail${id ? ` id : ${id}` : ``}`,
	messageEmpty: `No data found`,
};

//* Re-Useable Error response
const errorResponse = (err, res) => {
	console.log(err);
	res.status(500).send({ error: { message: 'Server Error' } });
};

//*-------------------------------------------- Update User --------------------------------------------*//
exports.updateUser = async (req, res) => {
	try {
		const { id } = req.user;

		const isUserExist = await User.findOne({
			where: {
				id,
			},
		});

		if (!isUserExist) {
			return res.status(400).send({
				status: failed,
				message: messageEmpty,
				data: {
					user: [],
				},
			});
		}

		if (req.body.password) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			await User.update(
				{ ...req.body, password: hashedPassword, avatar: req.file.path },
				{ where: { id } }
			);
		} else {
			await User.update({ ...req.body, avatar: req.file.path }, { where: { id } });
		}

		const updatedUser = await User.findOne({
			where: {
				id,
			},
			attributes: {
				exclude: ['password', 'createdAt', 'updatedAt'],
			},
		});
		res.send({
			status: success,
			message: messageSuccess('Update', id),
			data: { updatedUser },
		});
	} catch (err) {
		errorResponse(err, res);
	}
};
