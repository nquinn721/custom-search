const express = require('express'),
	app = express(),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	DB = require('./server/db'),
	Search = require('./server/search'),
	port = 3000,
	server = app.listen(port, () => console.log(`Listening on port ${port}`))




app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(async (req, res, next) => {
	let token =  await DB.token.getToken();
		token = token.token;

	if(!req.cookies.token){
		res.cookie('token', token);
		next();
	}else if(req.cookies.token === token){
		next();
	}else{
		res.json({error: 'unauthorized'});
	}
});



app.post('/api/companies', async (req, res) => 
	res.json(await Search.searchMultiple(req.body.companies)));

app.get('/api/api-call-times', async (req, res) => 
	res.json(await DB.csApiStats.getTimes()));

app.post('/login', async (req, res) => 
	res.json(await DB.user.login(req.body)));

 

 module.exports = server;
