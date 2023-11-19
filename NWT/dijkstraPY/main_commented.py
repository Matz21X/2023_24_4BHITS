import heapq as hq

class Solution:

    # Function to find the shortest distance of all the vertices
    # from the source vertex S.
    def dijkstra(self, V, adj, S):
        # Priority queue to store vertices and their distances
        pq = [(0, S)]
        # Distance array to store the shortest distances
        dist = [float('inf')] * V
        # Set the distance of the source vertex to 0
        dist[S] = 0

        while pq:
            # Extract the vertex with the minimum distance
            d, u = hq.heappop(pq)

            # Iterate through all adjacent vertices of the extracted vertex
            for v, w in adj[u]:
                # If a shorter path is found, update the distance
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    hq.heappush(pq, (dist[v], v))

        # Filter out the distances from the source vertex
        # and print the result in the required format
        result = [dist[i] if dist[i] != float('inf') else -1 for i in range(V)]
        return result


# Driver Code Starts
# Initial Template for Python 3
import atexit
import io
import sys

if __name__ == '__main__':
    test_cases = int(input())
    for cases in range(test_cases):
        V, E = map(int, input().strip().split())
        adj = [[] for i in range(V)]
        for i in range(E):
            u, v, w = map(int, input().strip().split())
            adj[u].append([v, w])
            adj[v].append([u, w])
        S = int(input())
        ob = Solution()

        res = ob.dijkstra(V, adj, S)
        for i in res:
            print(i, end=" ")
        print()
# } Driver Code Ends
