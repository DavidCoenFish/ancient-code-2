const ReferenceList = function(divToOccupy, type) {
	this.m_divToOccupy = divToOccupy;
	this.m_type = type;

	return;
}

ReferenceList.Factory = function(divToOccupy, type){
	var referenceList = new ReferenceList(divToOccupy, type);
	return referenceList;
}


