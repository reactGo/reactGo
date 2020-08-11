#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var inquirer = __importStar(require("inquirer"));
var path = __importStar(require("path"));
var shell = __importStar(require("shelljs"));
var copyRecursiveSync = function (src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = stats && stats.isDirectory();
    if (isDirectory) {
        fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    }
    else {
        fs.copyFileSync(src, dest);
    }
};
inquirer
    .prompt([{
        name: 'db',
        message: 'Choose database you want to use.',
        type: 'list',
        choices: ['MySQL', 'PostgreSQL', 'MongoDB', 'none'],
    }])
    .then(function (answers) {
    console.log(answers);
    console.log(answers.db);
    console.log(process.cwd());
    var list = ['config', 'types', 'webpack', 'app', 'server', 'package.json', '.sequelizerc', 'nodemon.json', '.babelrc', '.gitignore', '.eslintrc.json', '.eslintignore', 'Procfile'];
    list.forEach(function (name) {
        copyRecursiveSync(path.join(__dirname, name), path.join(process.cwd(), name));
    });
    shell.exec('npm install');
    console.log('done');
});
