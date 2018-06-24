const Q = require('q');
const Test = require("./../modules/test.js");
const WrapJavaScript = require("./../modules/wrapjavascript.js");

module.exports.name = "random";

module.exports = function(promiseArray) {
	Run(promiseArray);

	return;
}

const Run = function(promiseArray) {
	var context = WrapJavaScript("./data/public/js/random.js", {});
	var RandomStream = context.MersenneTwister;

	promiseArray.push(Q().then(function(input){

		var randomStreamA = new RandomStream(10);
		var randomStreamB = new RandomStream(10);
		for (var index = 0; index < 1000; ++index){
			var a = randomStreamA.Random();
			var b = randomStreamB.Random();
			if (a != b){
				Test.DealTestFail("random:" + index + " " + a + " " + b); 
				break;
			}
		}

		return true;
	}));

	return;
}
