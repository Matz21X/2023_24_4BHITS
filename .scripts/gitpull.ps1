Set-Location C:\Users\matth\Documents\2023_24_4BHITS
$gitPullOutput = git pull

if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS"
} else {
    Write-Host "ERROR: Der Git Pull-Vorgang war nicht erfolgreich."
}

Write-Host "Git Pull-Ausgabe: $gitPullOutput"
Pause