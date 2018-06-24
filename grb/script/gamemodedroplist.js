//gamemodedroplist.js

//in_dataExchangeObject contract
// GetSelectedKey
// SetSelectedKey
// GetArrayListData
// GetDisplayCount

function GameModeDropList(in_game, in_pixelOrigin, in_pixelSize, in_dataExchangeObject, in_font)
{
	//DEBUG if ( !(this instanceof GameModeDropList) )
	//DEBUG {
	//DEBUG 	alert("GameModeDropList: call constuctor with new keyword");
	//DEBUG }
	
	if (undefined == in_font)
	{	
		in_font = GuiTextGetDefaultFont();
	}

	this.m_game = in_game;
	this.m_dataExchangeObject = in_dataExchangeObject;

	this.m_game.SetEnableMouseRepeat(false);
	this.m_guiList = new GuiList(
			in_pixelOrigin, 
			in_pixelSize, 
			in_dataExchangeObject.GetArrayListData(), 
			in_dataExchangeObject.GetDisplayCount(), 
			in_game.m_context, 
			this, 
			"CallbackListRollover", 
			"CallbackListClick"
			);
	this.m_guiList.m_softShadow = false;	
	this.m_guiList.m_font = in_font;
	this.m_guiList.FitKeyInView(in_dataExchangeObject.GetSelectedKey());
	this.m_guiList.Tick(0.0);
		
	this.CallbackListRollover = function(in_data)
	{
		in_data.m_selected = true;
	}
		
	this.CallbackListClick = function(in_data)
	{
		in_dataExchangeObject.SetSelectedData(in_data);
		this.m_game.SetEnableMouseRepeat(true);
		this.m_game.PopGameMode();
		g_mouseEdge = false; //consume click
	}

	this.Tick = function(in_timeDelta)
	{
		this.m_guiList.ClearSelectedAll();
		this.m_guiList.Tick(in_timeDelta);
		
		if ((true == g_mouseDown) &&
			(true == g_mouseEdge))
		{	
			//click outside 
			this.m_game.SetEnableMouseRepeat(true);
			this.m_game.PopGameMode();		
		}
	}
	
	this.Draw = function(in_context, in_canvas)
	{
		this.m_guiList.Draw(in_context, in_canvas);
	}
}

//-- END // End Concatinate, unit test or other follows
