const express = require("express");

const router = express.Router();

router.use("/lqre", require("./lqre"))
router.use("/login", require("./login"))

router.get(["/","/index", "/index.htm", "/index.html"], function(request, response) {
	response.render('index.html', {date: new Date().toISOString()});	
})

module.exports = router;