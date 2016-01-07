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
      description: 'Name of the component'
    });
  },

  writing: function () {
    this.template(
      'component.js', 
      path.join('app', 'components', camelcase(this.name) + '.js'),
      this.context
    );

    this.template(
      'component.scss',
      path.join('app', 'scss', 'components', '_' + this.name + '.scss'),
      this.context
    );
  }
});