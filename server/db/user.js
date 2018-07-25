const Sequelize = require('sequelize'),
	  sha1 = require('sha1');


module.exports = (sequelize) => {
	const User = sequelize.define('user', {
	  	username: Sequelize.STRING,
	  	password: Sequelize.STRING,
	  	createdAt: Sequelize.DATE,
	  	updatedAt: Sequelize.DATE,
	  	deletedAt: Sequelize.DATE
	});
	User.sync();


	return class UserModel{
		static async seed(){
			console.log('seeded user');
			await this.createUser('nate', 'nate123');
		}
		static async createUser(username, password){
			const user = await User.create({username, password: sha1(password)});
			return user.toJSON();
		}

		static async login({ username, password }){
			const user = await this.getUser(username);
			let loggedIn;

			if(user && user.password === sha1(password)){
				loggedIn = {loggedIn: true};
			}else{
				loggedIn = {loggedIn: false, error: 'Invalid credentials'};
			}

			return loggedIn;
		}

		static async getUser(username){
			try{
				const user = await User.findOne({where: {username}});
				return user.toJSON();
			}catch(e){}
		}
	}
} 