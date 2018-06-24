PUSHD %CD%
CD %~dp0
CALL source\build_library_lqre.bat
POPD
CALL unittest.bat
