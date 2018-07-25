const Sequelize = require('sequelize'),
	sequelize = new Sequelize('urlSearch', 'postgres', '', {
		host: 'localhost',
		dialect: 'postgres',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		logging: false,
		operatorsAliases: false
	});

module.exports = {
	user: require('./db/user')(sequelize),
	token: require('./db/uaToken')(sequelize),
	csApiStats: require('./db/csApiStats')(sequelize)
}
