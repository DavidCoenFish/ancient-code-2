PUSHD %CD%
CD %~dp0
CALL source\build_library.bat
POPD
EXIT 0
