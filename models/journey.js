'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Journey extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Journey.belongsTo(models.User, { foreignKey: 'userId' });
			Journey.hasMany(models.Bookmark, { foreignKey: 'journeyId' });
		}
	}
	Journey.init(
		{
			title: DataTypes.STRING,
			description: DataTypes.TEXT,
			thumbnail: DataTypes.STRING,
			status: DataTypes.BOOLEAN,
			userId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Journey',
		}
	);
	return Journey;
};
