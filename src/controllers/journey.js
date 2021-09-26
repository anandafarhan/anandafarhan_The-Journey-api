const { Journey, User, Bookmark } = require('../../models');
const { Op } = require('sequelize');

//* Re-Useable Error message
const { success, failed, messageSuccess, messageFailed, messageEmpty } = {
	success: 'success',
	failed: 'failed',
	messageSuccess: (type, id) => `${type} Journey/s success${id ? ` id : ${id}` : ``}`,
	messageFailed: (type, id) => `${type} Journey/s fail${id ? ` id : ${id}` : ``}`,
	messageEmpty: `No data found`,
};

//* Re-Useable Error response
const errorResponse = (err, res) => {
	console.log(err);
	res.status(500).send({ error: { message: 'Server Error' } });
};

//*-------------------------------------------- Get All Journeys --------------------------------------------*//
exports.getJourneys = async (req, res) => {
	try {
		const { createdAt } = req.query;
		const { search } = req.query;
		let journeys = null;
		if (createdAt) {
			const DateStart = new Date(createdAt).setHours(0, 0, 0, 0);
			const DateEnd = new Date(createdAt).setHours(23, 59, 59, 999);
			journeys = await Journey.findAll({
				where: { status: true, createdAt: { [Op.between]: [DateStart, DateEnd] } },
				attributes: {
					exclude: ['updatedAt'],
				},
				include: {
					model: User,
					attributes: {
						exclude: ['password', 'createdAt', 'updatedAt'],
					},
				},
				order: [['createdAt', 'DESC']],
			});
		} else if (search) {
			journeys = await Journey.findAll({
				where: { title: { [Op.substring]: search }, status: true },
				attributes: {
					exclude: ['updatedAt'],
				},
				include: {
					model: User,
					attributes: {
						exclude: ['password', 'createdAt', 'updatedAt'],
					},
				},
				order: [['createdAt', 'DESC']],
			});
		} else {
			journeys = await Journey.findAll({
				where: { status: true },
				attributes: {
					exclude: ['updatedAt'],
				},
				include: {
					model: User,
					attributes: {
						exclude: ['password', 'createdAt', 'updatedAt'],
					},
				},
				order: [['createdAt', 'DESC']],
			});
		}

		if (journeys.length < 1) {
			return res.status(204).send();
		}

		res.send({
			status: success,
			message: messageSuccess('Get'),
			data: { journeys },
		});
	} catch (err) {
		errorResponse(err, res);
	}
};

//!-------------------------------------------- Get All Journeys by Date --------------------------------------------*//
exports.getJourneysByDate = async (req, res) => {
	try {
		const { createdAt } = req.params;
		const journeys = await Journey.findAll({
			where: {
				createdAt,
			},
			attributes: {
				exclude: ['updatedAt'],
			},
			include: {
				model: User,
				attributes: {
					exclude: ['password', 'createdAt', 'updatedAt'],
				},
			},
		});

		if (journeys.length < 1) {
			return res.status(204).send();
		}

		res.send({
			status: success,
			message: messageSuccess('Get by Date'),
			data: { journeys },
		});
	} catch (err) {
		errorResponse(err, res);
	}
};

//*-------------------------------------------- Get Journey by Id --------------------------------------------*//
exports.getJourney = async (req, res) => {
	try {
		const { id } = req.params;
		const journey = await Journey.findOne({
			where: {
				id,
			},
			attributes: {
				exclude: ['updatedAt'],
			},
			include: {
				model: User,
				attributes: {
					exclude: ['password', 'createdAt', 'updatedAt'],
				},
			},
		});

		if (!journey) {
			return res.status(400).send({
				status: failed,
				message: messageFailed('Get', id),
				data: {
					journey: [],
				},
			});
		}

		res.send({
			status: success,
			message: messageSuccess('Get'),
			data: { journey },
		});
	} catch (err) {
		errorResponse(err, res);
	}
};

//*-------------------------------------------- Get User Journeys --------------------------------------------*//
exports.getUserJourneys = async (req, res) => {
	try {
		const { id } = req.user;
		const journeys = await Journey.findAll({
			where: {
				userId: id,
			},
			attributes: {
				exclude: ['updatedAt'],
			},
			include: {
				model: User,
				attributes: {
					exclude: ['password', 'createdAt', 'updatedAt'],
				},
			},
			order: [['createdAt', 'DESC']],
		});

		if (journeys.length < 1) {
			return res.status(204).send();
		}

		res.send({
			status: success,
			message: messageSuccess('Get User Journeys'),
			data: { journeys },
		});
	} catch (err) {
		errorResponse(err, res);
	}
};

//*-------------------------------------------- Add Journey --------------------------------------------*//
exports.addJourney = async (req, res) => {
	try {
		const { body, user } = req;
		const userId = user.id;
		const journey = await Journey.create({ ...body, thumbnail: req.file.path, userId });

		res.status(201).send({
			status: success,
			message: messageSuccess('Add Journey'),
			data: {
				journey,
			},
		});
	} catch (err) {
		errorResponse(err, res);
	}
};

//*-------------------------------------------- Update Journey --------------------------------------------*//
exports.updateJourney = async (req, res) => {
	try {
		const { body } = req;
		const { id } = req.params;

		const isJourneyExist = await Journey.findOne({
			where: {
				id,
			},
		});
		if (!isJourneyExist) {
			return res.status(400).send({
				status: failed,
				message: messageEmpty,
				data: {
					journey: [],
				},
			});
		} else {
			await Journey.update({ ...body, thumbnail: req.file.path }, { where: { id } });
			const updatedJourney = await Journey.findOne({
				where: { id },
				attributes: {
					exclude: ['updatedAt'],
				},
			});

			res.send({
				status: success,
				message: messageSuccess('Update', id),
				data: {
					journey: updatedJourney,
				},
			});
		}
	} catch (err) {
		return errorResponse(err, res);
	}
};

//*-------------------------------------------- Update Journey No File --------------------------------------------*//
exports.updateJourneyNF = async (req, res) => {
	try {
		const { body } = req;
		const { id } = req.params;

		const isJourneyExist = await Journey.findOne({
			where: {
				id,
			},
		});
		if (!isJourneyExist) {
			return res.status(400).send({
				status: failed,
				message: messageEmpty,
				data: {
					journey: [],
				},
			});
		} else {
			await Journey.update({ ...body }, { where: { id } });
			const updatedJourney = await Journey.findOne({
				where: { id },
				attributes: {
					exclude: ['updatedAt'],
				},
			});

			res.send({
				status: success,
				message: messageSuccess('Update', id),
				data: {
					journey: updatedJourney,
				},
			});
		}
	} catch (err) {
		return errorResponse(err, res);
	}
};

//*-------------------------------------------- Delete Journey --------------------------------------------*//
exports.deleteJourney = async (req, res) => {
	try {
		const { id } = req.params;

		const isJourneyExist = await Journey.findOne({
			where: { id },
		});
		if (!isJourneyExist) {
			return res.status(400).send({
				status: failed,
				message: messageEmpty,
				data: {
					journey: [],
				},
			});
		} else {
			await Journey.destroy({
				where: { id },
			});
			res.send({
				status: success,
				message: messageSuccess('Delete', id),
				data: {
					journey: null,
				},
			});
		}
	} catch (err) {
		return errorResponse(err, res);
	}
};
