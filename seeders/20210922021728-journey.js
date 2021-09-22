'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('Journeys', [
			{
				id: 1,
				title: 'Bersemayan di tanah Dewata',
				description: `<img src="./image.jpg"><br><p>Liburan di tahun
         baru 2020 keberangkatan saya menuju Pulau Dewata Bali.
         Sampai lah saya malam itu di Bali Airport menujukan waktu jam
         02.00, dan melanjutkan pejalanan yang menyenangkan</p>
         <p>nd typesetting industry. Lorem Ipsum has been the industry's
         standard dummy text ever since the 1500s, when an
         unknownprinter took a galley of type and scrambled it to make a
         type specimen book</p>`,
				thumbnail:
					'https://res.cloudinary.com/tobo2801/image/upload/v1632279261/journey-diary/dewata_eei78s.png',
				status: true,
				userId: 1,
			},
			{
				id: 2,
				title: 'Bersenandung di Senja kuta',
				description: `<img src="./image.jpg"><br><p>Sang bagaskara
            sudah beberapa menit lalu berangkat ke peraduannya di ufuk
            sebelah barat. aku meninggalkan pantai kuta meski pengujung
            yang menikmati sunset masih belum berkurang, bahkan ...</p
            <p>nd typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an
            unknownprinter took a galley of type and scrambled it to make a
            type specimen book</p>`,
				thumbnail:
					'https://res.cloudinary.com/tobo2801/image/upload/v1632279262/journey-diary/kuta_ewldu0.png',
				status: true,
				userId: 2,
			},
			{
				id: 3,
				title: '48 hours in ... London',
				description: `<img src="./image.jpg"><br><p>Let’s start at the
            very beginning. The Tower of London (St Katharine's & Wapping;
            020 3166 6000) takes you back to the London of William the
            Conqueror – it was around 1078 when he began work on ...</p
            <p>nd typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an
            unknownprinter took a galley of type and scrambled it to make a
            type specimen book</p>`,
				thumbnail:
					'https://res.cloudinary.com/tobo2801/image/upload/v1632279263/journey-diary/london_gly5pz.png',
				status: true,
				userId: 3,
			},
			{
				id: 4,
				title: 'The langham, Sydney',
				description: `<img src="./image.jpg"><br><p>After landing at the
            airport (coming from the sunshine coast) we were a little lost on
            how to work with the public transport. We soon realised that easily
            enough the train had a straight-line route to where we were ...</p>
            <p>nd typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an
            unknownprinter took a galley of type and scrambled it to make a
            type specimen book</p>`,
				thumbnail:
					'https://res.cloudinary.com/tobo2801/image/upload/v1632279262/journey-diary/sydney_mzdkth.png',
				status: true,
				userId: 3,
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
