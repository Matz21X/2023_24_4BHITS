$repoPath = "C:\Users\matth\Documents\2023_24_4BHITS"
$commitMessage = "Vault backup: $(Get-Date -Format 'dd-MM-yy HH:mm:ss') $env:COMPUTERNAME SHUTDOWN"

Set-Location $repoPath
git add -A
git commit -m "Automatisches Commit beim Herunterfahren"
git push
