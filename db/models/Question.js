'use strict';

const Sequelize = require('sequelize');
const dbURI = process.env.DATABASE_URL || 'postgres://localhost:5432/codetap';

const db = new Sequelize(dbURI, {

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
      type: Sequelize.ENUM('easy', 'medium', 'hard'),
      defaultValue: 'easy'
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
    boilerPlate: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    like: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
}, {
    getterMethods: {
        tests () {
            return [{
                inputs: eval(this.inputs),
                output: [this.outputs]
            }]
        }
    }
}
);


module.exports = {
  Question,
  db
};
