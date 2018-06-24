Array.prototype.remove = function(in_index)
{
	if (in_index < 0)
		return this;
	var rest = this.slice(in_index + 1);
	this.length = Math.min(in_index, this.length); //do not expand on slice
	return this.push.apply(this, rest);
};

Array.prototype.removeItem = function(in_item)
{
	var index = this.indexOf(in_item);
	if (-1 != index)
		this.remove(index, 1);
	return;
};

// -- END // unit test or other follows
// ///////////////////////////////////////////////////////////////////////
// Unit testbed
if (window.g_arrayUnitTest)
{
	var out_object = {};
	out_object.UnitTest = function()
	{
		var result = true;

		//remove
		if (true == result)
		{
			var foo = [ 0, 1, 2, 3, 4, 5, 6 ];

			result &= (7 == foo.length);			
			result &= (2 == foo[2]);
			result &= (3 == foo[3]);
			
			foo.remove(3);
			
			result &= (6 == foo.length);			
			result &= (2 == foo[2]);
			result &= (4 == foo[3]);

			foo.remove(10);

			result &= (6 == foo.length);			
			result &= (2 == foo[2]);
			result &= (4 == foo[3]);
			
			foo.remove(-1);

			result &= (6 == foo.length);			
			result &= (2 == foo[2]);
			result &= (4 == foo[3]);

			if (!result)
				return "Fail remove";
		}

		//removeItem
		if (true == result)
		{
			var foo = [ 0, 1, 2, 3, 4, 5, 6 ];

			result &= (7 == foo.length);			
			result &= (2 == foo[2]);
			result &= (3 == foo[3]);
			
			foo.removeItem(3);
			
			result &= (6 == foo.length);			
			result &= (2 == foo[2]);
			result &= (4 == foo[3]);
			
			foo.removeItem(3);
			
			result &= (6 == foo.length);			
			result &= (2 == foo[2]);
			result &= (4 == foo[3]);
			
			if (!result)
				return "Fail removeItem";
		}

		
		if (true != result)
			return "Fail:Array";
		return "Pass:Array";
	};

	g_arrayUnitTest.push(out_object);
}
