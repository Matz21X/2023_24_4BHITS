def find_directions_and_save(file_path, output_file):
    # Öffne die Datei im Lesemodus und ignoriere unlesbare Zeichen
    with open(file_path, 'r', errors='ignore') as file:
        # Lies den gesamten Inhalt der Datei
        content = file.read()

    # Teile den Inhalt an Zeilenumbrüchen, um nach den Strings zu suchen
    lines = content.split('\n')

    # Initialisiere eine leere Liste, um die gefundenen Richtungen zu speichern
    directions = []

    # Durchsuche jede Zeile nach den Strings
    for line_number, line in enumerate(lines, start=1):
        if "direction=up" in line:
            directions.append("up")
        if "direction=down" in line:
            directions.append("down")
        if "direction=left" in line:
            directions.append("left")
        if "direction=right" in line:
            directions.append("right")
        if "direction=start" in line:
            directions.append("start")

    # Öffne die Ausgabedatei im Schreibmodus
    with open(output_file, 'w') as out_file:
        # Schreibe jede gefundene Richtung in die Ausgabedatei
        for direction in directions:
            out_file.write('http://blindmazerevenge.challs.open.ecsc2024.it/maze?direction=' + direction + '\n')

# Beispielaufruf der Funktion mit einer Eingabedatei "example.txt" und einer Ausgabedatei "output.txt"
input_file_path = "cap.txt"
output_file_path = "output.txt"
find_directions_and_save(input_file_path, output_file_path)
