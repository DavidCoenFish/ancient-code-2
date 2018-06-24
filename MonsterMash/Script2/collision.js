function CollisionPointPoint(
	in_lhsX,
	in_lhsY,
	in_rhsX,
	in_rhsY)
{
	return ((in_lhsX == in_rhsX) &&
			(in_lhsY == in_rhsY));
}

/*
 * return bool, true if circles are touching or intersecting
 */
function CollisionCircleCircle(
	in_lhsX,
	in_lhsY,
	in_lhsRadius,
	in_rhsX,
	in_rhsY,
	in_rhsRadius)
{
	return CollisionCirclePoint(
		in_lhsX,
		in_lhsY,
		in_lhsRadius + in_rhsRadius,
		in_rhsX,
		in_rhsY);
}

/*
 * return bool, true if point is touching or intersecting circle
 */
function CollisionCirclePoint(in_lhsX, in_lhsY, in_lhsRadius, in_rhsX, in_rhsY)
{
	var distanceSquared = GetLengthSquared(in_lhsX - in_rhsX, in_lhsY - in_rhsY);
	return (distanceSquared <= (in_lhsRadius * in_lhsRadius));
}

function CollisionBoxCircle(
	in_lhsLeft,
	in_lhsTop,
	in_lhsRight,
	in_lhsBottom,
	in_rhsX,
	in_rhsY,
	in_rhsRadius)
{
	return CollisionCirclePoint(
		in_rhsX,
		in_rhsY,
		in_rhsRadius,
		Clamp(in_rhsX, in_lhsLeft, in_lhsRight),
		Clamp(in_rhsY, in_lhsTop, in_lhsBottom)		
		);
}

function CollisionBoxBox(
	in_lhsLeft,
	in_lhsTop,
	in_lhsRight,
	in_lhsBottom,
	in_rhsLeft,
	in_rhsTop,
	in_rhsRight,
	in_rhsBottom
	)
{
	return ((in_lhsLeft <= in_rhsRight) && 
			(in_rhsLeft <= in_lhsRight) && 
			(in_lhsTop <= in_rhsBottom) &&
			(in_rhsTop <= in_lhsBottom));
}

function CollisionBoxPoint(
	in_left,
	in_top,
	in_right,
	in_bottom,
	in_pointX,
	in_pointY)
{
	return ((in_left <= in_pointX) && (in_pointX <= in_right)
			&& (in_top <= in_pointY) && (in_pointY <= in_bottom));
}

function FindCommonPointCircleCircle(
	in_lhsX,
	in_lhsY,
	in_lhsRadius,
	in_rhsX,
	in_rhsY,
	in_rhsRadius)
{
	// shall we make a simple bail case for mid point inside each?
	var resultX = in_lhsX;
	var resultY = in_lhsY;
	// bisect
	var distanceSquared = GetLengthSquared(in_lhsX - in_rhsX, in_lhsY - in_rhsY);
	if (0.0 != distanceSquared)
	{
		var distance = Math.sqrt(distanceSquared);
		var overlap = distance - (in_lhsRadius + in_rhsRadius);
		var bisectAtDistance = in_lhsRadius - (overlap * 0.5);

		var mul = bisectAtDistance / distance;
		resultX = in_lhsX + ((in_rhsX - in_lhsX) * mul);
		resultY = in_lhsY + ((in_rhsY - in_lhsY) * mul);
	}

	return new Vector(resultX, resultY);
}

//-- END // unit test or other follows
/////////////////////////////////////////////////////////////////////////
//Unit testbed
if (window.g_arrayUnitTest)
{
    var out_object = {};
    out_object.UnitTest = function()
    {
		var result = true;

        if (true == result)
        {
        	if (!result)
        		return "Fail construction";
        }
        
        if (true != result)
    	    return "Fail:Collision";
	    return "Pass:Collision";
    };

	g_arrayUnitTest.push(out_object);
}

