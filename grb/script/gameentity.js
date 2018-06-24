//gameentity.js

function GameEntity(in_name)
{
	//inherited class, this could be an instance of GameCharacter
	//DEBUG if ( !(this instanceof GameEntity) &&
	//DEBUG 	 !(this instanceof GameCharacter) ) //NOT HAPPY, GameEntity should not need to know of GameCharacter. argh, oblige client to use 'new'?
	//DEBUG {
	//DEBUG 	alert("GameEntity: call constuctor with new keyword");
	//DEBUG }

	//public members
	this.m_name = in_name; //put name into node graph?
	
	//private members    
    var that = this;	
	var m_nodeGraph = new NodeGraph();
	var m_modifierMap = new ModifierMap();
  
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.GetModifier = function(in_modifierName)
	{
		return m_modifierMap.GetModifier(in_modifierName);
	}
	this.AddModifier = function(in_modifierName, in_modifierConstructor, in_param)
	{
		var modifier = new in_modifierConstructor(m_nodeGraph, in_param);
		m_modifierMap.AddModifier(in_modifierName, modifier);
	}
	this.AddModifierParam = function(in_modifierName, in_modifierConstructor, in_param)
	{
		var modifier = new in_modifierConstructor(m_nodeGraph, in_param);
		m_modifierMap.AddModifier(in_modifierName, modifier);
	}
	this.DeleteModifier = function(in_modifierName)
	{
		m_modifierMap.DeleteModifier(in_modifierName);
	}
	this.GetValue = function(in_nodeName)
	{
		return m_nodeGraph.GetValue(in_nodeName);
	}	
	
	//todo: remove and just use GetValue()
	//this.GetNodeGraph = function()
	//{
	//	return m_nodeGraph;
	//}
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
			var gameEntity1 = new GameEntity("foo");
			var gameEntity2 = new GameEntity("bar");

			result &= ("foo" == gameEntity1.m_name);
			result &= ("bar" == gameEntity2.m_name);
		}

		
		if (true != result)
		{
			return "Fail:GameEntity";
		}
		return "Pass:GameEntity";
	}
	
	g_arrayUnitTest.push(out_object);
}

