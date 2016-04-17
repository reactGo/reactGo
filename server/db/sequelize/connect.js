import Models from './models';

const sequelize = Models.sequelize;

export default () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Successfully connected to sequelize database');
    }, (err) => {
      console.log('Unable to connect to the sequelize database: ', err);
    });
};
