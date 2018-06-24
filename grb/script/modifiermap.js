//modifiermap.js

function ModifierMap()
{
	//DEBUG if ( !(this instanceof ModifierMap) )
	//DEBUG {
	//DEBUG 	alert("ModifierMap: call constuctor with new keyword");	
	//DEBUG }
	
	//private members    
    var that = this;	
	var m_modifierMap = {};
  
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.GetModifier = function(in_name)
	{
		var modifier = m_modifierMap[in_name];
		return modifier;  
	}
	
	this.AddModifier = function(in_name, in_modifier)
	{
		that.DeleteModifier(in_name);
		if (in_modifier.Activate)
		{
			in_modifier.Activate();
		}
		m_modifierMap[in_name] = in_modifier;
	}
	
	this.DeleteModifier = function(in_name)
	{
		var modifier = m_modifierMap[in_name];
		if (modifier)
		{
			if (modifier.Deactivate)
			{
				modifier.Deactivate();
			}
		}
		delete m_modifierMap[in_name];
	}
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
		{
			var modifier1 = {};
			modifier1.m_activated = 0;
			modifier1.m_deactivated = 0;
			modifier1.Activate = function()
			{
				this.m_activated += 1;
			}
			modifier1.Deactivate = function()
			{
				this.m_deactivated += 1;
			}
		
			var modifierMap = new ModifierMap();
			modifierMap.AddModifier("foo", modifier1);
			modifierMap.DeleteModifier("foo");
			modifierMap.DeleteModifier("foo");
			modifierMap.DeleteModifier("bar");
			
			result &= (1 == modifier1.m_activated);
			result &= (1 == modifier1.m_deactivated);
		}

		
		if (true != result)
		{
			return "Fail:ModifierMap";
		}
		return "Pass:ModifierMap";
	}
	
	g_arrayUnitTest.push(out_object);
}

