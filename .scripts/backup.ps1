$sourcePath = "C:\Users\matth\Documents\2023_24_4BHITS"
$destinationPath = "C:\Users\matth\OneDrive - HTL Hollabrunn\2023_24_4BHITS"
$logFilePath = "C:\Users\matth\Documents\2023_24_4BHITS\.scripts\copyLog.txt" # Pfad zum Logfile
$hostname = $env:COMPUTERNAME # Hostname des Computers abrufen

# Überprüfen, ob der Quellordner existiert
if (Test-Path $sourcePath -PathType Container) {
    # Überprüfen, ob der Zielordner existiert. Wenn nicht, erstellen Sie ihn.
    if (-not (Test-Path $destinationPath -PathType Container)) {
        New-Item -Path $destinationPath -ItemType Directory -Force
    }

    # Versuchen, Dateien von Quelle in Ziel zu kopieren und überschreiben, .git-Ordner ausschließen
    try {
        Copy-Item -Path "$sourcePath\*" -Destination $destinationPath -Force -Recurse -Exclude ".git"
        Write-Host "Kopieren abgeschlossen."
        
        # Logbuch schreiben
        "-------------------------------------------------" | Out-File -Append -FilePath $logFilePath
        "Kopieren abgeschlossen: $(Get-Date)" | Out-File -Append -FilePath $logFilePath
        "Hostname: $hostname" | Out-File -Append -FilePath $logFilePath
    } catch {
        Write-Host "Fehler beim Kopieren: $_"
        
        # Fehlermeldung im Logbuch festhalten
        "Fehler beim Kopieren: $(Get-Date)" | Out-File -Append -FilePath $logFilePath
        $_.Exception.Message | Out-File -Append -FilePath $logFilePath
    }
} else {
    Write-Host "Der Quellordner existiert nicht."
    
    # Fehlermeldung im Logbuch festhalten
    "Der Quellordner existiert nicht: $(Get-Date)" | Out-File -Append -FilePath $logFilePath
}
