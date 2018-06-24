//guigameslotitem.js

var s_guiGameSlotItemType = {
	"e_none" : 0,

	"e_mentalEmpty" : 1,
	"e_physicalEmpty" : 2,
	
	"e_physicalAttackMetalRange" : 25,
	"e_physicalAttackMetalTouch" : 26,
	"e_physicalAttackNometalRange" : 27,
	"e_physicalAttackNometalTouch" : 28,
	"e_physicalDefendMetal" : 29,
	"e_physicalDefendNometal" : 30,
	"e_physicalBuffSelf" : 31,
	
	"e_mentalAttackRange" : 50,
	"e_mentalAttackTouch" : 51,
	"e_mentalHealRange" : 52,
	"e_mentalHealTouch" : 53,
	"e_mentalHealSelf" : 54,
	"e_mentalDefend" : 55,
	"e_mentalBuffRange" : 56,
	"e_mentalBuffSelf" : 57
	
};

var s_arrayArrayDataPhysicalAttackRange = [		
	[ 0.575, 0.182, 0.63, 0.323, 0.65, 0.5, 0.63, 0.677, 0.575, 0.818 ],
	[ 0.24, 0.43, 0.27, 0.5, 0.24, 0.57 ],
	[ 0.76, 0.43, 0.79, 0.5, 0.76, 0.57 ], 
	[ 0.27, 0.5, 0.79, 0.5 ]
	];
var s_arrayArrayDataPhysicalAttackTouch = [
	[ 0.58, 0.66, 0.22, 0.22, 0.655, 0.586 ],
	[ 0.474, 0.767, 0.767, 0.474 ],
	[ 0.62, 0.62, 0.78, 0.78 ]
	];
var s_arrayArrayDataPhysicalDefend = [
	[ 0.5, 0.335, 0.657, 0.341, 0.63, 0.565, 0.556, 0.681, 0.5, 0.711, 0.444, 0.681, 0.373, 0.565, 0.343, 0.341, 0.5, 0.335 ], 
	[ 0.428, 0.413, 0.572, 0.413, 0.555, 0.540, 0.5, 0.626, 0.445, 0.540, 0.428, 0.413 ]
	];
var s_arrayArrayDataPhysicalBuff = [
	[ 0.46, 0.333, 0.54, 0.333, 0.54, 0.507, 0.46, 0.507, 0.42, 0.42, 0.46, 0.333 ],
	[ 0.27, 0.35, 0.21, 0.35, 0.2, 0.59, 0.8, 0.59, 0.79, 0.35, 0.73, 0.35 ], 
	[ 0.4, 0.59, 0.4, 0.8 ],
	[ 0.6, 0.59, 0.6, 0.8 ]
	];
var s_arrayArrayDataMentalAttackRange = [	
	[ 0.634, 0.5, 0.667, 0.442, 0.734, 0.442, 0.767, 0.5, 0.733, 0.558, 0.667, 0.558, 0.634, 0.5 ],
	[ 0.133, 0.463, 0.247, 0.436, 0.3, 0.455 ],
	[ 0.355, 0.568, 0.436, 0.596, 0.516, 0.568, 0.594, 0.393, 0.701, 0.349, 0.808, 0.393, 0.852, 0.5, 0.808, 0.607, 0.701, 0.651, 0.594, 0.607 ],
	[ 0.516, 0.432, 0.436, 0.404, 0.356, 0.432, 0.3, 0.545, 0.247, 0.564, 0.133, 0.547 ]
	];
var s_arrayArrayDataMentalAttackTouch = [
	[ 0.5, 0.2, 0.65, 0.24, 0.76, 0.35, 0.8, 0.5, 0.76, 0.65, 0.65, 0.76, 0.5, 0.8, 0.35, 0.76, 0.24, 0.65, 0.2, 0.5, 0.24, 0.35, 0.35, 0.24, 0.5, 0.2 ],
	[ 0.5, 0.3, 0.641, 0.356, 0.7, 0.5, 0.641, 0.641, 0.5, 0.7, 0.356, 0.641, 0.3, 0.5, 0.356, 0.356, 0.5, 0.3 ],
	[ 0.641, 0.356, 0.5, 0.7 ],
	[ 0.3, 0.5, 0.58, 0.5 ], 
	[ 0.4, 0.34, 0.4, 0.5 ],
	[ 0.5, 0.3, 0.5, 0.5 ]
	];
var s_arrayArrayDataMentalHeal = [
	[ 0.352, 0.204, 0.648, 0.204, 0.648, 0.352, 0.796, 0.352, 0.796, 0.648, 0.648, 0.648, 0.648, 0.796, 0.352, 0.796, 0.352, 0.648, 0.204, 0.648, 0.204, 0.352, 0.352, 0.352, 0.352, 0.204 ],
	[ 0.426, 0.426, 0.426, 0.278, 0.574, 0.278, 0.574, 0.426, 0.722, 0.426, 0.722, 0.574, 0.574, 0.574, 0.574, 0.722, 0.426, 0.722, 0.426, 0.574, 0.278, 0.574, 0.278, 0.426, 0.426, 0.426 ],
	[ 0.352, 0.5, 0.648, 0.5 ],
	[ 0.5, 0.352, 0.5, 0.648 ]
	];
var s_arrayArrayDataMentalDefend = [
	[ 0.5, 0.24, 0.742, 0.269, 0.699, 0.591, 0.609, 0.738, 0.5, 0.796, 0.391, 0.738, 0.301, 0.591, 0.258, 0.269, 0.5, 0.24 ],
	[ 0.5, 0.335, 0.657, 0.341, 0.63, 0.565, 0.556, 0.681, 0.5, 0.711, 0.444, 0.681, 0.373, 0.565, 0.343, 0.341, 0.5, 0.335 ],
	[ 0.428, 0.413, 0.572, 0.413, 0.555, 0.540, 0.5, 0.626, 0.445, 0.540, 0.428, 0.413 ]
	];
var s_arrayArrayDataMentalBuff = [
	[ 0.46, 0.333, 0.54, 0.333, 0.54, 0.507, 0.46, 0.507, 0.42, 0.42, 0.46, 0.333 ],
	[ 0.4, 0.8, 0.4, 0.59, 0.6, 0.59, 0.6, 0.8 ],
	[ 0.3, 0.7, 0.3, 0.5, 0.36, 0.5, 0.36, 0.268, 0.64, 0.268, 0.64, 0.5, 0.7, 0.5, 0.7, 0.7 ]
	];


function GuiGameSlotItem(in_pixelOrigin, in_pixelSize, in_type, in_visible, in_callbackTarget, in_callbackFunctionName)
{
	//DEBUG if ( !(this instanceof GuiGameSlotItem) )
	//DEBUG {
	//DEBUG 	alert("GuiGameSlotItem: call constuctor with new keyword");	
	//DEBUG }
	
	this.m_pixelOrigin = in_pixelOrigin;
	this.m_pixelSize = in_pixelSize;
	this.m_type = in_type;
	this.m_visible = in_visible;	
	this.m_rollover = false;	
	this.m_softShadow = true;
	this.m_callbackTarget = in_callbackTarget;
	this.m_callbackFunctionName = in_callbackFunctionName;

}

GuiGameSlotItem.prototype.Tick = function(in_timeDelta)
{
	if ((false == this.m_visible) ||
		(s_guiGameSlotItemType.e_none == this.m_type))
	{
		return;
	}
    this.m_rollover = ((this.m_pixelOrigin.m_x < g_mouseX) &&
          (g_mouseX < (this.m_pixelOrigin.m_x + this.m_pixelSize.m_x)) &&
          (this.m_pixelOrigin.m_y < g_mouseY) &&
          (g_mouseY < (this.m_pixelOrigin.m_y + this.m_pixelSize.m_y)));
          
    //call callback on mouse down
    if ((this.m_callbackTarget != null) &&
        g_mouseEdge &&
        g_mouseDown &&
        (true == this.m_rollover)
        )
    {
      g_mouseEdge = false; //consume mouse input
      this.m_rollover = false;
      this.m_callbackTarget[this.m_callbackFunctionName](this);      
    }        
}

GuiGameSlotItem.prototype.Draw = function(in_context, in_canvas)
{
	if ((false == this.m_visible) ||
		(s_guiGameSlotItemType.e_none == this.m_type))
	{
		return;
	}

	in_context.save();

	if (true == this.m_softShadow)
	{
		in_context.shadowBlur = 8;
		in_context.shadowOffsetX = 1;
		in_context.shadowOffsetY = 2;		
		if (true == this.m_rollover)
		{
			in_context.shadowColor = "#662c0e";
		}
		else
		{
			in_context.shadowColor = "#331607";
		}		
	}
	if (true == this.m_rollover)
	{
		in_context.strokeStyle = "#fde18f";
	}
	else
	{
		in_context.strokeStyle = "#b27c4d";	
	}

	switch (this.m_type)
	{
	case s_guiGameSlotItemType.e_mentalEmpty:
	case s_guiGameSlotItemType.e_physicalEmpty:

		break;
	default:
		if (true == this.m_rollover)
		{
			var gradient = in_context.createLinearGradient(0, this.m_pixelOrigin.m_y, 0, this.m_pixelOrigin.m_y + this.m_pixelSize.m_y);
			gradient.addColorStop(0.0, "#a75722");
			gradient.addColorStop(0.1, "#eb7b36");
			gradient.addColorStop(0.25, "#fde18f");
			gradient.addColorStop(0.4, "#fee8aa");
			gradient.addColorStop(0.65, "#934817");
			gradient.addColorStop(0.75, "#94521e");
			gradient.addColorStop(1.0, "#2a1102");
		}
		else
		{
			var gradient = in_context.createLinearGradient(0, this.m_pixelOrigin.m_y, 0, this.m_pixelOrigin.m_y + this.m_pixelSize.m_y);
			gradient.addColorStop(0.0, "#542c11");
			gradient.addColorStop(0.1, "#7d4221");
			gradient.addColorStop(0.25, "#b27c4d");
			gradient.addColorStop(0.4, "#c8ab71");
			gradient.addColorStop(0.65, "#49240b");
			gradient.addColorStop(0.75, "#49280f");
			gradient.addColorStop(1.0, "#231200");
		}
		in_context.strokeStyle = gradient;		
		in_context.fillStyle = gradient;		
	}
	
	in_context.lineWidth = (2.0 * 0.054 * this.m_pixelSize.m_x);
	in_context.lineJoin = "round";	
	
	switch (this.m_type)
	{
	case s_guiGameSlotItemType.e_mentalEmpty:
		var padX = 0.425 * this.m_pixelSize.m_x;
		var padY = 0.425 * this.m_pixelSize.m_y;	
		var baseX = (this.m_pixelOrigin.m_x + (0.5 * this.m_pixelSize.m_x));
		var baseY = (this.m_pixelOrigin.m_y + (0.5 * this.m_pixelSize.m_y));

		in_context.beginPath();
		in_context.moveTo(baseX, baseY - padY);
		in_context.lineTo(baseX + padX, baseY);
		in_context.lineTo(baseX, baseY + padY);
		in_context.lineTo(baseX - padX, baseY);
		in_context.closePath();
		in_context.stroke();
		break;
	
	case s_guiGameSlotItemType.e_physicalEmpty:
		var padX = 0.2 * this.m_pixelSize.m_x;
		var padY = 0.2 * this.m_pixelSize.m_y;
		in_context.strokeRect(
			this.m_pixelOrigin.m_x + padX, 
			this.m_pixelOrigin.m_y + padY, 
			this.m_pixelSize.m_x - (2.0 * padX), 
			this.m_pixelSize.m_y - (2.0 * padY)
			);				
		break;
		
	case s_guiGameSlotItemType.e_physicalAttackMetalRange:
	case s_guiGameSlotItemType.e_physicalAttackMetalTouch:
	case s_guiGameSlotItemType.e_physicalAttackNometalRange:
	case s_guiGameSlotItemType.e_physicalAttackNometalTouch:
	case s_guiGameSlotItemType.e_physicalDefendMetal:
	case s_guiGameSlotItemType.e_physicalDefendNometal:		
	case s_guiGameSlotItemType.e_physicalBuffSelf:	
		var padX = 0.2 * this.m_pixelSize.m_x;
		var padY = 0.2 * this.m_pixelSize.m_y;
				
		in_context.strokeRect(
			this.m_pixelOrigin.m_x + padX, 
			this.m_pixelOrigin.m_y + padY, 
			this.m_pixelSize.m_x - (2.0 * padX), 
			this.m_pixelSize.m_y - (2.0 * padY)
			);	
		in_context.shadowColor = "rgba(0,0,0,0)";	
		in_context.shadowBlur = 0;
		in_context.shadowOffsetX = 0;
		in_context.shadowOffsetY = 0;
			
		in_context.fillRect(
			this.m_pixelOrigin.m_x + padX, 
			this.m_pixelOrigin.m_y + padY, 
			this.m_pixelSize.m_x - (2.0 * padX), 
			this.m_pixelSize.m_y - (2.0 * padY)
			);			
			
		break;
		
	case s_guiGameSlotItemType.e_mentalAttackRange:
	case s_guiGameSlotItemType.e_mentalAttackTouch:
	case s_guiGameSlotItemType.e_mentalHealRange:
	case s_guiGameSlotItemType.e_mentalHealTouch:
	case s_guiGameSlotItemType.e_mentalHealSelf:
	case s_guiGameSlotItemType.e_mentalDefend:
	case s_guiGameSlotItemType.e_mentalBuffRange:
	case s_guiGameSlotItemType.e_mentalBuffSelf:
		var padX = 0.425 * this.m_pixelSize.m_x;
		var padY = 0.425 * this.m_pixelSize.m_y;	
		var baseX = (this.m_pixelOrigin.m_x + (0.5 * this.m_pixelSize.m_x));
		var baseY = (this.m_pixelOrigin.m_y + (0.5 * this.m_pixelSize.m_y));

		in_context.beginPath();
		in_context.moveTo(baseX, baseY - padY);
		in_context.lineTo(baseX + padX, baseY);
		in_context.lineTo(baseX, baseY + padY);
		in_context.lineTo(baseX - padX, baseY);
		in_context.closePath();
		in_context.stroke();
		in_context.shadowColor = "rgba(0,0,0,0)";	
		in_context.shadowBlur = 0;
		in_context.shadowOffsetX = 0;
		in_context.shadowOffsetY = 0;
		in_context.fill();
		
		break;
		
	default:
	}

	in_context.restore();

	//draw icon
	switch (this.m_type)
	{
	case s_guiGameSlotItemType.e_physicalAttackMetalRange:
	case s_guiGameSlotItemType.e_physicalAttackNometalRange:
		if (s_guiGameSlotItemType.e_physicalAttackMetalRange == this.m_type)
		{
			in_context.strokeStyle = "#a0a0a0";
		}	
		else
		{
			in_context.strokeStyle = "#e3c69d";
		}
		in_context.lineWidth = 2;
		
		CommonDrawPath(in_context, this.m_pixelOrigin, this.m_pixelSize, s_arrayArrayDataPhysicalAttackRange);

		in_context.stroke();			
		
		break;
	case s_guiGameSlotItemType.e_physicalAttackMetalTouch:
	case s_guiGameSlotItemType.e_physicalAttackNometalTouch:
		if (s_guiGameSlotItemType.e_physicalAttackMetalTouch == this.m_type)
		{
			in_context.strokeStyle = "#a0a0a0";
		}	
		else
		{
			in_context.strokeStyle = "#e3c69d";
		}	
		in_context.lineWidth = 2;

		CommonDrawPath(in_context, this.m_pixelOrigin, this.m_pixelSize, s_arrayArrayDataPhysicalAttackTouch);

		in_context.stroke();			
		
			
		break;
	case s_guiGameSlotItemType.e_physicalDefendMetal:
	case s_guiGameSlotItemType.e_physicalDefendNometal:	
		if (s_guiGameSlotItemType.e_physicalDefendMetal == this.m_type)
		{
			in_context.strokeStyle = "#a0a0a0";
		}	
		else
		{
			in_context.strokeStyle = "#e3c69d";
		}		
		in_context.lineWidth = 2;

		CommonDrawPath(in_context, this.m_pixelOrigin, this.m_pixelSize, s_arrayArrayDataPhysicalDefend);

		in_context.stroke();			
		
		break;
		
	case s_guiGameSlotItemType.e_physicalBuffSelf:	
		in_context.lineWidth = 2;
		in_context.strokeStyle = "#93ab76";

		CommonDrawPath(in_context, this.m_pixelOrigin, this.m_pixelSize, s_arrayArrayDataPhysicalBuff);

		in_context.stroke();			
		
		break;
	case s_guiGameSlotItemType.e_mentalAttackRange:
		in_context.lineWidth = 2;
		in_context.strokeStyle = "#a74596";

		CommonDrawPath(in_context, this.m_pixelOrigin, this.m_pixelSize, s_arrayArrayDataMentalAttackRange);
	
		in_context.stroke();		
	
		break;
	case s_guiGameSlotItemType.e_mentalAttackTouch:
		in_context.lineWidth = 2;
		in_context.strokeStyle = "#5466a7";

		CommonDrawPath(in_context, this.m_pixelOrigin, this.m_pixelSize, s_arrayArrayDataMentalAttackTouch);

		in_context.stroke();		
	
		break;
	case s_guiGameSlotItemType.e_mentalHealRange:
	case s_guiGameSlotItemType.e_mentalHealTouch:
	case s_guiGameSlotItemType.e_mentalHealSelf:
		if (s_guiGameSlotItemType.e_mentalHealRange == this.m_type)
		{
			in_context.strokeStyle = "#a74596";
		}	
		else if (s_guiGameSlotItemType.e_mentalHealTouch == this.m_type)
		{
			in_context.strokeStyle = "#5466a7";
		}	
		else
		{
			in_context.strokeStyle = "#93ab76";
		}	
	
		in_context.lineWidth = 2;
		
		CommonDrawPath(in_context, this.m_pixelOrigin, this.m_pixelSize, s_arrayArrayDataMentalHeal);

		in_context.stroke();	
	
		break;
	case s_guiGameSlotItemType.e_mentalDefend:
		in_context.lineWidth = 2;
		in_context.strokeStyle = "#93ab76";
	
		CommonDrawPath(in_context, this.m_pixelOrigin, this.m_pixelSize, s_arrayArrayDataMentalDefend);

		in_context.stroke();	

		break;
	case s_guiGameSlotItemType.e_mentalBuffRange:
	case s_guiGameSlotItemType.e_mentalBuffSelf:
		if (s_guiGameSlotItemType.e_mentalBuffRange == this.m_type)
		{
			in_context.strokeStyle = "#a74596";
		}	
		else
		{
			in_context.strokeStyle = "#93ab76";
		}		
	
		in_context.lineWidth = 2;
	
		CommonDrawPath(in_context, this.m_pixelOrigin, this.m_pixelSize, s_arrayArrayDataMentalBuff);

		in_context.stroke();	
	
		break;
		
	default:
	}
}

//-- END // End Concatinate, unit test or other follows

