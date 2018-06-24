const Q = require('q');
const Test = require("./../modules/test.js");
const Util = require("./../modules/util.js");

module.exports = function(promiseArray) {
	RunCopy(promiseArray);
	return;
}

const RunCopy = function (promiseArray) {
	promiseArray.push(Q(Util.writeFilePromise("./data/unittest_foo.txt", "bar")).then(function (input) {
		return Util.movePromise("./data/unittest_foo.txt", "./data/unittest_moo.txt");
	}));
}
