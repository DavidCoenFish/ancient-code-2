#
# java.exe -jar d:\development\web\bin\compiler.jar --help
#

import sys
import os
import subprocess
import shutil

def create_path(path):
	import os.path as os_path
	paths_to_create = []
	while not os_path.lexists(path):
		paths_to_create.insert(0, path)
		head,tail = os_path.split(path)
		if len(tail.strip())==0: # Just incase path ends with a / or \
			path = head
			head,tail = os_path.split(path)
		path = head

	for path in paths_to_create:
		os.mkdir(path)

def MakeParamFrom(in_listJavascript):
	result = []
	for javascript in in_listJavascript:
		result.extend(["--js", javascript])
	return result

def GatherJavascriptLibrary(in_projectDir, in_workingDir):
	listJavascript = []
	for root, dirs, files in os.walk(in_projectDir):
		for file in files:
			ext = os.path.splitext(file)[1].lower()
			if not ext in ['.js']:
				continue
			path = os.path.join(root, file)
			relpath = os.path.relpath(path, in_workingDir)
			listJavascript.append(relpath)
	return listJavascript

def CompileUnitTestsDebug(in_listJavascriptLibrary, in_unitTestPath, in_template, in_outDir, in_rootFileName, in_configuration, in_outputHtmFilePath, in_destFolderName):
	print("CompileTestsDebug", in_destFolderName, in_listJavascriptLibrary)
	sys.stdout.flush()

	scriptIncludeText = ""
	for include in in_listJavascriptLibrary:
		fileName = os.path.split(include)[1]
		scriptIncludeText += """\t\t<script src="{}/{}" ></script>\n""".format(in_rootFileName, fileName)

	fileName = os.path.split(in_unitTestPath)[1]
	scriptIncludeText += """\t\t<script src="{}/{}/{}" ></script>\n""".format(in_rootFileName, in_destFolderName, fileName)

	newData = in_template.format(name = in_rootFileName, scriptInclude = scriptIncludeText, configuration = in_configuration)

	outputFile = open(in_outputHtmFilePath, 'w')
	outputFile.write(newData)
	outputFile.close()

	destLibrary = os.path.join(in_outDir, in_rootFileName)
	if not os.path.exists(destLibrary):
		os.makedirs(destLibrary)

	for include in in_listJavascriptLibrary:
		fileName = os.path.split(include)[1]
		shutil.copy(include, os.path.join(destLibrary, fileName))

	destUnitTest = os.path.join(destLibrary, in_destFolderName)
	if not os.path.exists(destUnitTest):
		os.makedirs(destUnitTest)

	fileName = os.path.split(in_unitTestPath)[1]
	shutil.copy(in_unitTestPath, os.path.join(destUnitTest, fileName))

	return

#"sources":["../../source/library/dsc.js","../../source/unittest/dsc.js"],


def CompileJavascript(in_listParam, in_template, in_fileName, in_outputFilePath, in_outDir, in_configuration, in_outputHtmFilePath):
	outputHtmFilePath = in_fileName + ".js.map" #os.path.join(in_outDir, in_fileName + ".js.map")
	in_listParam.extend(["--create_source_map", outputHtmFilePath])

	print("CompileUnitTestsRelease", in_listParam)
	sys.stdout.flush()

	completedObject = subprocess.run(in_listParam, stdout=subprocess.PIPE)
	scriptIncludeText = """\t\t<script src="{}" ></script>\n""".format(in_fileName + ".js")
	newData = in_template.format(name = in_fileName, scriptInclude = scriptIncludeText, configuration = in_configuration)
	outputFile = open(in_outputHtmFilePath, 'w')
	outputFile.write(newData)
	outputFile.close()

	magicString = """\n//# sourceMappingURL={}""".format(in_fileName + ".js.map")
	outputFile = open(in_outputFilePath, 'a')
	outputFile.write(magicString)
	outputFile.close()

def SaveIndexTest(in_indexUnitTestTemplatePath, in_listUnitTest, in_outDir, in_configuration, in_outputFileName):
	templateFile = open(in_indexUnitTestTemplatePath, 'r')
	template = templateFile.read()
	templateFile.close()

	unitTestListText = ""
	first = True
	for unitTest in in_listUnitTest:
		if True == first:
			unitTestListText += """\t"{}" """.format(unitTest)
		else:
			unitTestListText += """,\n\t"{}" """.format(unitTest)
		first = False
	unitTestListText += "\n"

	newData = template.format(unitTestList = unitTestListText, configuration = in_configuration)

	outputHtmFilePath =  os.path.join(in_outDir, in_outputFileName + ".htm")
	outputFile = open(outputHtmFilePath, 'w')
	outputFile.write(newData)
	outputFile.close()

	return

def CompileUnitTests(in_configuration, in_unitTestPath, in_listParam, in_listJavascriptLibrary, in_unitTestTemplatePath, in_indexUnitTestTemplatePath, in_outDir):
	templateFile = open(in_unitTestTemplatePath, 'r')
	template = templateFile.read()
	templateFile.close()

	listUnitTest = []

	for root, dirs, files in os.walk(in_unitTestPath):
		for file in files:
			(fileName, ext) = os.path.splitext(file)
			if not ext.lower() in ['.js']:
				continue
			path = os.path.join(root, file)
			relpath = os.path.relpath(path, in_outDir)
			outputHtmFilePath = os.path.join(in_outDir, fileName + ".htm")

			listUnitTest.append(fileName)

			print("CompileUnitTests", fileName)

			if "Debug" == in_configuration:
				CompileUnitTestsDebug(in_listJavascriptLibrary, path, template, in_outDir, fileName, in_configuration, outputHtmFilePath, "unittest")
			elif "Release" == in_configuration:
				inputParam = MakeParamFrom(in_listJavascriptLibrary + [relpath])
				outputFilePath = fileName + ".js" #os.path.join(in_outDir, fileName + ".js")
				listParam = in_listParam + inputParam
				listParam.extend(["--js_output_file", outputFilePath])
				CompileJavascript(listParam, template, fileName, outputFilePath, in_outDir, in_configuration, outputHtmFilePath)
			else:
				raise Exception("unknown configuration", in_configuration)

			#break

	SaveIndexTest(in_indexUnitTestTemplatePath, listUnitTest, in_outDir, in_configuration, "indexunittest")

	return


def CompileSystemTests(in_configuration, in_systemTestPath, in_listParam, in_listJavascriptLibrary, in_systemTestTemplatePath, in_indexSystemTestTemplatePath, in_outDir):
	#print("CompileSystemTests", in_systemTestTemplatePath)
	templateFile = open(in_systemTestTemplatePath, 'r')
	template = templateFile.read()
	templateFile.close()

	listSystemTest = []

	for root, dirs, files in os.walk(in_systemTestPath):
		for file in files:
			(fileName, ext) = os.path.splitext(file)
			if not ext.lower() in ['.js']:
				continue

			path = os.path.join(root, file)
			relpath = os.path.relpath(path, in_outDir)
			outputHtmFilePath = os.path.join(in_outDir, fileName + ".htm")

			listSystemTest.append(fileName)

			print("CompileSystemTests", fileName)

			if "Debug" == in_configuration:
				CompileUnitTestsDebug(in_listJavascriptLibrary, path, template, in_outDir, fileName, in_configuration, outputHtmFilePath, "systemtest")
			elif "Release" == in_configuration:
				inputParam = MakeParamFrom(in_listJavascriptLibrary + [relpath])
				outputFilePath = fileName + ".js" #os.path.join(in_outDir, fileName + ".js")
				listParam = in_listParam + inputParam
				listParam.extend(["--js_output_file", outputFilePath])
				CompileJavascript(listParam, template, fileName, outputFilePath, in_outDir, in_configuration, outputHtmFilePath)
			else:
				raise Exception("unknown configuration", in_configuration)

	SaveIndexTest(in_indexSystemTestTemplatePath, listSystemTest, in_outDir, in_configuration, "indexsystemtest")

	return

if __name__ == '__main__':
	if (5 != len(sys.argv)):
		exit(1)

	print("build", sys.argv)
	sys.stdout.flush()

	configuration = sys.argv[1]
	projectDir = sys.argv[2]
	outDir = os.path.join(sys.argv[3], "web")
	intDir = os.path.join(sys.argv[4], "web")
	#workingDir = sys.argv[5] #a bit mucked up, want to give the source files at same folder depth as output, and same depth as current dir when compiler invoked to get path correct for source map
	compilerJarPath = os.path.join(projectDir, "bin", "compiler.jar")
	unitTestPath = os.path.join(projectDir, "source", "unittest")
	unitTestTemplatePath = os.path.join(projectDir, "source", "template", "unittest.tmp.htm")
	indexUnitTestTemplatePath = os.path.join(projectDir, "source", "template", "indexunittest.tmp.htm")
	systemTestPath = os.path.join(projectDir, "source", "systemtest")
	systemTestTemplatePath = os.path.join(projectDir, "source", "template", "systemtest.tmp.htm")
	indexSystemTestTemplatePath = os.path.join(projectDir, "source", "template", "indexsystemtest.tmp.htm")
	libraryPath = os.path.join(projectDir, "source", "library")

	#workingDir = os.path.split(os.path.split(intDir)[0])[0]
	create_path(outDir)
	os.chdir(outDir)

	listJavascriptLibrary = GatherJavascriptLibrary(libraryPath, outDir)

	listParam = ["java.exe", "-jar", compilerJarPath]
	listParam.extend(["--compilation_level", "ADVANCED_OPTIMIZATIONS"])
	listParam.extend(["--warning_level=VERBOSE"])
	listParam.extend(["--summary_detail_level=3"])
	listParam.extend(["--jscomp_warning=checkTypes"])
		
	if "Release" == configuration:
		listParam.append('--define="DEBUG=false"')
		#listParam.append('--define="LOG=false"')
		listParam.append('--define="LOG=true"')

	CompileUnitTests(configuration, unitTestPath, listParam, listJavascriptLibrary, unitTestTemplatePath, indexUnitTestTemplatePath, outDir)
	CompileSystemTests(configuration, systemTestPath, listParam, listJavascriptLibrary, systemTestTemplatePath, indexSystemTestTemplatePath, outDir)

exit(0)