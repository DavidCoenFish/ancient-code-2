//modifiercharacterslotnodeconnectdata.js

function ModifierCharacterSlotNodeConnectData(in_namePrepend, in_value, in_target)
{
	//DEBUG if ( !(this instanceof ModifierCharacterSlotNodeConnectData) )
	//DEBUG {
	//DEBUG 	alert("ModifierCharacterSlotNodeConnectData: call constuctor with new keyword");	
	//DEBUG }

	this.m_namePrepend = in_namePrepend;
	this.m_value = in_value;
	this.m_target = in_target;
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
			var modifierCharacterSlotNodeConnectData1 = new ModifierCharacterSlotNodeConnectData("foo", 1.0, "moo");
			var modifierCharacterSlotNodeConnectData2 = new ModifierCharacterSlotNodeConnectData("bar", 0.5, "goo");
			
			result &= ("foo" == modifierCharacterSlotNodeConnectData1.m_namePrepend);
			result &= (1.0 == modifierCharacterSlotNodeConnectData1.m_value);
			result &= ("moo" == modifierCharacterSlotNodeConnectData1.m_target);
			
			result &= ("bar" == modifierCharacterSlotNodeConnectData2.m_namePrepend);
			result &= (0.5 == modifierCharacterSlotNodeConnectData2.m_value);
			result &= ("goo" == modifierCharacterSlotNodeConnectData2.m_target);
		}

		if (true != result)
		{
			return "Fail:ModifierCharacterSlotNodeConnectData";
		}
		return "Pass:ModifierCharacterSlotNodeConnectData";
	}
	
	g_arrayUnitTest.push(out_object);
}

