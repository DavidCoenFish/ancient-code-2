const express = require("express");
const router = express.Router({ mergeParams: true });

router.all("*", function(request, response, next) {
	console.log("request.signedCookies:" + JSON.stringify(request.signedCookies));
	if (false === "userId" in request.session) {
		response.redirect("/login");
		return;
	}
	next();
});

router.post("/logout", function(request, response, next) {
	request.session = null;
	response.end("ok");
});


router.get("/", function(request, response, next) {
	response.render('lqre.html', {date: new Date().toISOString(), userId:request.session.userId, userName:request.session.userName});	
});

module.exports = router;
