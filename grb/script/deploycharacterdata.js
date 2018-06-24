// deploycharacterdata.js

function DeployCharacterData(in_position, in_flipped, in_characterIndex)
{
	//DEBUG if ( !(this instanceof DeployCharacterData) )
	//DEBUG {
	//DEBUG 	alert("DeployCharacterData: call constuctor with new keyword");	
	//DEBUG }
	
	this.m_position = in_position;
	this.m_flipped = in_flipped;
	this.m_key = in_characterIndex;

}

