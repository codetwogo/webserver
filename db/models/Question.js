'use strict';

const Sequelize = require('sequelize');
const dbURI = process.env.dbURI || 'postgres://Snow:postgres@localhost:5432/c2g';

const db = new Sequelize(dbURI, {
    username: 'postgres',
    define: {
        timestamps: false,
        underscored: true
    },
    logging: false
})


var Question = db.define('question', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    difficulty: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    inputs: {
        type: Sequelize.STRING,
        allowNull: false
    },
    outputs: {
        type: Sequelize.STRING,
        allowNull: false
    },
    boilerplate: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync();

module.exports = Question;
