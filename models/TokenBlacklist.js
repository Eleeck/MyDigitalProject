// models/TokenBlacklist.js
module.exports = (sequelize, DataTypes) => {
  const TokenBlacklist = sequelize.define(
    'TokenBlacklist',
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'invalidtokens', // correspond exactement au nom dans ta DB
      timestamps: true,          // désactive createdAt / updatedAt si tu ne les utilises pas
    }
  );

  return TokenBlacklist;
};
