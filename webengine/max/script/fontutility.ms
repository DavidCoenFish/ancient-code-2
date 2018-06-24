--file:fontutility.ms
-------------------------------------------------------------
-- david coen fish_dsc@yahoo.co.uk
-- 2014-08-17
-------------------------------------------------------------

------------------------------------------------------
-- local methods
------------------------------------------------------
function _fnCharacterDataAppend &inout_characterData in_name in_width in_elementOffset in_elementCount =
(
	data = #()
	append data in_name
	append data ((in_width + 0.5) as integer)
	append data in_elementOffset
	append data in_elementCount
	append inout_characterData data
)

function _fnMeasureBounds &inout_maxDim in_mesh = 
(
	countVertex = getNumVerts in_mesh
	for index = 1 to countVertex do
	(
		vertex = getVert in_mesh index
		if (vertex.x < inout_maxDim[1].x) then
			inout_maxDim[1].x = vertex.x
		if (inout_maxDim[2].x < vertex.x) then
			inout_maxDim[2].x = vertex.x

		if (vertex.y < inout_maxDim[1].y) then
			inout_maxDim[1].y = vertex.y
		if (inout_maxDim[2].y < vertex.y) then
			inout_maxDim[2].y = vertex.y
	)
)

function _fnAppendVertexPool &inout_vertexPool in_gridX in_gridY =
(
	countVertex = inout_vertexPool.count
	for index = 1 to countVertex do
	(
		vertex = inout_vertexPool[index]
		if ((vertex.x == in_gridX) and (vertex.y == in_gridY)) then
			return index - 1
	)
	
	append inout_vertexPool [in_gridX, in_gridY]
	return countVertex
)

function _fnAppendVertexDump &inout_vertexDump in_vertex in_smallestX in_waterLine in_myDim = 
(
	--print ("vertex " +  (index as string) + " " + (in_vertex.x as string) + " " + (in_vertex.y as string))

	localNormalX = ((in_vertex.x - in_smallestX) / in_myDim)
	localGridX = (floor((localNormalX * 255) + 0.5) as integer)
	if (255 < localGridX) then
		localGridX = 255

	localNormalY = ((in_vertex.y - in_waterLine) / in_myDim)
	localGridY = (floor((localNormalY * 255) + 0.5) as integer)
	if (255 < localGridY) then
		localGridY = 255

	append inout_vertexDump [localGridX, localGridY]
)

function _fnAppendFont &inout_vertexDump &inout_characterData in_myDim in_waterLine in_mesh in_charInt in_character in_pad =
(
	print ("mesh " + (in_charInt as string) + " " + (in_character as string))
	countVertex = getNumVerts in_mesh
	-- want the offset we add to the x
	smallestX = 0
	biggestX = 0
	for index = 1 to countVertex do
	(
		vertex = getVert in_mesh index
		if (vertex.x < smallestX) then
			smallestX = vertex.x
		if (biggestX < vertex.x) then
			biggestX = vertex.x 
	)
	
	elementOffset = inout_vertexDump.count
	countFace = getNumFaces in_mesh
	for index = 1 to countFace do
	(
		face = getFace in_mesh index
	
		vertex0 = getVert in_mesh face.x
		vertex1 = getVert in_mesh face.y
		vertex2 = getVert in_mesh face.z

		_fnAppendVertexDump inout_vertexDump vertex0 smallestX in_waterLine in_myDim
		_fnAppendVertexDump inout_vertexDump vertex1 smallestX in_waterLine in_myDim
		_fnAppendVertexDump inout_vertexDump vertex2 smallestX in_waterLine in_myDim
	)

	width = (((biggestX - smallestX) / in_myDim) * 255) + in_pad
	_fnCharacterDataAppend inout_characterData ("'" + in_character + "'") width elementOffset (countFace * 3)
)

function _fnLocalSaveFileVertexDump inout_resultFile in_fontName in_vertexDump =
(
	countVertex = in_vertexDump.count

	format "DSC.Framework.Asset.Model.Pool.% =\n" in_fontName to:inout_resultFile
	format "{\n" to:inout_resultFile
	format "	\"m_mode\" : DSC.Framework.Context.WebGL.TRIANGLES,\n" to:inout_resultFile
	format "	\"m_elementCount\" : %,\n" countVertex to:inout_resultFile
	format "	\"m_mapDataStream\" : \n" to:inout_resultFile
	format "	{\n" to:inout_resultFile
	format "		\"a_position\" : DSC.Framework.Asset.Model.DataStream.FactoryRaw(\n" to:inout_resultFile
	format "			DSC.Framework.Context.WebGL.UNSIGNED_BYTE,\n" to:inout_resultFile
	format "			2,\n" to:inout_resultFile
	format "			new DSC.Common.t_u8Array([\n" to:inout_resultFile

	for index = 1 to countVertex do
	(
		vertex = in_vertexDump[index]
		format "%, %,\n" ((vertex.x as integer) as string) ((vertex.y as integer) as string) to:inout_resultFile
	)

	format "				]),\n" to:inout_resultFile
	format "			undefined,\n" to:inout_resultFile
	format "			true\n" to:inout_resultFile
	format "			)\n" to:inout_resultFile
	format "	},\n" to:inout_resultFile
	format "	\"m_elementIndex\" : undefined\n" to:inout_resultFile
	format "}\n" to:inout_resultFile


	format "\n\n" in_fontName to:inout_resultFile
)

function _fnLocalSaveFileCharacterData inout_resultFile in_fontName in_spaceWidth in_characterData = 
(
	format "DSC.Framework.Asset.Font.Pool.% =\n" in_fontName to:inout_resultFile
	format "{\n" to:inout_resultFile
	format "	\"m_modelName\" : \"%\",\n" in_fontName to:inout_resultFile
	format "	\"m_letterData\" : {\n" to:inout_resultFile
	format "		'\\n' : DSC.Framework.Asset.Font.LetterData.FactoryRaw(0, 0, 0, true),\n" to:inout_resultFile
	format "		'\\t' : DSC.Framework.Asset.Font.LetterData.FactoryRaw(%, 0, 0),\n" (in_spaceWidth * 4) to:inout_resultFile
	format "		' ' : DSC.Framework.Asset.Font.LetterData.FactoryRaw(%, 0, 0),\n" in_spaceWidth to:inout_resultFile

	countCharacterData = in_characterData.count
	for index = 1 to countCharacterData do
	(
		data = in_characterData[index]
		format "		% : DSC.Framework.Asset.Font.LetterData.FactoryRaw(%, %, %),\n" data[1] data[2] data[3] data[4]  to:inout_resultFile
	)

	format "		}\n" in_fontName to:inout_resultFile
	format "};\n\n" in_fontName to:inout_resultFile
)


------------------------------------------------------
-- utility
------------------------------------------------------
utility FontUtility "Font Utility"
(
	rollout roFontExport "Font Export"
	(
		button uiGenerateFont "Generate Font"

		on uiGenerateFont pressed do
		(
			myString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~`!@#$%^&*()-_=+{}[]:;\"'<,>.?/|\\"
			for j=1 to myString.count do 
			(
				myCharacter = myString[j]
				print myCharacter
				myTextObject = text()
				myTextObject.text = myCharacter;
				myTextObject.font = "Angie's New House"
				-- "Player 1 Up Regular"
				convertTo myTextObject TriMeshGeometry
				myInt = bit.charAsInt(myCharacter)
				setUserProp myTextObject "characterAsInt" myInt
				setUserProp myTextObject "character" myCharacter
			)
		)

		button uiExportSelectedFont "Export Selected Font"

		on uiExportSelectedFont pressed do
		(
			fontName = "AngiesNewHouse"
			characterWidthPad = 24
			localCaption = "Save Font Data"
			filter = "font data (*.txt)|*.txt|All Files (*.*)|*.*|"
			newFilePath = getSaveFileName caption:localCaption types:filter filename:maxFilePath
			if (undefined != newFilePath) then
			(
				resultFile = createfile newFilePath
				if resultFile == undefined then
					throw "File not created"

				maxDim = #([0.0, 0.0], [0.0, 0.0])
				for node in selection do
				(
					myMesh = snapshotAsMesh node
					_fnMeasureBounds &maxDim myMesh
					delete myMesh
				)

				print( "maxDim " + (maxDim[1].x as string) + " " + (maxDim[1].y as string) + " " + (maxDim[2].x as string) + " " + (maxDim[2].y as string) )
				
				myWidth = maxDim[2].x - maxDim[1].x
				myHeight = maxDim[2].y - maxDim[1].y
				myDim = myHeight
				if (myDim < myWidth) then
					myDim = myWidth
					
				vertexDump = #()
				append vertexDump [0, 0]
				append vertexDump [255, 0]
				append vertexDump [255, 255]

				append vertexDump [0, 0]
				append vertexDump [255, 255]
				append vertexDump [0, 255]

				characterData = #()
				_fnCharacterDataAppend &characterData "undefined" 255 0 6

				for node in selection do
				(
					myInt = getUserProp node "characterAsInt"
					myCharacter = bit.intAsChar(myInt)
					myMesh = snapshotAsMesh node
					_fnAppendFont &vertexDump &characterData myDim maxDim[1].y myMesh myInt myCharacter characterWidthPad
					delete myMesh
				)
				
				_fnLocalSaveFileVertexDump resultFile fontName vertexDump

				spaceWidth = (myWidth / myHeight) * 255
				_fnLocalSaveFileCharacterData resultFile fontName maxDim[1].y characterData

				close resultFile
			)
		)
	)

	on FontUtility open do
	(
		addRollout roFontExport
	)

	on FontUtility close do
	(
		removeRollout roFontExport
	)	
)

