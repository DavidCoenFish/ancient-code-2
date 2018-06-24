Task.GameBoard = function()
{
	if ( !(this instanceof Task.GameBoard) )
		alert("Task.GameBoard: call constuctor with new keyword");	

	this.m_data = [];
	for (var index = 0; index < Task.GameBoard.s_width; ++index)
	{
		var data = [];
		for (var subIndex = 0; subIndex < Task.GameBoard.s_height; ++subIndex)
		{	
			data.push(undefined);
		}
		this.m_data.push(data);
	}

	//fill board without causing a match
	for (var index = 0; index < Task.GameBoard.s_width; ++index)
	{
		for (var subIndex = 0; subIndex < Task.GameBoard.s_height; ++subIndex)
		{	
			var token = Task.Token.FactoryRandom();
			for (var inner = 0; inner < Task.Token.s_token.Count; ++inner)
			{
				if (!this.CauseMatch(index, subIndex, token))
				{
					this.SetToken(index, subIndex, token);
					break;
				}
				else
				{
					token.m_token = (token.m_token + 1) % Task.Token.s_token.Count;
				}
			}
		}
	}

	this.m_allowInput = false;

	this.m_selectLhsX;
	this.m_selectLhsY;
	this.m_selectRhsX;
	this.m_selectRhsY;
	this.m_dropping = false;
}

Task.GameBoard.s_width = 8;
Task.GameBoard.s_height = 8;

Task.GameBoard.prototype.Draw = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	in_framework.m_context.save();
	in_framework.m_context.beginPath();
	in_framework.m_context.rect(_originX, _originY, _sizeX, _sizeY);
	in_framework.m_context.closePath();
	in_framework.m_context.clip();
	in_framework.m_context.lineWidth = 2;
	in_framework.m_context.globalAlpha = 0.8;

	var stepX = _sizeX / Task.GameBoard.s_width;
	var stepY = _sizeY / Task.GameBoard.s_height;
	for (var index = 0; index < Task.GameBoard.s_width; ++index)
	{
		for (var subIndex = 0; subIndex < Task.GameBoard.s_height; ++subIndex)
		{	
			var token = this.m_data[index][subIndex];
			if (!token)
				continue;
			token.Draw(in_framework, in_timeDelta, _originX + (stepX * index), _originY + (stepY * (Task.GameBoard.s_height - subIndex - 1)), stepX, stepY);
		}
	}

	in_framework.m_context.strokeStyle = "#000000";
	in_framework.m_context.strokeRect(_originX, _originY, _sizeX, _sizeY);
	in_framework.m_context.restore();

	return;
}

Task.GameBoard.prototype.GetToken = function(in_x, in_y)
{
	if ((0 <= in_x) &&
		(in_x < this.m_data.length))
	{
		var column = this.m_data[in_x];
		if ((0 <= in_y) &&
			(in_y < column.length))
			return column[in_y];
	}

	return undefined;
}

Task.GameBoard.prototype.SetToken = function(in_x, in_y, in_token)
{
	if ((0 <= in_x) &&
		(in_x < this.m_data.length))
	{
		var column = this.m_data[in_x];
		if ((0 <= in_y) &&
			(in_y < column.length))
			column[in_y] = in_token;
	}

	return;
}

Task.GameBoard.Match = function(in_tokenOne, in_tokenTwo, in_tokenThree)
{
	if ((undefined != in_tokenOne) && 
		(undefined != in_tokenTwo) &&
		(undefined != in_tokenThree))
	{
		if ((in_tokenThree.m_token == in_tokenTwo.m_token) && 
			(in_tokenThree.m_token == in_tokenOne.m_token))
			return true;
	}

	return false;
}

Task.GameBoard.s_matchOffset = [
	[[0, 2], [0, 1]],
	[[0, -1], [0, 1]],
	[[0, -2], [0, -1]],
	[[2, 0], [1, 0]],
	[[1, 0], [-1, 0]],
	[[-2, 0], [-1, 0]]
];

Task.GameBoard.prototype.CauseMatch = function(in_x, in_y, in_token)
{
	var match = false;

	var one = this.GetToken(in_x - 2, in_y);
	var two = this.GetToken(in_x - 1, in_y);
	if (Task.GameBoard.Match(in_token, one, two))
		return true;

	var one = this.GetToken(in_x - 1, in_y);
	var two = this.GetToken(in_x + 1, in_y);
	if (Task.GameBoard.Match(in_token, one, two))
		return true;

	one = this.GetToken(in_x + 2, in_y);
	two = this.GetToken(in_x + 1, in_y);
	if (Task.GameBoard.Match(in_token, one, two))
		return true;

	one = this.GetToken(in_x, in_y - 2);
	two = this.GetToken(in_x, in_y - 1);
	if (Task.GameBoard.Match(in_token, one, two))
		return true;

	one = this.GetToken(in_x, in_y - 1);
	two = this.GetToken(in_x, in_y + 1);
	if (Task.GameBoard.Match(in_token, one, two))
		return true;

	one = this.GetToken(in_x, in_y + 2);
	two = this.GetToken(in_x, in_y + 1);
	if (Task.GameBoard.Match(in_token, one, two))
		return true;

	return match;
}

Task.GameBoard.prototype.CauseMatchPair = function(in_rhsX, in_rhsY, in_lhsX, in_lhsY)
{
	for (var axis = 0; axis < Task.GameBoard.s_matchOffset.length; ++axis)
	{
		var data = Task.GameBoard.s_matchOffset[axis];
		var x0 = in_rhsX + data[0][0];
		var y0 = in_rhsY + data[0][1];
		var x1 = in_rhsX + data[1][0];
		var y1 = in_rhsY + data[1][1];
		if ((x0 == in_lhsX) &&
			(y0 == in_lhsY))
			continue;
		if ((x1 == in_lhsX) &&
			(y1 == in_lhsY))
			continue;
		
		var one = this.GetToken(x0, y0);
		var two = this.GetToken(x1, y1);
		var three = this.GetToken(in_lhsX, in_lhsY);
		if (Task.GameBoard.Match(one, two, three))
			return true;
	}
	for (var axis = 0; axis < Task.GameBoard.s_matchOffset.length; ++axis)
	{
		var data = Task.GameBoard.s_matchOffset[axis];
		var x0 = in_lhsX + data[0][0];
		var y0 = in_lhsY + data[0][1];
		var x1 = in_lhsX + data[1][0];
		var y1 = in_lhsY + data[1][1];
		if ((x0 == in_rhsX) &&
			(y0 == in_rhsY))
			continue;
		if ((x1 == in_rhsX) &&
			(y1 == in_rhsY))
			continue;
		
		var one = this.GetToken(x0, y0);
		var two = this.GetToken(x1, y1);
		var three = this.GetToken(in_rhsX, in_rhsY);
		if (Task.GameBoard.Match(one, two, three))
			return true;
	}

	return false;
}

Task.GameBoard.prototype.ProcessMatch = function(in_gameBoardX, in_gameBoardY, in_gameBoardWidth, in_gameBoardHeight, in_destinationArray, in_gameState)
{
	//deselect all
	for (var index = 0; index < Task.GameBoard.s_width; ++index)
	{
		for (var subIndex = 0; subIndex < Task.GameBoard.s_height; ++subIndex)
		{
			var token = this.m_data[index][subIndex];
			if (!token)
				continue;
			token.m_selected = false;
		}
	}

	in_gameState.MatchProcessStart();

	//select those that match
	var found = {};
	for (var index = 0; index < Task.GameBoard.s_width; ++index)
	{
		for (var subIndex = 0; subIndex < Task.GameBoard.s_height; ++subIndex)
		{
			var token = this.m_data[index][subIndex];
			if (!token)
				continue;
			if (this.CauseMatch(index, subIndex, token))
			{
				token.m_selected = true;
				var destination = in_destinationArray[token.m_token];
				destination.m_tokenArray.push(Task.DestinationToken.FactoryRaw(
					token, destination.m_lastX, destination.m_lastY
					));
				destination.m_count += 1;
				in_gameState.MatchProcessAddToken(token.m_token);
			}
		}
	}

	in_gameState.MatchProcessEndStep();

	//send off undefined
	for (var index = 0; index < Task.GameBoard.s_width; ++index)
	{
		for (var subIndex = 0; subIndex < Task.GameBoard.s_height; ++subIndex)
		{
			var token = this.m_data[index][subIndex];
			if (!token)
				continue;
			if (token.m_selected)
			{				
				this.SetToken(index, subIndex, undefined);
				this.m_dropping = true;
			}
		}
	}

	//drop new
	for (var index = 0; index < Task.GameBoard.s_width; ++index)
	{
		var data = this.m_data[index]
		for (var subIndex = 0; subIndex < Task.GameBoard.s_height; ++subIndex)
		{
			var token = data[subIndex];
			if (undefined == token)
			{
				for (var moveIndex = subIndex + 1; moveIndex < Task.GameBoard.s_height; ++moveIndex)
				{
					var moveToken = data[moveIndex];
					if (undefined != moveToken)
					{
						data[subIndex] = moveToken;
						data[moveIndex] = undefined;
						moveToken.m_dropCountdown = (moveIndex - subIndex) * 0.125;
						break;
					}
				}
			}
			var token = data[subIndex];
			if (undefined == token)
			{
				data[subIndex] = Task.Token.FactoryRandom();
			}
		}
	}

	//select those that match
	for (var index = 0; index < Task.GameBoard.s_width; ++index)
	{
		for (var subIndex = 0; subIndex < Task.GameBoard.s_height; ++subIndex)
		{
			var token = this.m_data[index][subIndex];
			if (!token)
				continue;
			if (this.CauseMatch(index, subIndex, token))
			{
				token.Select();
			}
		}
	}

	return;
}

Task.GameBoard.prototype.Input = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY, in_destination, in_gameState)
{
	this.m_allowInput = true;
	for (var index = 0; index < Task.GameBoard.s_width; ++index)
	{
		for (var subIndex = 0; subIndex < Task.GameBoard.s_height; ++subIndex)
		{
			var token = this.m_data[index][subIndex];
			if (!token)
				continue;
			this.m_allowInput &= token.AllowInput();
		}
	}

	if (!this.m_allowInput)
		return 0;

	if (this.m_dropping)
	{
		this.m_dropping = false;
		this.ProcessMatch(_originX, _originY, _sizeX, _sizeY, in_destination, in_gameState);

		//started another drop
		if (this.m_dropping)
			return 0;

		return 2;
	}

	var stepX = _sizeX / Task.GameBoard.s_width;
	var stepY = _sizeY / Task.GameBoard.s_height;
	for (var index = 0; index < Task.GameBoard.s_width; ++index)
	{
		for (var subIndex = 0; subIndex < Task.GameBoard.s_height; ++subIndex)
		{	
			var token = this.m_data[index][subIndex];
			if (!token)
				continue;

			if (token.Input(in_framework, in_timeDelta, _originX + (stepX * index), _originY + (stepY * (Task.GameBoard.s_height - subIndex - 1)), stepX, stepY))
			{
				if (token.m_selected)
				{
					if (undefined == this.m_selectLhsX)
					{
						this.m_selectLhsX = index;
						this.m_selectLhsY = subIndex;
					}
					else
					{
						this.m_selectRhsX = index;
						this.m_selectRhsY = subIndex;
					}

					if ((undefined != this.m_selectLhsX) && (undefined != this.m_selectRhsX))
					{
						return 1;
					}
				}
				else
				{
					if ((this.m_selectLhsX == index) &&
						(this.m_selectLhsY == subIndex))
					{
						this.m_selectLhsX = undefined;
						this.m_selectLhsY = undefined;
					}
					else
					{
						this.m_selectLhsX = undefined;
						this.m_selectLhsY = undefined;
					}
				}
			}
		}
	}

	return 0;
}


Task.GameBoard.FactoryRaw = function()
{
	return new Task.GameBoard();
}
