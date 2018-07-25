const Sequelize = require('sequelize');


module.exports = (sequelize) => {
	const CsApiStats = sequelize.define('csapistats', {
	  	apiCallTime: Sequelize.INTEGER,
	});
	CsApiStats.sync();


	return class TokenModel{
		static async storeTime(apiCallTime){
			CsApiStats.create({apiCallTime})
		}

		static async getTimes(){
			return await CsApiStats.findAll();
		}
	}
} 