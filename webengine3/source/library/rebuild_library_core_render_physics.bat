PUSHD %CD%
CD %~dp0
CALL clean_library_core.bat
CALL build_library_core.bat
POPD
EXIT 0
