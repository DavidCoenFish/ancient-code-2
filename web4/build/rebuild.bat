PUSHD %CD%
CD %~dp0
CALL build.bat %1 %2 %3 %4
CALL clean.bat %1 %2 %3 %4
POPD
EXIT 0
