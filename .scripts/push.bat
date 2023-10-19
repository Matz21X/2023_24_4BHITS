@echo off
cd /d "C:\Users\matth\Documents\2023_24_4BHITS"
set commitMessage=Vault backup: %date:~0,2%/%date:~3,2%/%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2% %COMPUTERNAME% SHUTDOWN

git add -A
git commit -m "%commitMessage%"
git push
