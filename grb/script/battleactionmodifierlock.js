// battleactionmodifierlock.js

function BattleActionModifierLock(in_nodeNameTarget, in_value)
{
	//DEBUG if ( !(this instanceof BattleActionModifierLock) )
	//DEBUG {
	//DEBUG 	alert("BattleActionModifierLock: call constuctor with new keyword");	
	//DEBUG }

	//private members    
	var that = this;			
	var m_name = "" + this.GetUniqueId();
	var m_param = {
		"m0" : m_name,
		"m1" : in_nodeNameTarget,
		"m2" : in_value	
		};
	var m_targetCharacter = null;

	//////////////////////////////////////////////////////
	//public methods with private access  
	this.SetTargetCharacter = function(in_targetCharacter)
	{
		if (m_targetCharacter == in_targetCharacter)
		{
			return;
		}
		if (null != m_targetCharacter)
		{
			m_targetCharacter.DeleteModifier(m_name);
		}

		m_targetCharacter = in_targetCharacter;

		if (null != m_targetCharacter)
		{
			m_targetCharacter.AddModifier(m_name, BattleActionModifier, m_param);
		}
	}
}

//http://stackoverflow.com/questions/1997661/unique-object-identifier-in-javascript
(function() 
{
    if (typeof BattleActionModifierLock.prototype.GetUniqueId == "undefined") 
    {
        var id = 0;
        BattleActionModifierLock.prototype.GetUniqueId = function() 
        {
            if (typeof this.m_uniqueId == "undefined") 
            {
                this.m_uniqueId = id;
                ++id;
            }
            return this.m_uniqueId;
        };
    }
})();