module.exports = {
    development: {
        username: process.env.MYSQL_USER || 'root',
        password: 'root',
        database: 'test',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    test: {
        username: process.env.MYSQL_USER || 'root',
        password: 'root',
        database: 'test',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    production: {
        use_env_variable: 'MYSQL_DB_URL',
        username: process.env.MYSQL_USER || 'root',
        password: 'root',
        database: 'test',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};
