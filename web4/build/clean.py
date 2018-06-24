import sys
import os
import shutil

if __name__ == '__main__':

	if (5 != len(sys.argv)):
		exit(1)

	print("clean:", sys.argv)

	outDir = sys.argv[3]
	intDir = sys.argv[4]

	shutil.rmtree(intDir, True)
	shutil.rmtree(outDir, True)

exit(0)
