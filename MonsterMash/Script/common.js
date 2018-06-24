function GetDotProduct(in_x0, in_y0, in_x1, in_y1)
{
    return ((in_x0 * in_x1) + (in_y0 * in_y1));
}

function GetLengthSquared(in_x, in_y)
{
    return GetDotProduct(in_x, in_y, in_x, in_y);
}

Array.prototype.remove = function(in_from, in_to)
{
    var rest = this.slice((in_to || in_from) + 1 || this.length);
    this.length = in_from < 0 ? this.length + in_from : in_from;
    return this.push.apply(this, rest);
};

Array.prototype.removeItem = function(in_item)
{
    var index = this.indexOf(in_item);
    if (-1 != index)
	this.remove(index, 1);
    return;
};

var g_id = 0;
function GetUniqueId()
{
    ++g_id;
    return g_id;
};