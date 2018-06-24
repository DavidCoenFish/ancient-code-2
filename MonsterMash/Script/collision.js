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
