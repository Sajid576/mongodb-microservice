const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const _ = require('lodash');
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const name = _.upperFirst(_.split(file, '.')[0]);
    const schema = require(path.join(__dirname, file))(mongoose);

    db[name] = mongoose.model(name, schema);
  });

module.exports = db;
