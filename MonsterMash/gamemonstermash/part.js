/*
 * or is in_isBody determined by ablity? but may want transport ablity in mouth
 * 	transportEmitter, transportCollecter? for putting into system and taking out?
 */

function Part(
	in_isBody,
	in_gameX,
	in_gameY,
	in_shape,
	in_skin,
	in_drawLayerFill,
	in_drawLayerOutline,
	in_ablityMap)
{
	if (!(this instanceof PartBody))
		alert("PartBody: call constuctor with new keyword");

	//var that = this;
	//var m_shape = in_shape.Clone();
	//var m_skin = in_skin;
	//var m_drawLayerFill = in_drawLayerFill;
	//var m_drawLayerOutline = in_drawLayerOutline;
	//var m_ablityMap = in_ablityMap;

	var m_nodeGraph = new NodeGraph();
	//var m_parentPart = null;
	var m_arrayChildrenPart = [];

	this.AddChild = function(in_childPart)
	{
		if (in_childPart.m_parentPart)
		{
			in_childPart.m_parentPart.RemoveChild(in_childPart);
		}

		// use m_shape and in_childPart.m_shape to get common point of
		// intersection,
		// set child with parent relative position info
		// in_childPart.SetParentRelativePositionData(parentRelativePositionData)

		in_childPart.m_parentPart = this;
		m_arrayChildrenPart.push(in_childPart);
	};

	this.RemoveChild = function(in_childPart)
	{
		in_childPart.m_parentPart = null;
		m_arrayChildrenPart.remove(in_childPart);
	};

	this.AddAblity = function(in_name, in_ablity)
	{
		m_nodeGraph[in_name] = in_ablity;
	};

	this.RemoveAblity = function(in_name)
	{
		delete m_nodeGraph[in_name];
	};

	this.Draw = function(in_drawLayer)
	{
	// if (m_drawLayerFill == in_drawLayer)
	// m_shape.
	};

}

// -- END // unit test or other follows
// ///////////////////////////////////////////////////////////////////////
// Unit testbed
if (window.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		if (true == result)
		{
			if (!result)
				return "Fail construction";
		}

		if (true != result)
			return "Fail:Part";
		return "Pass:Part";
	};

	g_arrayUnitTest.push(out_object);
}
