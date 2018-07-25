const Sequelize = require('sequelize');


module.exports = (sequelize) => {
	const Token = sequelize.define('token', {
	  	token: Sequelize.STRING,
	});
	Token.sync();


	return class TokenModel{
		static async seed(){
			try{
				Token.create({token: '12345'});
			}catch(e){
				console.log('failed to get token', e);
			}
		}
		static async getToken(){
			if(!this.token) {
				const token = await Token.find();
				this.token = token.toJSON();
			}

			return this.token;
		}
	}
} 