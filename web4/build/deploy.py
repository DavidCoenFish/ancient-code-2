import sys
import os
import shutil
import subprocess

if __name__ == '__main__':

	print(len(sys.argv))

	if (3 != len(sys.argv)):
		exit(1)

	print("deploy:", sys.argv)

	outDir = sys.argv[1]
	chromePath = sys.argv[2]

	indedxUnitTestPath = os.path.join(outDir, "web", "indexunittest.htm")
	indedxSystemTestPath = os.path.join(outDir, "web", "indexsystemtest.htm")

	listParam = [chromePath, indedxUnitTestPath, indedxSystemTestPath]

	print("listParam:", listParam)

	completedObject = subprocess.run(listParam)

	print("completedObject:", completedObject)

exit(0)
