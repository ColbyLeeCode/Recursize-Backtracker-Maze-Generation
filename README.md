# Recursize-Backtracker-Maze-Generation
RECURSIVE BACKTRACKER MAZE GENERATION<br>
By: Colby Lee, 4/4/2019

https://en.wikipedia.org/wiki/Maze_generation_algorithm

1. Make the initial cell the current cell and mark it as visited [X]
2. While there are unvisited cells [X]
    1. If the current cell has any neighbours which have not been visited [X]
        1. Choose randomly one of the unvisited neighbours [X]
        2. Push the current cell to the stack [X]
        3. Remove the wall between the current cell and the chosen cell [X]
        4. Make the chosen cell the current cell and mark it as visited [X]
    2. Else if stack is not empty [X]
        1. Pop a cell from the stack [X]
        2. Make it the current cell [X]
