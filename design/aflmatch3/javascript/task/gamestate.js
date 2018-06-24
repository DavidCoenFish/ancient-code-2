Task.GameState = function(_playerTurn)
{
	if ( !(this instanceof Task.GameState) )
		alert("Task.GameState: call constuctor with new keyword");	

	// which player has possesion is the player that has the turn
	this.m_playerTurn = (undefined == _playerTurn) ? Task.GameState.s_players.Player1 : _playerTurn;
	this.m_time = 0;
	this.m_playerData = {
		0 : Task.GameStatePlayer.FactoryRaw("Player 1"),
		1 : Task.GameStatePlayer.FactoryRaw("Player 2")
	};
	this.m_distance = 0;
	this.m_extraTurn = 0;
	this.m_lastEventWasSpoil = false;

	this.m_commentIndex = 0;
	this.m_comment = [
		" Fighting for possession after the openeing ruck.",
		"",
		"",
		"",
		""
		];

	this.m_arrayToken = [];
	for (var index = 0; index < Task.Token.s_token.Count; ++index)
	{
		this.m_arrayToken.push(0); 
	}
}

Task.GameState.s_halfGroundLength = 80;

// player 1 goal is at -80m
// player 2 goal is at 80m

//player 1 is tring to score at opponents goal at 80m
//player 2 is tring to score at opponents goal at -80m

Task.GameState.s_players = 
{
	"Player1" : 0,
	"Player2" : 1
}

Task.GameState.prototype.GetTimeText = function()
{
	return "Q1 " + Math.floor(this.m_time / 60) + ":" + Math.floor(this.m_time % 60);
}

Task.GameState.prototype.GetStateText = function()
{
	if (this.m_playerTurn == Task.GameState.s_players.Player1)
	{
		return "" + this.m_playerData[this.m_playerTurn].m_name + " turn, " + (Task.GameState.s_halfGroundLength - this.m_distance) + "m away from the opposition goal.";
	}
	return "" + this.m_playerData[this.m_playerTurn].m_name + " turn, " + (this.m_distance + Task.GameState.s_halfGroundLength) + "m away from the opposition goal.";
}

Task.GameState.prototype.IsPlayerTurn = function(in_player)
{
	return (in_player == this.m_playerTurn);
}

Task.GameState.prototype.GetPlayerName = function(in_player)
{
	return this.m_playerData[in_player].m_name;
}

//called once for a set of token matches
Task.GameState.prototype.MatchProcessNew = function()
{
	for (var index = 0; index < this.m_comment.length; ++index)
	{
		this.m_comment[index] = "";
	}	
	this.m_commentIndex = 0;
}
Task.GameState.prototype.MatchProcessStart = function()
{
	for (var index = 0; index < Task.Token.s_token.Count; ++index)
	{
		this.m_arrayToken[index] = 0; 
	}
}

Task.GameState.prototype.MatchProcessAddToken = function(in_token)
{
	this.m_arrayToken[in_token] += 1; 	
}

//still same turn, but a new set of matches after tokens have dropped
Task.GameState.prototype.MatchProcessEndStep = function()
{
	for (var index = 0; index < Task.Token.s_token.Count; ++index)
	{
		var count = this.m_arrayToken[index];
		if (0 == count)
			continue;

		this.m_time += count;

		switch (index)
		{
		default:
		case Task.Token.s_token.AddTurn:
			this.CommitAddTurn(count);
			break; 
		case Task.Token.s_token.MoveForward:
			this.CommitMoveForward(count);
			break; 
		case Task.Token.s_token.MoveSide:
			this.CommitMoveSide(count);
			break; 
		case Task.Token.s_token.Spoil:
			this.CommitSpoil(count);
			break; 
		case Task.Token.s_token.GiveTurn:
			this.CommitGiveTurn(count);
			break; 
		}
	}
}

Task.GameState.prototype.AddComment = function(in_comment)
{
	this.m_comment[this.m_commentIndex] += in_comment;
}

Task.GameState.prototype.NewCommentLine = function()
{
	this.m_commentIndex += 1;
	while (this.m_comment.length <= this.m_commentIndex)
	{
		this.m_comment.push("");
	}
	return;
}


Task.GameState.prototype.MatchProcessEnd = function()
{
	//do we have an extra turn, or did a spoil just happen which already ended turn
	if ((0 < this.m_extraTurn) || (this.m_lastEventWasSpoil))
	{
		this.m_extraTurn = 0;
		this.NewCommentLine();
		this.AddComment("" + this.GetPlayerName(this.m_playerTurn) + " continues possession");
	}
	else
	{
		this.SwapTurn();
		this.m_extraTurn = 0;
		this.NewCommentLine();
		this.AddComment("" + this.GetPlayerName(this.m_playerTurn) + " now has possession");
	}
}

Task.GameState.prototype.SwapTurn = function()
{
	if (this.m_playerTurn == Task.GameState.s_players.Player1)
		this.m_playerTurn = Task.GameState.s_players.Player2;
	else
		this.m_playerTurn = Task.GameState.s_players.Player1;
	return;
}

Task.GameState.prototype.AddDistance = function(in_distance)
{
	if (this.m_playerTurn == Task.GameState.s_players.Player1)
		this.m_distance += in_distance;
	else
		this.m_distance -= in_distance;
	return;
}

Task.GameState.prototype.CommitAddTurn = function(in_count)
{
	this.m_extraTurn += 1;
	var distance = 15 + (7.5 * in_count);
	this.AddDistance(distance);
	this.m_lastEventWasSpoil = false;
	if (this.TestGoal())
	{
		//NOP
	}
	else if (this.TestBehind())
	{
		//NOP
	}
	else
	{
		this.AddComment(" Mark by " + this.GetPlayerName(this.m_playerTurn) + ", gained " + distance + "m. ");
	}
}

Task.GameState.prototype.CommitMoveForward = function(in_count)
{
	var distance = 10 + (5 * in_count);
	this.AddDistance(distance);
	this.m_lastEventWasSpoil = false;
	if (this.TestGoal())
	{
		//NOP
	}
	else if (this.TestBehind())
	{
		//NOP
	}
	else
	{
		this.AddComment(" Forward play by " + this.GetPlayerName(this.m_playerTurn) + ", gained " + distance + "m. ");
	}
}

Task.GameState.prototype.CommitMoveSide = function(in_count)
{
	var distance = -10 + (2.5 * in_count);
	this.AddDistance(distance);
	this.m_lastEventWasSpoil = false;
	if (this.TestBehind())
	{
		//NOP
	}
	else if (this.OwnOut())
	{
		//NOP
	}
	else
	{
		this.AddComment(" Side play by " + this.GetPlayerName(this.m_playerTurn) + ", gained " + distance + "m. ");
	}
}

Task.GameState.prototype.CommitSpoil = function(in_count)
{
	var distance = -1 * in_count;
	this.AddDistance(distance);

	if (this.m_distance < -(Task.GameState.s_halfGroundLength))
	{
		this.m_distance = 5 -(Task.GameState.s_halfGroundLength);
	}
	else if (Task.GameState.s_halfGroundLength < this.m_distance)
	{
		this.m_distance = Task.GameState.s_halfGroundLength - 5;
	}

	this.SwapTurn();
	this.m_time += 10;
	this.NewCommentLine();
	this.AddComment(" Possesion gained by " + this.GetPlayerName(this.m_playerTurn) + ". ");
	this.m_lastEventWasSpoil = true;
}

Task.GameState.prototype.CommitGiveTurn = function(in_count)
{
	var distance = -2.5 * in_count;
	this.AddDistance(distance);
	this.SwapTurn();
	this.m_extraTurn = 1;

	if (this.m_distance < -(Task.GameState.s_halfGroundLength))
	{
		this.m_distance = 25 -(Task.GameState.s_halfGroundLength);
	}
	else if (Task.GameState.s_halfGroundLength < this.m_distance)
	{
		this.m_distance = Task.GameState.s_halfGroundLength - 25;
	}

	this.m_time += 20;
	this.NewCommentLine();
	this.AddComment(" Penalty awarded to " + this.GetPlayerName(this.m_playerTurn) + " and they now have possession. ");
	this.m_lastEventWasSpoil = false;

}

//player 1 is tring to score at opponents goal at 80m
//player 2 is tring to score at opponents goal at -80m

Task.GameState.prototype.TestGoal = function(in_count)
{
	var goal = false;
	if (this.m_playerTurn == Task.GameState.s_players.Player1)
	{
		goal = (Task.GameState.s_halfGroundLength < this.m_distance)
	}
	else
	{
		goal = (this.m_distance < -(Task.GameState.s_halfGroundLength))
	}

	if (goal)
	{
		this.m_time += 30;
		this.AddComment(" Goal by " + this.GetPlayerName(this.m_playerTurn));
		this.NewCommentLine();
		this.AddComment("Ball returned to center for ruck. ");
		this.m_playerData[this.m_playerTurn].m_goalCount += 1;
		this.m_distance = 0;
		return true;
	}

	return false;
}

Task.GameState.prototype.TestBehind = function(in_count)
{
	var behind = false;
	if (this.m_playerTurn == Task.GameState.s_players.Player1)
	{
		behind = (Task.GameState.s_halfGroundLength <= this.m_distance)
		if (behind)
			this.m_distance = Task.GameState.s_halfGroundLength - 15;
	}
	else
	{
		behind = (this.m_distance <= -(Task.GameState.s_halfGroundLength))
		if (behind)
			this.m_distance = 15 - Task.GameState.s_halfGroundLength;
	}

	if (behind)
	{
		this.m_time += 15;

		this.AddComment(" Behind by " + this.GetPlayerName(this.m_playerTurn));
		this.NewCommentLine();
		this.AddComment("Ball returned to play. ");
		this.m_playerData[this.m_playerTurn].m_behindCount += 1;
		return true;
	}

	return false;
}

Task.GameState.prototype.OwnOut = function(in_count)
{
	var behind = false;
	if (this.m_playerTurn == Task.GameState.s_players.Player1)
	{
		behind = (Task.GameState.s_halfGroundLength <= this.m_distance)
		if (behind)
			this.m_distance = Task.GameState.s_halfGroundLength - 15;
	}
	else
	{
		behind = (this.m_distance <= -(Task.GameState.s_halfGroundLength))
		if (behind)
			this.m_distance = 15 - Task.GameState.s_halfGroundLength;
	}

	if (behind)
	{
		this.m_time += 20;
		this.AddComment(" Own out by " + this.GetPlayerName(this.m_playerTurn));
		this.NewCommentLine();
		this.AddComment("Ball returned to play. ");
		return true;
	}

	return false;
}

Task.GameState.FactoryRaw = function(_playerTurn)
{
	return new Task.GameState(_playerTurn);
}
