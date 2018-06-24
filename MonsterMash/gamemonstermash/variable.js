var s_gameViewMaximumScale = 100.0;

// with a 480 pixel screen, and a game world height of 75, zoom game units * 6.4
// gives [0 ... 480]
var s_workspaceWorldWidth = 1000.0;
var s_workspaceWorldHeight = 100.0;
var s_workspaceDefaultViewX = 500.0; // 483.333; // 640 / 19.2 := 33.333
var s_workspaceDefaultViewY = 17.5; // 30.0; // 480 / 19.2 = 25
var s_workspaceDefaultScale = 19.2;
var s_workspaceDefaultGroundHeight = 10.0;

var s_drawLayerEnum = {
	"eMainOutline" : 0,
	"eMainFill" : 1,
	"eUnderPartOutline" : 2,
	"eUnderPartFill" : 3,
	"eOverPartOutline" : 4,
	"eOverPartFill" : 5,
	"eBackground" : 6
};

function GetdrawLayerOrder(in_xray)
{
	if (true == in_xray)
		return [
			s_drawLayerEnum.eBackground,
			s_drawLayerEnum.eMainOutline,
			s_drawLayerEnum.eMainFill,
			s_drawLayerEnum.eUnderPartOutline,
			s_drawLayerEnum.eUnderPartFill,
			s_drawLayerEnum.eOverPartOutline,
			s_drawLayerEnum.eOverPartFill
		];
	return [
		s_drawLayerEnum.eBackground,
		s_drawLayerEnum.eUnderPartOutline,
		s_drawLayerEnum.eUnderPartFill,
		s_drawLayerEnum.eMainOutline,
		s_drawLayerEnum.eMainFill,
		s_drawLayerEnum.eOverPartOutline,
		s_drawLayerEnum.eOverPartFill
	];
};

/*
 * food comes in from mouth, and is transported to digestion food get digested
 * and turned into fat and poo fat get stored to be converted to energy as
 * needed poo gets transported to poo hole
 */
var s_transportPayloadEnum = {
	"eFood" : 0,
	"eFat" : 1,
	"ePoo" : 2
};
function FactoryPayloadDictionary()
{
	var result = {};
	result[s_transportPayloadEnum.eFood] = 0.0;
	result[s_transportPayloadEnum.eFat] = 0.0;
	result[s_transportPayloadEnum.ePoo] = 0.0;
	return result;
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
			return "Fail:Variable";
		return "Pass:Variable";
	};

	g_arrayUnitTest.push(out_object);
}