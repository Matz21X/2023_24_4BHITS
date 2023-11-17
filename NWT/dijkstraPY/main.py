import heapq


def dijkstra(graph, start):
    # Initialize distances from start to all other nodes as infinity
    dist = {node: float('inf') for node in graph}
    # Set the distance from start to itself as 0
    dist[start] = 0
    # Priority queue to hold nodes to visit
    pq = [(0, start)]

    while pq:
        # Get the node with the smallest distance
        current_distance, current_node = heapq.heappop(pq)

        # If this distance is greater than the recorded shortest distance, skip
        if current_distance > dist[current_node]:
            continue

        # Check neighbors of the current node
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight

            # If a shorter path to neighbor is found
            if distance < dist[neighbor]:
                dist[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))

    return dist


# Example graph represented as an adjacency list
graph = {
    'A': {'B': 1, 'C': 4},
    'B': {'A': 1, 'C': 2, 'D': 5},
    'C': {'A': 4, 'B': 2, 'D': 1},
    'D': {'B': 5, 'C': 1}
}

# Run Dijkstra's algorithm
shortest_paths = dijkstra(graph, 'A')
print(shortest_paths)