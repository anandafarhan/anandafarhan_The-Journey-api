const { Bookmark, Journey, User } = require('../../models');

//* Re-Useable Error message
const { success, failed, messageSuccess, messageFailed, messageEmpty } = {
	success: 'success',
	failed: 'failed',
	messageSuccess: (type, id) => `${type} Bookmark/s success${id ? ` id : ${id}` : ``}`,
	messageFailed: (type, id) => `${type} Bookmark/s fail${id ? ` id : ${id}` : ``}`,
	messageEmpty: `No data found`,
};

//* Re-Useable Error response
const errorResponse = (err, res) => {
	console.log(err);
	res.status(500).send({ error: { message: 'Server Error' } });
};

//*-------------------------------------------- Get User Bookmarks --------------------------------------------*//
exports.getUserBookmarks = async (req, res) => {
	try {
		const { id } = req.user;
		const bookmarks = await Bookmark.findAll({
			where: {
				userId: id,
			},
			attributes: ['journeyId'],
			include: {
				model: Journey,
				attributes: {
					exclude: ['updatedAt'],
				},
				include: {
					model: User,
					attributes: {
						exclude: ['password', 'createdAt', 'updatedAt'],
					},
				},
			},
		});

		if (bookmarks.length < 1) {
			return res.status(204);
		} else {
			res.send({
				status: success,
				message: messageSuccess('Get User Bookmarks'),
				data: { bookmarks },
			});
		}
	} catch (err) {
		errorResponse(err, res);
	}
};

//*-------------------------------------------- Add User Bookmark --------------------------------------------*//
exports.addUserBookmark = async (req, res) => {
	try {
		const { body, user } = req;
		const userId = user.id;
		const journeyId = body.id;
		const bookmark = await Bookmark.create({ journeyId, userId });

		res.status(201).send({
			status: success,
			message: messageSuccess('Add Bookmark'),
			data: {
				bookmark,
			},
		});
	} catch (err) {
		errorResponse(err, res);
	}
};

//*-------------------------------------------- Delete Journey --------------------------------------------*//
exports.deleteUserBookmark = async (req, res) => {
	try {
		const { id } = req.params;

		const isBookmarkExist = await Bookmark.findOne({
			where: { id },
		});
		if (!isBookmarkExist) {
			return res.status(400).send({
				status: failed,
				message: messageEmpty,
				data: {
					bookmark: [],
				},
			});
		} else {
			await Bookmark.destroy({
				where: { id },
			});
			res.send({
				status: success,
				message: messageSuccess('Delete', id),
				data: {
					bookmark: null,
				},
			});
		}
	} catch (err) {
		return errorResponse(err, res);
	}
};
