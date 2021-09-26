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

//*-------------------------------------------- Get User Bookmarks Data --------------------------------------------*//
exports.getUserBookmarks = async (req, res) => {
	try {
		const { id } = req.user;
		const bookmarks = await Bookmark.findAll({
			where: {
				userId: id,
			},
			attributes: ['id'],
			include: {
				model: Journey,
				attributes: {
					exclude: ['updatedAt'],
				},
				include: {
					model: User,
					attributes: ['fullName', 'avatar'],
				},
			},
			order: [['createdAt', 'DESC']],
		});

		if (bookmarks.length < 1) {
			return res.status(204).send();
		} else {
			res.send({
				status: success,
				message: messageSuccess('Get User Bookmarks Data'),
				data: { bookmarks },
			});
		}
	} catch (err) {
		errorResponse(err, res);
	}
};

//*-------------------------------------------- Get User Bookmarks Id --------------------------------------------*//
exports.getUserBookmarksId = async (req, res) => {
	try {
		const { id } = req.user;
		const bookmarks = await Bookmark.findAll({
			where: {
				userId: id,
			},
			attributes: ['journeyId'],
		});

		if (bookmarks.length < 1) {
			return res.status(204).send();
		} else {
			res.send({
				status: success,
				message: messageSuccess('Get User Bookmarks Id'),
				data: { bookmarks },
			});
		}
	} catch (err) {
		errorResponse(err, res);
	}
};

//*---------------------------------------- Add / Delete User Bookmark --------------------------------------------*//
exports.addOrDeleteUserBookmark = async (req, res) => {
	try {
		const { body, user } = req;
		const userId = user.id;
		const journeyId = body.id;

		const ifBookmarkExist = await Bookmark.findOne({
			where: { journeyId, userId },
		});

		if (!ifBookmarkExist) {
			const bookmark = await Bookmark.create({ journeyId, userId });
			return res.status(201).send({
				status: success,
				message: messageSuccess('Add Bookmark'),
				data: {
					bookmark,
				},
			});
		} else {
			const bookmark = await Bookmark.destroy({
				where: { journeyId, userId },
			});
			return res.status(200).send({
				status: success,
				message: messageSuccess('Delete Bookmark'),
				data: {
					bookmark,
				},
			});
		}
	} catch (err) {
		errorResponse(err, res);
	}
};

//!-------------------------------------------- Delete Journey --------------------------------------------*//
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
