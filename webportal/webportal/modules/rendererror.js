module.exports = function(response, err) {
	console.log("RenderError err:" + err);
	//if ("stack" in err){
		console.log(err.stack);
	//}

	console.log(Object.getOwnPropertyNames(err));

	response.setHeader("content-type", "text/plain");
	response.statusCode = 500;
	response.write("bad bobo");
	response.end();

	return;
}
