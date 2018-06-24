// guigamecharacterinfo.js

//just a view, no logic for changing zoom or offset, just displays what it is told
function GuiGameCharacterInfo(in_pixelOrigin, in_pixelSize, in_gameBackground, in_context, in_canvas)
{
	//DEBUG if ( !(this instanceof GuiGameCharacterInfo) )
	//DEBUG {
	//DEBUG 	alert("GuiGameCharacterInfo: call constuctor with new keyword");	
	//DEBUG }

	this.m_visible = false;	
	this.m_pixelOrigin = in_pixelOrigin;
	this.m_pixelSize = in_pixelSize;
	this.m_gameBackground = in_gameBackground;

	this.m_character = null;
	this.m_flip = false;
	this.m_arrayGui = [];
	
	this.m_textName = new GuiText("Name", new Vector(in_pixelOrigin.m_x + 8, in_pixelOrigin.m_y + 6), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textName);
	
	this.m_arrayGui.push(new GuiText("Health:", new Vector(in_pixelOrigin.m_x + 8, in_pixelOrigin.m_y + 26), GuiTextGetSmallFont()));
	this.m_textHealth = new GuiText("0 / 0", new Vector(in_pixelOrigin.m_x + 54, in_pixelOrigin.m_y + 26), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textHealth);
	
	this.m_arrayGui.push(new GuiText("Armour:", new Vector(in_pixelOrigin.m_x + 8, in_pixelOrigin.m_y + 46), GuiTextGetSmallFont()));
	this.m_textArmour = new GuiText("0 / 0", new Vector(in_pixelOrigin.m_x + 54, in_pixelOrigin.m_y + 46), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textArmour);
	
	this.m_arrayGui.push(new GuiText("Aura:", new Vector(in_pixelOrigin.m_x + 8, in_pixelOrigin.m_y + 66), GuiTextGetSmallFont()));
	this.m_textAura = new GuiText("0 / 0", new Vector(in_pixelOrigin.m_x + 54, in_pixelOrigin.m_y + 66), GuiTextGetSmallFont());
	this.m_arrayGui.push(this.m_textAura);
	
	
	this.m_dismissButton = new GuiButton(
		"x", 
		new Vector(in_pixelOrigin.m_x + in_pixelSize.m_x - 20, in_pixelOrigin.m_y + 2), 
		new Vector(18, 18), 
		this, 
		"CallbackHide", 
		s_guiButtonStyle.e_simple,
		in_context, 
		in_canvas
		);
	this.m_arrayGui.push(this.m_dismissButton);
		
	this.CallbackHide = function(in_button)
	{
		this.m_visible = false;
	}	
}

GuiGameCharacterInfo.prototype.SetCharacter = function(in_character, in_flip)
{
	this.m_visible = true;
	this.m_textName.m_text = in_character.m_name + " the " + in_character.GetValue(s_nodeNameClassName);
	this.m_character = in_character;
	this.m_flip = in_flip;
	this.UpdateStats();
}

GuiGameCharacterInfo.prototype.UpdateStats = function()
{
	if (false == this.m_character.GetValue(s_nodeNameCombatAlive))
	{
		this.m_textHealth.m_text = "Dead";	
	}
	else
	{
		this.m_textHealth.m_text = this.m_character.GetValue(s_nodeNameCombatHitPoint).toFixed(1) + " / " + this.m_character.GetValue(s_nodeNameHitPoint).toFixed(1);
	}
	
	if (false == this.m_character.GetValue(s_nodeNameCombatArmorActive))
	{
		this.m_textArmour.m_text = "None";	
	}
	else
	{
		this.m_textArmour.m_text = this.m_character.GetValue(s_nodeNameCombatArmor).toFixed(1) + " / " + this.m_character.GetValue(s_nodeNameArmor).toFixed(1);
	}
		
	if (false == this.m_character.GetValue(s_nodeNameCombatAuraShieldActive))
	{
		this.m_textAura.m_text = "None";	
	}
	else
	{
		this.m_textAura.m_text = this.m_character.GetValue(s_nodeNameCombatAuraShield).toFixed(1) + " / " + this.m_character.GetValue(s_nodeNameAuraShield).toFixed(1);
	}	
}

GuiGameCharacterInfo.prototype.Tick = function(in_timeDelta)
{
	if (false == this.m_visible)
	{
		return;
	}
	this.UpdateStats();
	this.m_arrayGui.forEach(function(in_item){ if (in_item.Tick){ in_item.Tick(in_timeDelta); } });
	this.m_time += in_timeDelta;
}

GuiGameCharacterInfo.prototype.Draw = function(in_context, in_canvas)
{
	if (false == this.m_visible)
	{
		return;
	}
	
	in_context.fillStyle = this.m_gameBackground;
	in_context.fillRect(
		this.m_pixelOrigin.m_x, 
		this.m_pixelOrigin.m_y, 
		this.m_pixelSize.m_x, 
		this.m_pixelSize.m_y
		);

	this.m_arrayGui.forEach(function(in_item){ if (in_item.Draw){ in_item.Draw(in_context, in_canvas); } });

	in_context.strokeStyle = "#b27c4d";
	in_context.strokeRect(
		this.m_pixelOrigin.m_x, 
		this.m_pixelOrigin.m_y, 
		this.m_pixelSize.m_x, 
		this.m_pixelSize.m_y
		);
		
	var action = s_gameDrawAction.e_idle;
	if (false == this.m_character.GetValue(s_nodeNameCombatAlive))
	{
		action = s_gameDrawAction.e_dead;
	}
	GameDrawCharacter(
		in_context, 
		in_canvas, 
		new Vector(this.m_pixelOrigin.m_x + this.m_pixelSize.m_x - 50, this.m_pixelOrigin.m_y + this.m_pixelSize.m_y - 5), 
		new Vector(50, 50), 
		this.m_flip, 
		this.m_character, 
		action, 
		this.m_time 
		);
				
}
