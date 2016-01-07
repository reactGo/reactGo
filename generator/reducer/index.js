'use strict';
var path = require('path');
var chalk = require('chalk');
var camelcase = require('camelcase');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('name', {
      type: String,
      required: true,
      description: 'Name of the reducer'
    });
  },

  writing: function () {
    this.log(chalk.yellow(' (!) Remember to add the reducer to the reducers index file'));
    
    this.template(
      'reducer.js', 
      path.join('app', 'reducers', camelcase(this.name) + '.js'),
      this.context
    );
  }
});