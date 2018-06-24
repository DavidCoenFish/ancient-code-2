

function AblityTransport(in_parent)
{
    if (!(this instanceof AblityTransport))
	alert("AblityTransport: call constuctor with new keyword");
    
    this.m_experence = 0.0;
    this.m_level = 0;
    
    this.m_name = "Transport" + GetUniqueId();
    this.m_parent = in_parent; //so payload without parent can know where it started from?
    
    //this.m_arrayPayloadToTarget;
    this.m_payloadWithoutTarget = FactoryPayloadDictionary();
}

AblityTransport.prototype.GetValue = function(in_valueName)
{
	var value = 0.0;
	if ("area" == in_valueName)
	{	
		var totalPayload = 0.0;
		this.m_payloadWithoutTarget.forEach(function(in_item)
		{
    		totalPayload += in_item;
		});   
	}
	
	return value;
};

//AblityTransport.prototype.GetMaxValueAccept = function(in_valueName)
//AblityTransport.prototype.AcceptValue = function(in_valueName, in_value)

AblityTransport.prototype.AddPayload = function(in_amount, in_payloadType)
{
    this.m_payloadWithoutTarget[in_payloadType] += in_amount;
};

AblityTransport.prototype.CollectWithoutPayload = function()
{
};

//collectTransportPayload;
