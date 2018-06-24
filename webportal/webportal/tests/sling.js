const Q = require('q');
const Sling = require("./../modules/sling.js");
const Test = require("./../modules/test.js");

module.exports.name = "sling";

module.exports = function(promiseArray) {
	Run(promiseArray);

	return;
}

const Run = function(promiseArray) {
	promiseArray.push(Q().then(function(input){
		var result = Sling("");
		Test.DealTest("resourcePath", result.GetResourcePath(), "");
		Test.DealTest("selector", result.HasSelector("z"), false);
		Test.DealTest("selector", result.GetSelector("z"), "");
		Test.DealTest("extension", result.GetExtension(), "");
		Test.DealTest("suffix", result.GetSuffix(), "");
		Test.DealTest("parameter", result.GetParameter("y"), "");
		Test.DealTest("ComposeURL", result.ComposeURL(), ".");

		result = Sling("index.lc=en.s=5.html");
		Test.DealTest("resourcePath", result.GetResourcePath(), "index");
		Test.DealTest("selector", result.GetSelector("lc"), "en");
		Test.DealTest("selector", result.GetSelector("s"), "5");
		Test.DealTest("selector", result.GetSelector("z"), "");
		Test.DealTest("extension", result.GetExtension(), "html");
		Test.DealTest("suffix", result.GetSuffix(), "");
		var temp = result.ComposeURL();
		Test.DealTest("ComposeURL", result.ComposeURL(), "index.lc=en.s=5.html");
		var temp = result.ComposeResourcePathExtension();
		Test.DealTest("ComposeURL", temp, "index.html");

		result = Sling("/a/b.s1.s2.html/c/d.s.txt");
		Test.DealTest("resourcePath", result.GetResourcePath(), "/a/b");
		Test.DealTest("selector", result.HasSelector("s1"), true);
		Test.DealTest("selector", result.HasSelector("s2"), true);
		Test.DealTest("extension", result.GetExtension(), "html");
		Test.DealTest("suffix", result.GetSuffix(), "/c/d.s.txt");
		var temp = result.ComposeURL();
		Test.DealTest("ComposeURL", result.ComposeURL(), "/a/b.s1.s2.html/c/d.s.txt");

		result = Sling("/index?hello=0&world=1");
		Test.DealTest("resourcePath", result.GetResourcePath(), "/index");
		Test.DealTest("extension", result.GetExtension(), "");
		Test.DealTest("suffix", result.GetSuffix(), "");
		Test.DealTest("parameter", result.GetParameter("hello"), "0");
		Test.DealTest("parameter", result.GetParameter("world"), "1");
		var temp = result.ComposeURL();
		Test.DealTest("ComposeURL", result.ComposeURL(), "/index.?hello=0&world=1");
	}));

	return;
}
