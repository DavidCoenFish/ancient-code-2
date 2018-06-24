/*
https://sling.apache.org/documentation/the-sling-engine/url-decomposition.html
URL decomposition

During the Resource Resolution step, the client request URL is decomposed into the following parts:

Resource Path - The longest substring of the request URL such that the resource path is either the complete request URL or the next character in the request URL after the resource path is a dot (.).
Selectors - If the first character in the request URL after the resource path is a dot, the string after the dot up to but not including the last dot before the next slash character or the end of the request URL. If the resource path spans the complete request URL no seletors exist. If only one dot follows the resource path before the end of the request URL or the next slash, also no selectors exist.
Extension - The string after the last dot after the resource path in the request URL but before the end of the request URL or the next slash after the resource path in the request URL.
Suffix Path - If the request URL contains a slash character after the resource path and optional selectors and extension, the path starting with the slash up to the end of the request URL is the suffix path. Otherwise, the suffix path is empty. Note, that after the resource path at least a dot must be in the URL to let Sling detect the resource path.
There's a cheat sheet on Day's dev page under http://dev.day.com/content/docs/en/cq/current/developing/sling_cheatsheet.html available to get you familiar with the URL decomposition of Sling.

Examples: Assume there is a Resource at /a/b, which has no children.

URI							Resource Path	Selectors	Extension	Suffix	Resource Found
/a/b						/a/b			null		null		null	yes
/a/b.html					/a/b			null		html		null	yes
/a/b.s1.html				/a/b			s1			html		null	yes
/a/b.s1.s2.html				/a/b			s1.s2		html		null	yes
/a/b/c/d					/a/b/c/d		null		null		null	no!
/a/b./c/d					/a/b			null		null		/c/d	yes
/a/b.html/c/d				/a/b			null		html		/c/d	yes
/a/b.s1.html/c/d			/a/b			s1			html		/c/d	yes
/a/b.s1.s2.html/c/d			/a/b			s1.s2		html		/c/d	yes
/a/b/c/d.s.txt				/a/b/c/d		s			txt			null	no!
/a/b.html/c/d.s.txt			/a/b			null		html		/c/d.s.txt	yes
/a/b.s1.html/c/d.s.txt		/a/b			s1			html		/c/d.s.txt	yes
/a/b.s1.s2.html/c/d.s.txt	/a/b			s1.s2		html		/c/d.s.txt	yes

GetResourcePath()
GetSelector(key)
GetExtension()
GetSuffix()
GetParameter(key)
*/

const Sling = function(resourcePath, selector, extension, suffix, parameter) {
	this.m_resourcePath = resourcePath;
	this.m_selector = selector;
	this.m_extension = extension;
	this.m_suffix = suffix;
	this.m_parameter = parameter;
	return;
}

Sling.prototype.Clone = function() {
	var sling = new Sling(this.m_resourcePath, JSON.parse(JSON.stringify(this.m_selector)), this.m_extension, this.m_suffix, JSON.parse(JSON.stringify(this.m_parameter)));
	return sling;
}

Sling.prototype.GetResourcePath = function() {
	return this.m_resourcePath;
}
Sling.prototype.SetResourcePath = function(resourcePath) {
	this.m_resourcePath = resourcePath;
	return;
}

Sling.prototype.GetSelectorKeys = function() {
	return Object.keys(this.m_selector);
}
Sling.prototype.HasSelector = function(key) {
	return (key in this.m_selector);
}
Sling.prototype.GetSelector = function(key) {
	if (key in this.m_selector) {
		return this.m_selector[key];
	}
	return "";
}
Sling.prototype.SetSelector = function(key, value) {
	this.m_selector[key] = value;
	return;
}
Sling.prototype.ClearSelector = function(key) {
	if (key in this.m_selector) {
		delete this.m_selector[key];
	}
	return;
}
Sling.prototype.ClearAllSelector = function() {
	this.m_selector = {};
	return;
}

Sling.prototype.GetExtension = function() {
	return this.m_extension;
}
Sling.prototype.SetExtension = function(extension) {
	this.m_extension = extension;
	return;
}

Sling.prototype.GetSuffix = function() {
	return decodeURI(this.m_suffix);
}
Sling.prototype.SetSuffix = function(suffix) {
	return this.m_suffix = encodeURI(suffix);
}

Sling.prototype.HasParameter = function(key) {
	return (key in this.m_parameter);
}
Sling.prototype.GetParameter = function(key) {
	if (key in this.m_parameter) {
		return this.m_parameter[key];
	}
	return "";
}
Sling.prototype.SetParameter = function(key, value) {
	this.m_parameter[key] = value;
	return;
}
Sling.prototype.ClearParameter = function(key) {
	if (key in this.m_parameter) {
		delete this.m_parameter[key];
	}
	return;
}
Sling.prototype.ClearAllParameter = function() {
	this.m_parameter = {};
	return;
}

Sling.prototype.ComposeURL = function() {
	var selector = ComposeParamObject(this.m_selector, ".", ".");
	var param = ComposeParamObject(this.m_parameter, "?", "&");
	var result = (this.GetResourcePath() + selector + "." + this.m_extension + this.GetSuffix() + param);
	return result;
}

Sling.prototype.ComposeResourcePathSelectorExtension = function() {
	var selector = ComposeParamObject(this.m_selector, ".", ".");
	var result = this.GetResourcePath() + selector + "." + this.m_extension;
	return result;
}

Sling.prototype.ComposeResourcePathExtension = function() {
	var result = this.GetResourcePath() + "." + this.m_extension;
	return result;
}

function AddParam(inout_object, keyValueString) {
	if ("" === keyValueString) {
		return;
	}
	const keyValueArray = keyValueString.split("=");
	if (1 == keyValueArray.length) {
		inout_object[keyValueArray[0]] = ""; 
	}
	else if (1 < keyValueArray.length) {
		inout_object[keyValueArray[0]] = keyValueArray[1]; 
	}
	return;
}

function ComposeParamObject(in_object, in_firstToken, in_joinToken) {
	var result = "";
	for (var key in in_object) {
		var value = in_object[key];
		if (result === ""){
			result = in_firstToken;
		} else {
			result += in_joinToken;
		}
		result += key;
		if ((value !== "") && (value != undefined)) {
			result += ("=" + value);
		}
	}
	return result;
}

module.exports = function(url) {
	var resourcePath = "";
	var selector = {};
	var extension = "";
	var suffix = "";
	var parameter = {};

	const urlSplit = url.split("?");

	if (0 < urlSplit.length) {
		const urlPath = urlSplit[0];
		var foundPeriod = false;
		var lastIndex = 0;
		var foundBackslashAfterPeriod = false;
		for (var index = 0; index < urlPath.length; ++index) {
			var char = urlPath.charAt(index);

			if (false == foundPeriod) {
				if ("." == char) {
					foundPeriod = true;
					lastIndex = index;
					resourcePath = urlPath.substring(0, index);
				}
			} else {
				var dealFoundString = false;
				if ("." == char) {
					dealFoundString = true;
				}
				else if ("/" == char) {
					suffix = decodeURIComponent(urlPath.substring(index));
					foundBackslashAfterPeriod = true;
					dealFoundString = true;
				}

				if (true == dealFoundString) {
					AddParam(selector, extension);
					extension = urlPath.substring(lastIndex + 1, index);
					lastIndex = index;
				}

				if (true == foundBackslashAfterPeriod) {
					break;
				}
			}
		}
		if (false == foundPeriod) {
			resourcePath = urlPath;
		}
		else if (false == foundBackslashAfterPeriod) {
			// there is dangling text
			AddParam(selector, extension);
			extension = urlPath.substring(lastIndex + 1);
		}
	}
	if (1 < urlSplit.length) {
		const paramerterSplit = urlSplit[1].split("&");
		for (var index = 0; index < paramerterSplit.length; ++index) {
			AddParam(parameter, paramerterSplit[index]);
		}
	}

	var sling = new Sling(resourcePath, selector, extension, suffix, parameter);
	return sling;
}
