# Funktion zur Berechnung der kürzesten Wege mittels Dijkstra-Algorithmus
def dijkstra(nodes, edges, source_index=0):
    # Initialisierung der Längen der Pfade zu den Knoten
    path_lengths = {v: float('inf') for v in nodes}
    path_lengths[source_index] = 0

    # Initialisierung der Nachbarknoten und deren Gewichte
    adjacent_nodes = {v: {} for v in nodes}
    for (u, v), w_uv in edges.items():
        adjacent_nodes[u][v] = w_uv
        adjacent_nodes[v][u] = w_uv

    # Liste der temporären Knoten, die noch nicht besucht wurden
    temporary_nodes = [v for v in nodes]

    # Schleife, die solange läuft, bis alle Knoten besucht wurden
    while len(temporary_nodes) > 0:
        # Bestimme den Knoten mit der kleinsten bisher bekannten Pfadlänge
        upper_bounds = {v: path_lengths[v] for v in temporary_nodes}
        u = min(upper_bounds, key=upper_bounds.get)

        # Entferne den aktuellen Knoten aus der Liste der temporären Knoten
        temporary_nodes.remove(u)

        # Aktualisiere die Pfadlängen zu den Nachbarn des aktuellen Knotens
        for v, w_uv in adjacent_nodes[u].items():
            path_lengths[v] = min(path_lengths[v], path_lengths[u] + w_uv)

    # Rückgabe der berechneten Pfadlängen zu allen Knoten
    return path_lengths
