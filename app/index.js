'use strict';

// load external modules
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var WebapplateGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        })
    },

    // prompts
    askFor: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous Webapplate generator!'));

        var prompts = [
            {
                type: 'list',
                name: 'appType',
                message: 'What kind of webapp is your project?',
                choices: [
                    'hosted',
                    'packaged'
                ]
            },
            {
                type: 'input',
                name: 'githubUsername',
                message: 'Your Github username?'
            },
            {
                type: 'input',
                name: 'githubRepo',
                message: 'Your Github repository?'
            }];

        this.prompt(prompts, function (answers) {
            // add all options
            this.appType = answers.appType;
            this.githubUsername = answers.githubUsername;
            this.githubRepo = answers.githubRepo;

            done();
        }.bind(this));
    },

    app: function () {
    },

    projectfiles: function () {
        var yeoThis = this;

        this.log(this.sourceRoot());
        this.log(this.destinationRoot());

        // configuration files
        this.copy('webapplate/bower.json', 'bower.json');
        this.copy('webapplate/Gruntfile.js', 'Gruntfile.js');
        this.copy('webapplate/index.html', 'index.html');
        this.copy('webapplate/karma.conf.js', 'karma.conf.js');
        this.copy('webapplate/package.json', 'package.json');
        this.copy('webapplate/server.js', 'server.js');

        // assets
        this.directory('webapplate/helper', 'helper');
        this.directory('webapplate/public', 'public');
        this.directory('webapplate/tasks', 'tasks');
        this.directory('webapplate/views', 'views');
    }
});

module.exports = WebapplateGenerator;
