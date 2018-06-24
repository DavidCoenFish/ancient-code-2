Task = function()
{
	if ( !(this instanceof Task) )
		alert("Task: call constuctor with new keyword");	

	this.m_gameBoard = Task.GameBoard.FactoryRaw();
	this.m_destination = []
	this.m_destination.push(Task.Destination.FactoryRaw("#00FF00", " mark"));
	this.m_destination.push(Task.Destination.FactoryRaw("#007777", " move forward"));
	this.m_destination.push(Task.Destination.FactoryRaw("#0000FF", " move side"));
	this.m_destination.push(Task.Destination.FactoryRaw("#770077", " spoil"));
	this.m_destination.push(Task.Destination.FactoryRaw("#FF0000", " penalty"));

	this.m_gameState = Task.GameState.FactoryRaw();
}

Task.prototype.Run = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	in_framework.m_context.save();
	in_framework.m_context.clearRect(_originX, _originY, _sizeX, _sizeY);

	if (in_framework.m_averageFPS)
	{
		in_framework.m_context.textBaseline = "top";
		in_framework.m_context.fillText("FPS:" + in_framework.m_averageFPS.toFixed(1), 4.0, 4.0);
	}

	{
		in_framework.m_context.textBaseline = "top";
		in_framework.m_context.fillText(this.m_gameState.GetTimeText(), 200.0, 4.0);
		in_framework.m_context.fillText(this.m_gameState.m_playerData[Task.GameState.s_players.Player1].GetScoreText(), 350.0, 4.0);
		in_framework.m_context.fillText(this.m_gameState.m_playerData[Task.GameState.s_players.Player2].GetScoreText(), 450.0, 4.0);
	}

	var comment;
	if (Task.s_playerTurn == 0)
	{
		comment = "player1's turn, play is " + Task.s_distanceGoal + " to the other teams' goal";
	}
	else
	{
		comment = "player2's turn, play is " + (160 - Task.s_distanceGoal) + " to the other teams' goal";
	}

	in_framework.m_context.fillText(this.m_gameState.GetStateText(), 200.0, 30.0);
	for (var index = 0; index < this.m_gameState.m_comment.length; ++index)
	{
		in_framework.m_context.fillText(this.m_gameState.m_comment[index], 4.0, 45.0 + (15.0 * index));
	}

	var gameBoardWidth = 420;
	var gameBoardHeight = 420;
	var gameBoardX = 90;
	var gameBoardY = 135;

	//deal input
	switch(this.m_gameBoard.Input(in_framework, in_timeDelta, gameBoardX, gameBoardY, gameBoardWidth, gameBoardHeight, this.m_destination, this.m_gameState))
	{
	default:
		break;
	case 1:
		this.DealInput(gameBoardX, gameBoardY, gameBoardWidth, gameBoardHeight);
		break;
	case 2:
		this.DealEnd(gameBoardX, gameBoardY, gameBoardWidth, gameBoardHeight);
		break;
	}

	//draw gameboard
	this.m_gameBoard.Draw(in_framework, in_timeDelta, gameBoardX, gameBoardY, gameBoardWidth, gameBoardHeight);

	var trace = 45;
	for (var index = 0; index < 5; ++index)
	{
		this.m_destination[index].Draw(in_framework, in_timeDelta, trace, 105, 105, 30);
		trace += 105;
	}

	in_framework.m_context.restore();
	return true;
}

Task.prototype.DealInput = function(in_gameBoardX, in_gameBoardY, in_gameBoardWidth, in_gameBoardHeight)
{
	//deselect 
	var lhs = this.m_gameBoard.GetToken(this.m_gameBoard.m_selectLhsX, this.m_gameBoard.m_selectLhsY);
	var rhs = this.m_gameBoard.GetToken(this.m_gameBoard.m_selectRhsX, this.m_gameBoard.m_selectRhsY);

	var difference = Math.abs(this.m_gameBoard.m_selectLhsX - this.m_gameBoard.m_selectRhsX) + Math.abs(this.m_gameBoard.m_selectLhsY - this.m_gameBoard.m_selectRhsY);
	var match = this.m_gameBoard.CauseMatchPair(this.m_gameBoard.m_selectRhsX, this.m_gameBoard.m_selectRhsY, this.m_gameBoard.m_selectLhsX, this.m_gameBoard.m_selectLhsY);
	if (lhs && rhs && (1 == difference) && match)
	{
		var stepX = in_gameBoardWidth / Task.GameBoard.s_width;
		var stepY = in_gameBoardHeight / Task.GameBoard.s_height;

		lhs.m_lastX = in_gameBoardX + (stepX * this.m_gameBoard.m_selectRhsX);
		lhs.m_lastY = in_gameBoardY + (stepY * (Task.GameBoard.s_height - this.m_gameBoard.m_selectRhsY - 1));
		rhs.m_lastX = in_gameBoardX + (stepX * this.m_gameBoard.m_selectLhsX);
		rhs.m_lastY = in_gameBoardY + (stepY * (Task.GameBoard.s_height - this.m_gameBoard.m_selectLhsY - 1));

		this.m_gameBoard.SetToken(this.m_gameBoard.m_selectRhsX, this.m_gameBoard.m_selectRhsY, lhs);
		this.m_gameBoard.SetToken(this.m_gameBoard.m_selectLhsX, this.m_gameBoard.m_selectLhsY, rhs);

		this.m_gameState.MatchProcessNew();

		//remove match
		this.m_gameBoard.ProcessMatch(in_gameBoardX, in_gameBoardY, in_gameBoardWidth, in_gameBoardHeight, this.m_destination, this.m_gameState);
	}

	if (lhs)
	{
		lhs.Deselect();
		this.m_gameBoard.m_selectLhsX = undefined;
		this.m_gameBoard.m_selectLhsY = undefined;
	}
	if (rhs)
	{
		rhs.Deselect();
		this.m_gameBoard.m_selectRhsX = undefined;
		this.m_gameBoard.m_selectRhsY = undefined;
	}
}

Task.prototype.DealEnd = function(in_gameBoardX, in_gameBoardY, in_gameBoardWidth, in_gameBoardHeight)
{
	for (var index = 0; index < this.m_destination.length; ++index)
		this.m_destination[index].m_count = 0;	
	this.m_gameState.MatchProcessEnd();
}

Task.FactoryRaw = function()
{
	return new Task();
}
