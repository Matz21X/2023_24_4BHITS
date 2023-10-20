Set-Location "C:\Users\matth\Documents\2023_24_4BHITS"
$commitMessage = "Vault backup: $(Get-Date -Format 'dd/MM/yy HH:mm:ss') $env:COMPUTERNAME"

git add -A
git commit -m $commitMessage
git push
