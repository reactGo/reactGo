'use strict';
var path = require('path');
var camelcase = require('camelcase');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('name', {
      type: String,
      required: true,
      description: 'Name of the container'
    });
  },

  writing: function () {
    this.template(
      'container.js', 
      path.join('app', 'containers', camelcase(this.name) + '.js'),
      this.context
    );
  }
});