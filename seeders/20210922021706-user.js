'use strict';
const bcrypt = require('bcrypt');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('Users', [
			{
				id: 1,
				fullName: 'Cipto',
				email: 'cipto@gmail.com',
				phone: '083896833123',
				address: 'Permata Bintaro Residence B3',
				password: await bcrypt.hash('user123', 10),
			},
			{
				id: 2,
				fullName: 'Oni-on',
				email: 'Oni@gmail.com',
				phone: '083896833103',
				address: 'Permata Bintaro Residence A1',
				password: await bcrypt.hash('user123', 10),
			},
			{
				id: 3,
				fullName: 'Ani-ki',
				email: 'Ani@gmail.com',
				phone: '083896833133',
				address: 'Permata Bintaro Residence C2',
				password: await bcrypt.hash('user123', 10),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Users', null, {});
	},
};
