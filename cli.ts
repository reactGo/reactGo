#!/usr/bin/env node
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as path from 'path';
import * as shell from 'shelljs';

const copyRecursiveSync = (src: string, dest: string) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = stats && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

const removeLines = (src: string, lines: number[] = []) => {
  fs.readFile(src, 'utf8', (err, data) => {
    if (err) throw err;
    const after = data
      .split('\n')
      .filter((val, idx) => lines.indexOf(idx) === -1)
      .join('\n');
    // remove the first line and the 5th and 6th lines in the file
    fs.writeFile(src, after, 'utf8', () => {});
  });
};

inquirer
  .prompt([{
    name: 'db',
    message: 'Choose database you want to use.',
    type: 'list',
    choices: ['MySQL', 'PostgreSQL', 'MongoDB', 'none'],
  }, {
    name: 'front',
    message: 'Choose state management framework you want to use.',
    type: 'list',
    choices: ['redux + thunk', 'redux + saga', 'mobx'],
  }])
  .then((answers) => {
    console.log(answers);
    console.log(answers.db);
    console.log(process.cwd());
    const list = ['config', 'types', 'webpack', 'app', 'server', 'package.json', '.sequelizerc', 'nodemon.json', '.babelrc', '.gitignore', '.eslintrc.json', '.eslintignore', 'Procfile', 'tsconfig.json'];
    list.forEach((name) => {
      copyRecursiveSync(path.join(__dirname, name), path.join(process.cwd(), name));
    });
    shell.exec('npm install');
    console.log('done');
  });
