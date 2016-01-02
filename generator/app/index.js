'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var str = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        this.log(yosay(
            'Welcome to the riveting ' + chalk.red('react-webpack-node') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'name',
            default: this.appname,
            message: 'Project name:',
            validate: function(input) {
                return !!input;
            }
        }];

        this.prompt(prompts, function (props) {
            this.displayName = props.name;
            this.name = str.slugify(props.name);
            this.buildSystem = str.slugify(props.buildSystem);
            done();
        }.bind(this));
    },

    writing: {
        config: function () {
            this.template('.babelrc', '.babelrc', this.context);
            this.template('karma.conf.js', 'karma.conf.js', this.context);
            this.template('.eslintrc', '.eslintrc', this.context);
            // .gitignore is renamed by npm to .npmignore, so use underscore
            this.template('_gitignore', '.gitignore', this.context);
            this.template('package.json', 'package.json', this.context);
        },

        projectfiles: function () {
            this.template('tests.webpack.js', 'tests.webpack.js', this.context);
            this.template('app.json', 'app.json', this.context);
            this.template('app', 'app', this.context);
            this.template('server', 'server', this.context);
            this.template('webpack', 'webpack', this.context);
        }
    },

    install: function () {
        this.installDependencies({
            npm: true,
            bower: false,
            skipInstall: this.options['skip-install']
        });
    }
});