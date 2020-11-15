#!/usr/bin/env node
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import { program } from 'commander';
import * as path from 'path';
import * as shell from 'shelljs';
import { version } from './package.json';

const copyRecursiveSync = (src: string, dest: string) => {
  try {
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
  } catch (err) {
    console.error(err);
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

let removeTargetModules: string[] = [];
const mobxSpecificModules = ['mobx', 'mobx-react', 'mobx-react-router'];
const reduxSpecificModules = ['redux', 'redux-logger', '@types/redux-logger', 'redux-devtools-extension', 'connected-react-router', 'seamless-immutable', 'immutable'];
const thunkSpecificModules = ['redux-thunk'];
const toolkitSpecificModules = ['@reduxjs/toolkit'];
const sagaSpecificModules = ['redux-saga'];
const mongoSpecificModules = ['@types/mongodb', 'mongoose', '@types/mongoose', 'connect-mongo'];
const sequelizeSpecificModules = ['sequelize', 'sequelize-cli'];
const pgSpecificModules = ['@types/pg', 'pg', 'pg-hstore', 'connect-pg-simple', '@types/connect-pg-simple'];
const mysqlSpecificModules = ['mysql2', 'connect-session-sequelize'];

program
  .version(version)
  .option('-d --dev', 'development mode')
  .parse(process.argv);

if (program.dev) {
  console.log('running dev mode CLI');
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
      choices: ['redux toolkit', 'redux + thunk', 'redux + saga', 'mobx'],
    }])
    .then((answers) => {
      let front;
      switch (answers.front) {
        case 'redux toolkit':
          front = 'app_toolkit';
          break;
        case 'redux + saga':
          front = 'app_saga';
          break;
        case 'mobx':
          front = 'app_mobx';
          break;
        default: // thunk
          front = 'app_thunk';
          break;
      }
      let db;
      switch (answers.db) {
        case 'MySQL':
          db = 'server_mysql';
          break;
        case 'PostgreSQL':
          db = 'server_pg';
          break;
        case 'none':
          db = 'server_none';
          break;
        default: // mongo
          db = 'server_mongo';
          break;
      }
      let exists = fs.existsSync(path.join(__dirname, 'server'));
      console.log(exists);
      if (exists) {
        console.log('removing existing server directory...');
        fs.unlinkSync(path.join(__dirname, 'server'));
      }
      exists = fs.existsSync(path.join(__dirname, 'app'));
      console.log(exists);
      if (exists) {
        console.log('removing existing app directory...');
        fs.unlinkSync(path.join(__dirname, 'app'));
      }
      console.log('copying existing server directory...');
      console.log('copying existing app directory...');
      fs.symlinkSync(path.join(__dirname, db), path.join(__dirname, 'server'), 'dir');
      fs.symlinkSync(path.join(__dirname, front), path.join(__dirname, 'app'), 'dir');
      console.log('installing node modules...');
      shell.exec('npm install');
      console.log('done');
    });
} else {
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
      choices: ['redux toolkit', 'redux + thunk', 'redux + saga', 'mobx'],
    }])
    .then((answers) => {
      console.log(answers);
      console.log(process.cwd());
      let front;
      switch (answers.front) {
        case 'redux toolkit':
          front = 'app_toolkit';
          removeTargetModules = removeTargetModules.concat(sagaSpecificModules).concat(mobxSpecificModules).concat(thunkSpecificModules);
          break;
        case 'redux + saga':
          front = 'app_saga';
          removeTargetModules = removeTargetModules.concat(toolkitSpecificModules).concat(mobxSpecificModules).concat(thunkSpecificModules);
          break;
        case 'mobx':
          front = 'app_mobx';
          removeTargetModules = removeTargetModules.concat(toolkitSpecificModules).concat(reduxSpecificModules).concat(sagaSpecificModules).concat(thunkSpecificModules);
          break;
        default: // thunk
          front = 'app_thunk';
          removeTargetModules = removeTargetModules.concat(toolkitSpecificModules).concat(mobxSpecificModules).concat(sagaSpecificModules);
          break;
      }
      let db;
      switch (answers.db) {
        case 'MySQL':
          db = 'server_mysql';
          removeTargetModules = removeTargetModules.concat(pgSpecificModules).concat(mongoSpecificModules);
          fs.writeFile(path.join(process.cwd(), '.env'), 'DB_TYPE=MYSQL', () => {
            console.log('.env created');
          });
          break;
        case 'PostgreSQL':
          db = 'server_pg';
          removeTargetModules = removeTargetModules.concat(mysqlSpecificModules).concat(mongoSpecificModules);
          fs.writeFile(path.join(process.cwd(), '.env'), 'DB_TYPE=PG', () => {
            console.log('.env created');
          });
          break;
        case 'none':
          db = 'server_none';
          removeTargetModules = removeTargetModules.concat(sequelizeSpecificModules).concat(pgSpecificModules).concat(mongoSpecificModules).concat(mysqlSpecificModules);
          fs.writeFile(path.join(process.cwd(), '.env'), 'DB_TYPE=NONE', () => {
            console.log('.env created');
          });
          break;
        default: // mongo
          db = 'server_mongo';
          removeTargetModules = removeTargetModules.concat(sequelizeSpecificModules).concat(pgSpecificModules).concat(mysqlSpecificModules);
          break;
      }
      copyRecursiveSync(path.join(__dirname, db), path.join(process.cwd(), 'server'));
      copyRecursiveSync(path.join(__dirname, front), path.join(process.cwd(), 'app'));
      const list = ['config', 'types', 'webpack', 'package.json', '.sequelizerc', 'nodemon.json', 'gitignore', '.babelrc', '.eslintrc.json', '.eslintignore', 'Procfile', 'tsconfig.json'];
      list.forEach((name) => {
        copyRecursiveSync(path.join(__dirname, name), path.join(process.cwd(), name));
      });
      console.log('installing node modules...');
      shell.exec('npm install');
      console.log('removing these modules...', removeTargetModules.join(', '));
      shell.exec(`npm rm ${removeTargetModules.join(' ')}`);
      console.log('creating .gitignore');
      fs.renameSync(path.join(process.cwd(), 'gitignore'), path.join(process.cwd(), '.gitignore'));
      console.log('done, please change your package name');
    });
}
