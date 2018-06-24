/*
*/
Task.LQMockMenu00.Menu.Manager = function(
	in_gui,
	_map
	)
{
	if ( !(this instanceof Task.LQMockMenu00.Menu.Manager) )
		alert("Task.LQMockMenu00.Menu.Manager: call constuctor with new keyword");	

	this.m_gui = in_gui;
	this.m_map = (undefined == _map) ? {} : _map;
	this.m_activeMenu = undefined;

	return;
}

Task.LQMockMenu00.Menu.Manager.prototype.Add = function(in_name, in_menu)
{
	this.m_map[in_name] = in_menu;
	return;
}

Task.LQMockMenu00.Menu.Manager.prototype.SetMenu = function(_name)
{
	if (undefined != this.m_activeMenu)
		this.m_gui.GetRoot().Remove(this.m_activeMenu);
	
	this.m_activeMenu = undefined;

	if (_name in this.m_map)
	{
		this.m_activeMenu = this.m_map[_name];
		this.m_gui.GetRoot().Add(this.m_activeMenu);
	}

	return;
}

Task.LQMockMenu00.Menu.Manager.FactoryRaw = function(
	in_gui,
	_map
	)
{
	return new Task.LQMockMenu00.Menu.Manager(
		in_gui,
		_map
		);
}
