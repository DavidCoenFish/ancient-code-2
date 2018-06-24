# nmake.exe /D /f library\core.make build

JAVA=C:/Windows/System32/java.exe
JAVAFLAGS=-verbose -jar .\\..\\tool\\compiler\\compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS 
JAVAFLAGS=-verbose -jar .\\tool\\compiler\\compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS 

INPUT=--js .\\library\\core\\dsc.js
OUTPUT=--js_output_file .\\www\\javascript\\core.js

.PHONY: build
build:
	@echo "build" 
	.\\bat\\build_library_core.bat
build2: 
	$(JAVA) -?
	@echo "default build" 
	$(JAVA) $(JAVAFLAGS) $(INPUT) $(OUTPUT)

clean: