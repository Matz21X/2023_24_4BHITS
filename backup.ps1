$sourcePath = "C:\Users\matth\Documents\2023_24_4BHITS"
$destinationPath = "C:\Users\matth\OneDrive - HTL Hollabrunn\2023_24_4BHITS"

# Überprüfen, ob der Quellordner existiert
if (Test-Path $sourcePath -PathType Container) {
    # Überprüfen, ob der Zielordner existiert. Wenn nicht, erstellen Sie ihn.
    if (-not (Test-Path $destinationPath -PathType Container)) {
        New-Item -Path $destinationPath -ItemType Directory -Force
    }

    # Dateien von Quelle in Ziel kopieren und überschreiben, .git-Ordner ausschließen
    Copy-Item -Path "$sourcePath\*" -Destination $destinationPath -Force -Recurse -Exclude ".git"
    Write-Host "Kopieren abgeschlossen."
} else {
    Write-Host "Der Quellordner existiert nicht."
}
