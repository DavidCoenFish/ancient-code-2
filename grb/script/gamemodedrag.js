//gamemodedrag.js

//items in in_arrayDragTarget have the following contract
// Begin() optional
// Rollover(x, y) return bool
// Drop(in_dragItem)

function GameModeDrag(in_game, in_dragItem, in_dragOffset, in_arrayDragTarget, in_previousGameMode)
{
	//DEBUG if ( !(this instanceof GameModeDrag) )
	//DEBUG {
	//DEBUG 	alert("GameModeDrag: call constuctor with new keyword");
	//DEBUG }
	
	var that = this;
	this.m_minTime = 0.25;
	
	var m_game = in_game;
	var m_dragItem = in_dragItem;
	var m_dragOffset = in_dragOffset;
	var m_arrayDragTarget = in_arrayDragTarget;
	var m_previousGameMode = in_previousGameMode;
	var m_timer = 0.0;
	var m_startedDrag = false;
	var m_initialMouseX = g_mouseX;
	var m_initialMouseY = g_mouseY;

	//////////////////////////////////////////////////////
	//public methods with private access  
	this.Tick = function(in_timeDelta)
	{
		if (false == m_startedDrag)
		{
			m_timer += in_timeDelta;
			if ((this.m_minTime < m_timer) ||
				(1 < (Math.abs(m_initialMouseX - g_mouseX) + Math.abs(m_initialMouseY - g_mouseY))))
			{
				if (in_dragItem.StartDrag)
				{
					in_dragItem.StartDrag();
				}
				m_arrayDragTarget.forEach(function(in_item){
					if (in_item.Begin)
					{
						in_item.Begin();
					}
				});
				m_startedDrag = true;
			}
		}
				
		//drag finished
		if (false == g_mouseDown)
		{
			if (true == m_startedDrag)
			{
				//active drag finished, is cursor over a target
				var dropTarget = null;
				m_arrayDragTarget.forEach(function(in_item){
					if (true == in_item.Rollover(g_mouseX, g_mouseY))
					{
						dropTarget = in_item;
					}
				});
				
				if (null != dropTarget)
				{
					dropTarget.Drop(m_dragItem);
				}
			}
		
			m_game.PopGameMode();	
			return;
		}
		
		if (true == m_startedDrag)
		{
			if (m_dragItem.SetPosition)
			{
				m_dragItem.SetPosition(new Vector(g_mouseX + m_dragOffset.m_x, g_mouseY + m_dragOffset.m_y));
			}
		}
	}
	
	this.Draw = function(in_context, in_canvas)
	{
	    m_previousGameMode.Draw(in_context, in_canvas);
	    
	    if (true == m_startedDrag)
	    {
		    m_dragItem.Draw(in_context, in_canvas);
		}
	}
}

//-- END // End Concatinate, unit test or other follows


