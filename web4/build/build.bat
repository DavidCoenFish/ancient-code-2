PUSHD %CD%
CD %~dp0

echo off
C:\Users\David\AppData\Local\Programs\Python\Python35\python.exe build.py %1 %2 %3 %4

POPD
EXIT %ERRORLEVEL%
