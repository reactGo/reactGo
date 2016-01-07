'use strict';
var path = require('path');
var camelcase = require('camelcase');
var generators = require('yeoman-generator');
var htmlWiring = require('html-wiring');
var readFileAsString = htmlWiring.readFileAsString;
var writeFileFromString = htmlWiring.writeFileFromString;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('namespace', {
      type: String,
      required: true,
      description: 'Name of the namespace'
    });

    this.argument('name', {
      type: String,
      required: true,
      description: 'Name of the constant'
    });
  },

  writing: function () {
    var constantsFilePath = path.join('app', 'constants', this.namespace + '.js');
    var file = readFileAsString(constantsFilePath);

    file += "\n export const " + this.name + " = '" + this.name + "';";

    writeFileFromString(file,constantsFilePath);
  }
});