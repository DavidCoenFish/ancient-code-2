PUSHD %CD%
CD %~dp0

echo off
C:\Users\David\AppData\Local\Programs\Python\Python35\python.exe clean.py %1 %2 %3 %4

POPD
EXIT 0
