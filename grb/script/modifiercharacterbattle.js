//modifiercharacterbattle.js

function ModifierCharacterBattle(in_nodeGraph)
{
	//DEBUG if ( !(this instanceof ModifierCharacterBattle) )
	//DEBUG {
	//DEBUG 	alert("ModifierCharacterBattle: call constuctor with new keyword");	
	//DEBUG }
	
	//private members    
	var that = this;			
	var m_nodeGraph = in_nodeGraph;
	
	//////////////////////////////////////////////////////
	//public methods with private access  
	this.Activate = function()
	{
		m_nodeGraph.CreateNode(s_nodeNameCombatHitPoint, s_nodeValueOpperation.e_inputSum);    
		m_nodeGraph.CreateNode(s_nodeNameCombatHitPointDamage, s_nodeValueOpperation.e_valueData, 0.0);    
		m_nodeGraph.ConnectNode(s_nodeNameHitPoint, s_nodeNameCombatHitPoint, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameCombatHitPointDamage, s_nodeNameCombatHitPoint, -1.0);
	
		m_nodeGraph.CreateNode(s_nodeNameCombatArmor, s_nodeValueOpperation.e_inputSum);    
		m_nodeGraph.CreateNode(s_nodeNameCombatArmorDamage, s_nodeValueOpperation.e_valueData, 0.0);    
		m_nodeGraph.CreateNode(s_nodeNameCombatArmorActive, s_nodeValueOpperation.e_inputSumLessEqualZeroEver, true);
		m_nodeGraph.ConnectNode(s_nodeNameArmor, s_nodeNameCombatArmor, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameCombatArmorDamage, s_nodeNameCombatArmor, -1.0);
		m_nodeGraph.ConnectNode(s_nodeNameCombatArmor, s_nodeNameCombatArmorActive, 1.0);

		m_nodeGraph.CreateNode(s_nodeNameCombatAuraShield, s_nodeValueOpperation.e_inputSum);
		m_nodeGraph.CreateNode(s_nodeNameCombatAuraShieldDamage, s_nodeValueOpperation.e_valueData, 0.0);
		m_nodeGraph.CreateNode(s_nodeNameCombatAuraShieldActive, s_nodeValueOpperation.e_inputSumLessEqualZeroEver, true);
		m_nodeGraph.ConnectNode(s_nodeNameAuraShield, s_nodeNameCombatAuraShield, 1.0);
		m_nodeGraph.ConnectNode(s_nodeNameCombatAuraShieldDamage, s_nodeNameCombatAuraShield, -1.0);
		m_nodeGraph.ConnectNode(s_nodeNameCombatAuraShield, s_nodeNameCombatAuraShieldActive, 1.0);
	
		m_nodeGraph.CreateNode(s_nodeNameCombatAlive, s_nodeValueOpperation.e_inputSumLessEqualZeroEver, true);
		m_nodeGraph.ConnectNode(s_nodeNameCombatHitPoint, s_nodeNameCombatAlive, 1.0);
	
		m_nodeGraph.CreateNode(s_nodeNameCombatPosX, s_nodeValueOpperation.e_valueData, 0.0);
		m_nodeGraph.CreateNode(s_nodeNameCombatPosY, s_nodeValueOpperation.e_valueData, 0.0);
		m_nodeGraph.CreateNode(s_nodeNameCombatPosZ, s_nodeValueOpperation.e_valueData, 0.0);
		
		m_nodeGraph.CreateNode(s_nodeNameCombatHitPointRepairPoolUse, s_nodeValueOpperation.e_valueData, 0.0);
		m_nodeGraph.CreateNode(s_nodeNameCombatHitPointRepairActive, s_nodeValueOpperation.e_inputSumLessEqualZeroEver, true);
		m_nodeGraph.ConnectNode(s_nodeNameCombatHitPointRepairPoolUse, s_nodeNameCombatHitPointRepairActive, -1.0);
		m_nodeGraph.ConnectNode(s_nodeNameHealthRepairPool, s_nodeNameCombatHitPointRepairActive, 1.0);
	
		m_nodeGraph.CreateNode(s_nodeNameCombatAuraRepairPoolUse, s_nodeValueOpperation.e_valueData, 0.0);
		m_nodeGraph.CreateNode(s_nodeNameCombatAuraRepairActive, s_nodeValueOpperation.e_inputSumLessEqualZeroEver, true);
		m_nodeGraph.ConnectNode(s_nodeNameCombatAuraRepairPoolUse, s_nodeNameCombatAuraRepairActive, -1.0);
		m_nodeGraph.ConnectNode(s_nodeNameAuraRepairPool, s_nodeNameCombatAuraRepairActive, 1.0);

		m_nodeGraph.CreateNode(s_nodeNameCombatArmorRepairPoolUse, s_nodeValueOpperation.e_valueData, 0.0);
		m_nodeGraph.CreateNode(s_nodeNameCombatArmorRepairActive, s_nodeValueOpperation.e_inputSumLessEqualZeroEver, true);
		m_nodeGraph.ConnectNode(s_nodeNameCombatArmorRepairPoolUse, s_nodeNameCombatArmorRepairActive, -1.0);
		m_nodeGraph.ConnectNode(s_nodeNameArmorRepairPool, s_nodeNameCombatArmorRepairActive, 1.0);


	} 
	this.Deactivate = function()
	{
		m_nodeGraph.DeleteNode(s_nodeNameCombatHitPoint);
		m_nodeGraph.DeleteNode(s_nodeNameCombatHitPointDamage);
		m_nodeGraph.DeleteNode(s_nodeNameCombatArmor);
		m_nodeGraph.DeleteNode(s_nodeNameCombatArmorDamage);
		m_nodeGraph.DeleteNode(s_nodeNameCombatAuraShield);
		m_nodeGraph.DeleteNode(s_nodeNameCombatAuraShieldDamage);
		m_nodeGraph.DeleteNode(s_nodeNameCombatAuraShieldActive);
		m_nodeGraph.DeleteNode(s_nodeNameCombatAlive);
		m_nodeGraph.DeleteNode(s_nodeNameCombatPosX);
		m_nodeGraph.DeleteNode(s_nodeNameCombatPosY);
		m_nodeGraph.DeleteNode(s_nodeNameCombatPosZ);
	} 
	
	this.SetPosition = function(in_position)
	{
		m_nodeGraph.SetValueData(s_nodeNameCombatPosX, in_position.m_x || 0.0);
		m_nodeGraph.SetValueData(s_nodeNameCombatPosY, in_position.m_y || 0.0);
		m_nodeGraph.SetValueData(s_nodeNameCombatPosZ, in_position.m_z || 0.0);	
	}
	
	this.Tick = function(in_timeDelta)
	{
		if ((true == m_nodeGraph.GetValue(s_nodeNameCombatAuraShieldActive)) &&
			(true == m_nodeGraph.GetValue(s_nodeNameCombatAuraRepairActive)))
		{
			var repairRate = m_nodeGraph.GetValue(s_nodeNameAuraRepair) * in_timeDelta;
			this.AddDamageAura(-repairRate);
			m_nodeGraph.SetValueData(s_nodeNameCombatAuraRepairPoolUse, m_nodeGraph.GetValue(s_nodeNameCombatAuraRepairPoolUse) + repairRate);
		}
		if ((true == m_nodeGraph.GetValue(s_nodeNameCombatArmorActive)) &&
			(true == m_nodeGraph.GetValue(s_nodeNameCombatArmorRepairActive)))
		{
			var repairRate = m_nodeGraph.GetValue(s_nodeNameArmorRepair) * in_timeDelta;
			this.AddDamageArmour(-repairRate);
			m_nodeGraph.SetValueData(s_nodeNameCombatArmorRepairPoolUse, m_nodeGraph.GetValue(s_nodeNameCombatArmorRepairPoolUse) + repairRate);
		}
		if ((true == m_nodeGraph.GetValue(s_nodeNameCombatAlive)) &&
			(true == m_nodeGraph.GetValue(s_nodeNameCombatHitPointRepairActive)))
		{
			var repairRate = m_nodeGraph.GetValue(s_nodeNameHealthRepair) * in_timeDelta;
			this.AddDamageHealth(-repairRate);
			m_nodeGraph.SetValueData(s_nodeNameCombatHitPointRepairPoolUse, m_nodeGraph.GetValue(s_nodeNameCombatHitPointRepairPoolUse) + repairRate);
		}
	}	
	
	this.TakeDamage = function(in_damage, in_auraFactor, in_armourFactor)
	{
		var totalDamageDone = 0.0;
		if ((0.0 < in_damage) &&
			(0.0 < in_auraFactor) &&
			(true == m_nodeGraph.GetValue(s_nodeNameCombatAuraShieldActive)))
		{
			var auraDamage = Math.min(m_nodeGraph.GetValue(s_nodeNameCombatAuraShield), in_damage * in_auraFactor);
			this.AddDamageAura(auraDamage);
			totalDamageDone += auraDamage;
			in_damage -= auraDamage / in_auraFactor;
		}
		if ((0.0 < in_damage) &&
			(0.0 < in_armourFactor) &&
			(true == m_nodeGraph.GetValue(s_nodeNameCombatArmorActive)))
		{
			var armorDamage = Math.min(m_nodeGraph.GetValue(s_nodeNameCombatArmor), in_damage * in_armourFactor);
			this.AddDamageArmour(armorDamage);
			totalDamageDone += armorDamage;
			in_damage -= armorDamage / in_armourFactor;
		}
		if (0.0 < in_damage)
		{
			this.AddDamageHealth(in_damage);
			totalDamageDone += in_damage;
		}
		return totalDamageDone;
	}
	
	this.AddDamageAura = function(in_damage)
	{
		var damage = Math.max(0.0, m_nodeGraph.GetValue(s_nodeNameCombatAuraShieldDamage) + in_damage);
		m_nodeGraph.SetValueData(s_nodeNameCombatAuraShieldDamage, damage);		
		m_nodeGraph.GetValue(s_nodeNameCombatAuraShieldActive);
	}
	
	this.AddDamageArmour = function(in_damage)
	{
		var damage = Math.max(0.0, m_nodeGraph.GetValue(s_nodeNameCombatArmorDamage) + in_damage);
		m_nodeGraph.SetValueData(s_nodeNameCombatArmorDamage, damage);		
		m_nodeGraph.GetValue(s_nodeNameCombatArmorActive);		
	}
	
	this.AddDamageHealth = function(in_damage)
	{
		var damage = Math.max(0.0, m_nodeGraph.GetValue(s_nodeNameCombatHitPointDamage) + in_damage);
		m_nodeGraph.SetValueData(s_nodeNameCombatHitPointDamage, damage);		
		m_nodeGraph.GetValue(s_nodeNameCombatAlive);		
	}
	
	this.SetDamageHealth = function(in_damage)
	{
		m_nodeGraph.SetValueData(s_nodeNameCombatHitPointDamage, in_damage);
		m_nodeGraph.GetValue(s_nodeNameCombatAlive);						
	}
	
	this.SetAlive = function(in_alive)
	{
		m_nodeGraph.SetValueData(s_nodeNameCombatAlive, in_alive);	
	}
	
}

//-- END // End Concatinate, unit test or other follows
