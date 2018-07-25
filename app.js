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

const routeToken = async (req, res, next) => {
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
};

app.get('/seed', async (req, res) => {
	for(let model in DB) DB[model].seed && DB[model].seed();
	res.send('Seeded the database');
});


app.post('/login', routeToken, async (req, res) => 
	res.json(await DB.user.login(req.body)));

app.post('/api/companies', routeToken, async (req, res) => 
	res.json(await Search.searchMultiple(req.body.companies)));

app.get('/api/api-call-times', routeToken, async (req, res) => 
	res.json(await DB.csApiStats.getTimes()));


 

 module.exports = server;
