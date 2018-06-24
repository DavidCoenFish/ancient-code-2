/**
 * @private
 * @final
 * @constructor
 * @this {!c.UISlider}
 * @param {!Object} in_div
 * @param {!Object} in_valueDiv
 * @param {!Object} in_inputDiv
 * @param {!number} in_min
 * @param {!number} in_max
 * @param {!c.DagNodeValue} in_dagNodeValue
 * @return {undefined}
 */
c.UISlider = function(in_div, in_valueDiv, in_inputDiv, in_min, in_max, in_dagNodeValue) {
	this.m_div = in_div;
	this.m_valueDiv = in_valueDiv;
	this.m_inputDiv = in_inputDiv;
	this.m_min = in_min;
	this.m_max = in_max;
	this.m_dagNodeValue = in_dagNodeValue;

	return;
}
c["UISlider"] = c.UISlider;


/**

	<input type="range" oninput="gMain.OnInput(this.id, this.value)" id="verticleFovDeg" min="5" max="135" value="90"></input>

 * @param {!number} in_min
 * @param {!number} in_max
 * @param {!c.DagNodeValue} in_dagNodeValue
 * @return {!c.UISlider}
 */
c.UISlider.Factory = function(
	in_document,
	in_parentElement,
	in_name,
	in_min, 
	in_max, 
	in_dagNodeValue
	){

	var div = in_document.createElement("div");

	var subDiv1 = in_document.createElement("div");
	subDiv1.style.cssText = "display: flex;justify-content:space-between";
	var heading = document.createElement("span");
	heading.innerHTML = in_name;
	subDiv1.appendChild(heading);

	var valueDiv = document.createElement("div");
	valueDiv.innerHTML = in_dagNodeValue.GetValue();
	subDiv1.appendChild(valueDiv);
	div.appendChild(subDiv1);

	var subDiv2 = in_document.createElement("div");
	var inputDiv = in_document.createElement("input");
	inputDiv.type = "range";
	inputDiv.min = in_min;
	inputDiv.max = in_max;
	inputDiv.value = in_dagNodeValue.GetValue();
	//inputDiv.oninput = function(){ console.log(in_name + " " + inputDiv.value)};

	subDiv2.appendChild(inputDiv);
	div.appendChild(subDiv2);
	in_parentElement.appendChild(div);

	var slider = new c.UISlider(div, valueDiv, inputDiv, in_min, in_max, in_dagNodeValue);
	inputDiv.oninput = function(){ slider.OnInput(); }

	return slider;
}
c.UISlider["Factory"] = c.UISlider.Factory;

/**
 * @return {undefined}
 */
c.UISlider.prototype.OnInput = function() {
	var value = parseFloat(this.m_inputDiv.value);
	this.m_dagNodeValue.SetValue(value);
	this.m_valueDiv.innerHTML = this.m_dagNodeValue.GetValue();
	return;
}

