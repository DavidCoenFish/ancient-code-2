const express = require("express");
const bcrypt = require("bcrypt-nodejs");

const router = express.Router({ mergeParams: true });
const database = require("./../modules/database");
const util = require("./../modules/util");
const userSchema = require("./../schema/user");

/*
	//console.log('secret: ', request.secret)
	//console.log('Cookies: ', request.cookies)
	//console.log('Signed Cookies: ', request.signedCookies)
	//response.cookie('cookiename', 'cookievalue', { maxAge: 900000, httpOnly: true, signed: true });
	//response.send("Welcome");

*/

router.post("/guest", function(request, response, next) {
	//create a new document
	var document = {};
	document[userSchema.sCreationTime] = new Date().getTime();
	database.insertDocument(userSchema.sCollectionName, document).then(function(result){ 
		request.session.userId = result;
		request.session.userName = "Guest";
		response.end("ok");
	}).fail(function(error){
		response.status(500).send("not ok");
	});
	return;
});

const userCleanName = function(in_name){
	if (typeof in_name === 'string' || in_name instanceof String){
		return in_name.trim();
	}
	return "";
}

const userValidatePassword = function(in_password){
	if (typeof in_password === 'string' || in_password instanceof String){
		return (8 < in_password.length);
	}
	return false;
}

const userValidateEmail = function(in_email){
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(in_email)){
		return true;
	}
	return false;
}

router.post("/new", function(request, response, next) {
	var data = request.body;

	var cleanName = userCleanName(data.name);
	if (cleanName === ""){
		response.status(500).send("invalid user name");
		return;
	}

	if (false === userValidatePassword(data.password)){
		response.status(500).send("invalid password");
		return;
	}

	if (false === userValidateEmail(data.email)){
		response.status(500).send("invalid email");
		return;
	}

	var salt = util.randomString(32, util.sRandomStringChars);
	var document = {};
	document["_id"] = data.email;
	document[userSchema.sName] = cleanName;
	document[userSchema.sCreationTime] = new Date().getTime();
	document[userSchema.sEmail] = data.email;
	document[userSchema.sSalt] = salt;
	document[userSchema.sPasswordHash] = bcrypt.hashSync(salt + data.password);

	database.insertDocument(userSchema.sCollectionName, document).then(function(result){ 
		request.session.userId = result;
		request.session.userName = cleanName;
		response.end("ok");
	}).fail(function(error){
		response.status(500).send("not ok");
	});
});

router.post("/login", function(request, response, next) {
	console.log("/login");
	var data = request.body;

	if (false === userValidateEmail(data.email)){
		response.status(500).send("invalid email");
		return;
	}

	database.getDocument(data.email).then(function(result){ 
		console.log("result:" + JSON.toString(result));
		var salt = result[userSchema.sSalt];
		var passwordHash = result[userSchema.sPasswordHash];
		if (true == bcrypt.compareSync(salt + data.password, passwordHash)){
			console.log("bcrypt:true");
			request.session.userId = data.email;
			request.session.userName = result[userSchema.sName];
			response.end("ok");
		} else {
			console.log("bcrypt:false");
			response.status(500).send("bad password");
		}
	}).fail(function(error){
		console.log("error:" + error);
		response.status(500).send("not ok");
	});

	response.end("ok");
});

router.post("/recover", function(request, response, next) {
	response.status(500).send("unimplemented");
});

router.get("/", function(request, response, next) {
	response.render('login.html', {date: new Date().toISOString()});
});

module.exports = router;
