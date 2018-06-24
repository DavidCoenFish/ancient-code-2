//class DragDropManager
function DragDropManager()
{
    if (!(this instanceof DragDropManager))
		alert("DragDropManager: call constuctor with new keyword");
}


//-- END // unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
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
			return "Fail:DragDropManager";
		return "Pass:DragDropManager";
	};

	g_arrayUnitTest.push(out_object);
}
