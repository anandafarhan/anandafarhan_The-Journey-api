const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
	const header = req.header('Authorization');
	if (!header) {
		return res.status(401).json({
			status: 'failed',
			message: 'Access denied',
		});
	}

	try {
		const token = header.replace('Bearer ', '');
		const verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		// console.log(verified);
		req.user = verified;
		next();
	} catch (error) {
		return res.status(403).json({
			status: 'failed',
			message: 'Invalid Token',
		});
	}
};

exports.authAdmin = async (req, res, next) => {
	const header = req.header('Authorization');
	if (!header) {
		return res.status(401).json({
			status: 'failed',
			message: 'Access denied',
		});
	}

	try {
		const token = header.replace('Bearer ', '');
		const verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		// console.log(verified);
		req.user = verified;
		req.user.roleId === 1 ? next() : console.error('Unauthorized');
	} catch (error) {
		return res.status(403).json({
			status: 'failed',
			message: 'Invalid Token',
		});
	}
};
