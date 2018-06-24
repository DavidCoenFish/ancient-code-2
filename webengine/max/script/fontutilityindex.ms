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

function _fnAppendFont &inout_vertexPool &inout_faceIndex &inout_characterData in_myDim in_waterLine in_mesh in_charInt in_character in_pad =
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

	vertexPoolIndex = #()
	for index = 1 to countVertex do
	(
		vertex = getVert in_mesh index

		--print ("vertex " +  (index as string) + " " + (vertex.x as string) + " " + (vertex.y as string))

		localNormalX = ((vertex.x - smallestX) / in_myDim)
		localGridX = (floor((localNormalX * 255) + 0.5) as integer)
		if (255 < localGridX) then
			localGridX = 255

		localNormalY = ((vertex.y - in_waterLine) / in_myDim)
		localGridY = (floor((localNormalY * 255) + 0.5) as integer)
		if (255 < localGridY) then
			localGridY = 255

		vertexIndex = _fnAppendVertexPool &inout_vertexPool localGridX localGridY
		append vertexPoolIndex vertexIndex

		--print (" " + (vertexIndex as string) + " " + (localGridX as string) + " " + (localGridY as string))
	)
	
	elementOffset = inout_faceIndex.count * 3
	countFace = getNumFaces in_mesh
	for index = 1 to countFace do
	(
		face = getFace in_mesh index
	
		indexX = vertexPoolIndex[(face.x as integer)]
		indexY = vertexPoolIndex[(face.y as integer)]
		indexZ = vertexPoolIndex[(face.z as integer)]
		
		data = #()
		append data indexX
		append data indexY
		append data indexZ
		append inout_faceIndex data
		-- print ("  " +  (indexX as string) + " " + (indexY as string) + " " + (indexZ as string))
	)

	width = (((biggestX - smallestX) / in_myDim) * 255) + in_pad
	_fnCharacterDataAppend inout_characterData ("'" + in_character + "'") width elementOffset (countFace * 3)
)

function _fnLocalSaveFileVertexPool inout_resultFile in_fontName in_vertexPool =
(
	format "DSC.Render.Font.%.s_arrayDataPos = new DSC.Common.t_s8Array([\n" in_fontName to:inout_resultFile

	countVertex = in_vertexPool.count
	for index = 1 to countVertex do
	(
		vertex = in_vertexPool[index]
		format "  %, %,\n" ((vertex.x as integer) as string) ((vertex.y as integer) as string) to:inout_resultFile
	)

	format "]);\n\n" in_fontName to:inout_resultFile
)

function _fnLocalSaveFileFaceIndex inout_resultFile in_fontName in_faceIndex in_vertexCount = 
(
	arrayName = "t_u8Array"
	if (65536 < in_vertexCount) then
		arrayName = "t_u32Array"
	else
	(
		if (256 < in_vertexCount) then
			arrayName = "t_u16Array"
	)
	
	format "DSC.Render.Font.%.s_arrayDataFaceIndex = new DSC.Common.%([\n" in_fontName arrayName to:inout_resultFile

	countFaceIndex = in_faceIndex.count
	for index = 1 to countFaceIndex do
	(
		data = in_faceIndex[index]
		format "  %, %, %,\n" (data[1] as string) (data[2] as string) (data[3] as string) to:inout_resultFile
		--format "  %, %, %,//%\n" (data[1] as string) (data[2] as string) (data[3] as string) (((index - 1) * 3) as string)to:inout_resultFile
	)

	format "]);\n\n" in_fontName to:inout_resultFile
)

function _fnLocalSaveFileCharacterData inout_resultFile in_fontName in_characterData = 
(
	format "DSC.Render.Font.%.s_mapLetterData = {\n" in_fontName to:inout_resultFile

	countCharacterData = in_characterData.count
	for index = 1 to countCharacterData do
	(
		data = in_characterData[index]
		format "  % : DSC.Framework.Asset.Font.LetterData.FactoryRaw(%, %, %),\n" data[1] data[2] data[3] data[4]  to:inout_resultFile
	)

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
					
				vertexPool = #()
				append vertexPool [0, 0]
				append vertexPool [255, 0]
				append vertexPool [255, 255]
				append vertexPool [0, 255]

				faceIndex = #()
				append faceIndex #((0 as integer), (1 as integer), (2 as integer))
				append faceIndex #((0 as integer), (2 as integer), (3 as integer))

				characterData = #()
				_fnCharacterDataAppend &characterData "undefined" 255 0 6

				for node in selection do
				(
					myInt = getUserProp node "characterAsInt"
					myCharacter = bit.intAsChar(myInt)
					myMesh = snapshotAsMesh node
					_fnAppendFont &vertexPool &faceIndex &characterData myDim maxDim[1].y myMesh myInt myCharacter characterWidthPad
					delete myMesh
				)
				
				_fnLocalSaveFileVertexPool resultFile fontName vertexPool
				_fnLocalSaveFileFaceIndex resultFile fontName faceIndex vertexPool.count
				_fnLocalSaveFileCharacterData resultFile fontName characterData

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

