// file : models/QuestionModel.js

module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
        contenu: DataTypes.TEXT,
        type: DataTypes.STRING,
    });

    Question.associate = (models) => {
        Question.belongsTo(models.Exercice, {
            foreignKey: 'id_exercice',
            as: 'exercice'
        });
        Question.hasMany(models.Reponse, {
            foreignKey: 'id_question',
            as: 'reponse'
        });
    }

    return Question;
}