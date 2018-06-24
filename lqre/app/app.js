const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const whiskers = require("whiskers");


const port = process.env.PORT || 3000;

const app = express();
app.engine('.html', whiskers.__express);
app.set("views", __dirname + "/views");

app.use(helmet());

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({name: "lqse", secret: "W9SRQrULf02XegQSGUEcDCV41Jo5h5kO", maxAge: 24 * 60 * 60 * 1000}));
app.use("*", function(request, response, next){
	console.log();
	console.log("request.method:" + request.method);
	console.log("request.originalUrl:" + request.originalUrl);
	console.log("request.body:" + JSON.stringify(request.body));
	//console.log("request.url:" + request.url);
	//console.log("request.path:" + request.path);
	next();
	});

app.use(require("./controllers"));

app.listen(port, function() {
	console.log("Listening on port " + port);
});

