'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Journey, { foreignKey: 'userId' });
			User.hasMany(models.Bookmark, { foreignKey: 'userId' });
		}
	}
	User.init(
		{
			fullName: DataTypes.STRING,
			email: DataTypes.STRING,
			phone: DataTypes.STRING,
			address: DataTypes.STRING,
			avatar: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
