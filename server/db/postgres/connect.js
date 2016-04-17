import Models from '../sequelize/models';

const sequelize = Models.sequelize;

export default () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Successfully connected to postgres');
    }, (err) => {
      console.log('Unable to connect to the postgres database: ', err);
    });
};
