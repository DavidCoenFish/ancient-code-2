/*

	menu manager
		menu
			slice
			icon

system menu (start screen)
	login
	logout
	guest
	new account (if not logged in)
	preferences
	credits
	help
home (once logged in, start screen? default screen for guest)
	new character
	resume character
	info
	preferences
	system menu
new character (race)
	dwarf
	hob
	human
	gnome
	goblin
	ork
	fae
	elf
gender
	male
	female
	both
	neither
mainMenu
	character
	action
	navigation
	npc
	options

character
	name
	stats
	combat
	alignment
	inventory
	class
	equipt		


*/
Task.LQMockMenu00 = function(in_framework)
{
	if ( !(this instanceof Task.LQMockMenu00) )
		alert("Task.LQMockMenu00: call constuctor with new keyword");	

	this.m_font = in_framework.m_asset.GetFont("Constructa", in_framework.m_context);

	this.m_gui = DSC.Framework.Asset.Gui.FactoryRaw(in_framework);
	this.m_continue = true;
	var that = this;
	this.m_gui.GetRoot().Add(DSC.Framework.Asset.Gui.Button.FactoryRaw(
		DSC.Framework.Asset.Gui.s_state.e_default,
		DSC.Math.Coordinate.FactoryRaw(1.0, 0.0, undefined, -100, 10), 
		DSC.Math.Coordinate.FactoryRaw(0, 0, undefined, 90, 20),
		{	
			"CallbackDown" : function()
			{
				that.m_continue = false;
			}
		},
		[
			DSC.Framework.Asset.Gui.Drawable.FactoryWidget(
				in_framework, 
				"SimpleGui", 
				DSC.Framework.Asset.Widget.s_key.TPannel,
				DSC.Framework.Asset.Gui.s_state.e_static,
				DSC.Framework.Asset.Gui.s_subState.e_background
				),
			DSC.Framework.Asset.Gui.Text.FactoryRaw(
				in_framework.m_asset.GetFont("AngiesNewHouse", in_framework.m_context), 
				DSC.Framework.Asset.Gui.s_state.e_default, 
				DSC.Framework.Asset.Gui.s_subState.e_foreground,
				"Exit", 
				DSC.Math.Coordinate.FactoryRaw(0.125, 0.0), 
				DSC.Math.Coordinate.FactoryRaw(2.0, 2.0, DSC.Math.Coordinate.s_percentageType.e_useAxisY)
				)
		]
		));

	this.m_menuManager = Task.LQMockMenu00.Menu.Manager.FactoryRaw(this.m_gui)
	var menuManager = this.m_menuManager;

	this.m_menuManager.Add("SystemMenu", Task.LQMockMenu00.Menu.Factory(
		in_framework, 
		"SimpleGui", 
		[0.0, 0.0],
		0.6,
		undefined, //_content,
		[
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Login", undefined, 0.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "New Account", undefined, 45.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Dismiss", undefined, 90.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Options", undefined, 135.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Guest", undefined, 180.0, function(){ menuManager.SetMenu("HomeMenu"); }),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Help", undefined, 225.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Credits", undefined, -45.0)
		]
		));

	this.m_menuManager.Add("HomeMenu", Task.LQMockMenu00.Menu.Factory(
		in_framework, "SimpleGui", [0.0, 0.0], 0.6,
		undefined, //_content,
		[
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Resume", undefined, 0.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "New", undefined, 45.0, function(){ menuManager.SetMenu("Race"); }),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Dismiss", undefined, 90.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Options", undefined, 135.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Info", undefined, 180.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Help", undefined, 225.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Back", undefined, -90.0, function(){ menuManager.SetMenu("SystemMenu"); })
		]
		));

	this.m_menuManager.Add("Race", Task.LQMockMenu00.Menu.Factory(
		in_framework, "SimpleGui", [0.0, 0.0], 0.6,
		undefined, //_content,
		[
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Dismiss", undefined, 90.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Back", undefined, -90.0, function(){ menuManager.SetMenu("HomeMenu"); }),

			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Goblin", undefined, 54.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Ork", undefined, 18.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Fae", undefined, -18.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Elf", undefined, -54.0),

			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Dwarf", undefined, 126.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Hob", undefined, 162.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Human", undefined, -162.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Gnome", undefined, -126.0),
		]
		));

	this.m_menuManager.Add("Race", Task.LQMockMenu00.Menu.Factory(
		in_framework, "SimpleGui", [0.0, 0.0], 0.6,
		undefined, //_content,
		[
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Dismiss", undefined, 90.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Back", undefined, -90.0, function(){ menuManager.SetMenu("HomeMenu"); }),

			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Goblin", undefined, 54.0, function(){ menuManager.SetMenu("Gender"); }),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Ork", undefined, 18.0, function(){ menuManager.SetMenu("Gender"); }),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Fae", undefined, -18.0, function(){ menuManager.SetMenu("Gender"); }),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Elf", undefined, -54.0, function(){ menuManager.SetMenu("Gender"); }),

			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Dwarf", undefined, 126.0, function(){ menuManager.SetMenu("Gender"); }),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Hob", undefined, 162.0, function(){ menuManager.SetMenu("Gender"); }),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Human", undefined, -162.0, function(){ menuManager.SetMenu("Gender"); }),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Gnome", undefined, -126.0, function(){ menuManager.SetMenu("Gender"); }),
		]
		));

	this.m_menuManager.Add("Gender", Task.LQMockMenu00.Menu.Factory(
		in_framework, "SimpleGui", [0.0, 0.0], 0.6,
		undefined, //_content,
		[
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Dismiss", undefined, 90.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Back", undefined, -90.0, function(){ menuManager.SetMenu("Race"); }),

			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Male", undefined, 30.0, function(){ menuManager.SetMenu("MainMenu"); }),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Both", undefined, -30.0, function(){ menuManager.SetMenu("MainMenu"); }),

			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Female", undefined, 150.0, function(){ menuManager.SetMenu("MainMenu"); }),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Neither", undefined, -150.0, function(){ menuManager.SetMenu("MainMenu"); }),
		]
		));

	this.m_menuManager.Add("MainMenu", Task.LQMockMenu00.Menu.Factory(
		in_framework, "SimpleGui", [0.0, 0.0], 0.6,
		undefined, //_content,
		[
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Dismiss", undefined, 90.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Back", undefined, -90.0, function(){ menuManager.SetMenu("Gender"); }),

			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Character", undefined, 45.0, function(){ menuManager.SetMenu("Character"); }),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Action", undefined, 0.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Navigation", undefined, -45.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Npc", undefined, 180.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Options", undefined, 135.0),
		]
		));

	this.m_menuManager.Add("Character", Task.LQMockMenu00.Menu.Factory(
		in_framework, "SimpleGui", [0.0, 0.0], 0.6,
		undefined, //_content,
		[
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Dismiss", undefined, 90.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Back", undefined, -90.0, function(){ menuManager.SetMenu("MainMenu"); }),

			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Name", undefined, 18.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Stats", undefined, -18.0, function(){ menuManager.SetMenu("Stats"); }),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Combat", undefined, -54.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Alignment", undefined, 54.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Inventory", undefined, 126.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Class", undefined, -126.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Equipt", undefined, 162.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Magic", undefined, -162.0),
		]
		));


	this.m_menuManager.Add("Stats", Task.LQMockMenu00.Menu.Factory(
		in_framework, "SimpleGui", [0.0, 0.0], 0.6,
		undefined, //_content,
		[
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Dismiss", undefined, 90.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "Back", undefined, -90.0, function(){ menuManager.SetMenu("Character"); }),

			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "+PS", undefined, 67.5),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "+ST", undefined, 45.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "+AG", undefined, 22.5),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "+MD", undefined, 0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "+PC", undefined, -22.5),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "+WP", undefined, -45.0),
			Task.LQMockMenu00.Menu.Slice.Factory(in_framework, "SimpleGui", "+FA", undefined, -67.5),
		]
		));

	this.m_menuManager.SetMenu("SystemMenu");

	return;
}

Task.LQMockMenu00.prototype.Run = function(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY)
{
	if (true != this.m_continue)
	{
		return false;
	}

	in_framework.m_context.SetViewport(_originX, _originY, _sizeX, _sizeY);
	in_framework.m_context.Clear(DSC.Math.Colour.s_grey);

	if (in_framework.m_averageFPS)
		this.m_font.Draw(in_framework.m_context, "FPS: " + in_framework.m_averageFPS.toFixed(1), -0.95, 0.975, 24 / _sizeX, 24 / _sizeY);

	this.m_gui.Run(in_framework, in_timeDelta, _originX, _originY, _sizeX, _sizeY);

	return true;
}

Task.LQMockMenu00.FactoryRaw = function(in_framework)
{
	return new Task.LQMockMenu00(in_framework);
}
