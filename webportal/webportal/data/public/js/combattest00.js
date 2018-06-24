window.onload = function(){
	console.log("window.onload");

	var clientDatabase = new ClientDatabase("/combattest/collection/");
	var dataServer = GameObjectManagerDataServer.factory(clientDatabase, "combat_test_types", "combat_test_collections");
	var gameObjectManager = GameObjectManager.factory(dataServer);

	const applicationDiv = document.getElementById("applicationDiv");
	const combatListEditDiv = document.createElement("div");
	combatListEditDiv.id = "combatListEditDiv";
	const multiListEditDiv = document.createElement("div");
	const outputDiv = document.createElement("div");

	if (applicationDiv !== null) {
		applicationDiv.className = "flowhorizontal";

		applicationDiv.appendChild(combatListEditDiv);
		applicationDiv.appendChild(multiListEditDiv);
		applicationDiv.appendChild(outputDiv);
	}

	combatListEditDiv.className = "buttoncontainer appforeground";
	combatListEditDiv.style = "width: 600px; height: 400px; overflow: auto;";
	multiListEditDiv.className = "buttoncontainer appforeground";
	multiListEditDiv.style = "width: 600px; height: 400px; overflow: auto;";

	outputDiv.className = "appbackground";
	outputDiv.style = "width: 1200px; height: 300px; overflow: auto;";

	var dataServerResourceCombat = ResourceListDataServerResource.Factory({"combat" : "/combattest/combat"}, gameObjectManager);
	ResourceList.Factory(combatListEditDiv, combatListEditDiv, dataServerResourceCombat, gameObjectManager);

	var dataServerResourceAction = ResourceActionDataServer.Factory("combat", "/combattest/action/combat.", gameObjectManager);
	ResourceAction.Factory(outputDiv, dataServerResourceAction);


	ResourceListWrapperType.Factory(multiListEditDiv, {"character":"/combattest/character","monster":"/combattest/monster", "armor":"/combattest/armor"}, gameObjectManager);
	//dataServerResourceCharacter = ResourceListDataServerResource.Factory({"character":"/combattest/character","monster":"/combattest/monster"}, gameObjectManager);
	//ResourceList.Factory(characterListEditDiv, characterListEditDiv, dataServerResourceCharacter, gameObjectManager);

	//SetDivList(combatListEditDiv, "/combattest/combat", "combat", gameObjectManager);
	//SetDivList(characterListEditDiv, "/combattest/character", "character", gameObjectManager);
	//SetDivList(armorListEditDiv, "/combattest/armor", "armor", gameObjectManager);

	return;
}