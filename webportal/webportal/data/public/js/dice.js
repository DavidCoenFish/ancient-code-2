const Dice = {};

Dice.Roll = function(randomStream, sides){
	return Dice._Roll(randomStream.Random(), sides);
}

Dice._Roll = function(randomValue, sides){
	return Math.floor(randomValue * sides) + 1;
}


Dice.Rolls = function(randomStream, sides, count){
	var sum = 0;
	if ((0 < sides) && (0 < count)){
		for (var index = 0; index < count; ++index){
			sum += Dice.Roll(randomStream, sides);
		}
	}
	return sum;
}

Dice.RollsArrayRandom = function(arrayRandomValue, randomIndex, sides, count){
	var sum = 0;
	if ((0 < sides) && (0 < count)){
		for (var index = 0; index < count; ++index){
			var value = arrayRandomValue[randomIndex];
			randomIndex = (randomIndex + 1) % arrayRandomValue.length;
			sum += Dice._Roll(value, sides);
		}
	}
	return sum;
}

