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
      type: Sequelize.ENUM('Easy', 'Medium', 'Hard'),
      defaultValue: 'Easy'
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
            var finalArray = [];
            var inputArray = this.inputs.split(', ').map(item => eval(item));
            var outputs = this.outputs.split(', ');

            for (var i  = 0; i < inputArray.length; ++i) {
                finalArray.push({
                    inputs: inputArray[i],
                    output: [outputs[i]]
                })
            }
            return finalArray;
        }
    }
}
);


module.exports = {
  Question,
  db
};
