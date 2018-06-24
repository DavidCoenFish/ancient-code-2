//nodeinput.js

function NodeInput(in_nodeName, in_factor)
{
	//DEBUG if ( !(this instanceof NodeInput) )
	//DEBUG {
	//DEBUG 	alert("NodeInput: call constuctor with new keyword");		
	//DEBUG }

	this.m_nodeName = in_nodeName;
	this.m_factor = in_factor;
}

//-- END // End Concatinate, unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (window.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		//construction
		if (true == result)
		{
			var nodeinput1 = new NodeInput("foo", 1.0);
			var nodeinput2 = new NodeInput("bar", 0.5);
			
			result &= ("foo" == nodeinput1.m_nodeName);
			result &= (1.0 == nodeinput1.m_factor);
			result &= ("bar" == nodeinput2.m_nodeName);
			result &= (0.5 == nodeinput2.m_factor);
		}

		if (true != result)
		{
			return "Fail:NodeInput";
		}
		return "Pass:NodeInput";
	}
	
	g_arrayUnitTest.push(out_object);
}

