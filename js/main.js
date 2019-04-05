/*RECURSIVE BACKTRACKER MAZE GENERATION
            By: Colby Lee, 4/4/2019

https://en.wikipedia.org/wiki/Maze_generation_algorithm

1.Make the initial cell the current cell and mark it as visited
2.While there are unvisited cells
    1.If the current cell has any neighbours which have not been visited
        1.Choose randomly one of the unvisited neighbours
        2.Push the current cell to the stack
        3.Remove the wall between the current cell and the chosen cell
        4.Make the chosen cell the current cell and mark it as visited
    2.Else if stack is not empty
        1.Pop a cell from the stack
        2.Make it the current cell*/

var canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var cols, rows, w, grid, current, stack;

this.window.addEventListener("load", init);

function init() {
    canvas.width = 1000;
    canvas.height = 1000;
    w = 10;
    cols = Math.floor(canvas.width / w);
    rows = Math.floor(canvas.height / w);
    grid = [];
    stack = [];

    for (var x = 0; x < rows; x++)
    {
        for (var y = 0; y < cols; y++) {
            var cell = new Cell(x, y);
            grid.push(cell);   
        }
    }
    current = grid[0];
    gameUpdate();
}

function index(i, j)
{
    if(i < 0 || j < 0 || i > cols-1 || j > rows - 1)
    {
        return -1;
    }
    else
    {
        return j + i * cols;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
    

    this.checkNeighbors = function(){
        var neighbors = [];
        var top = grid[index(this.i, this.j - 1)];
        var right = grid[index(this.i + 1, this.j)];
        var bottom = grid[index(this.i, this.j + 1)];
        var left = grid[index(this.i - 1, this.j)];
        
        if(top && !top.visited){

            neighbors.push(top);
        }
        if(right && !right.visited){

            neighbors.push(right);
        }
        if(bottom && !bottom.visited){

            neighbors.push(bottom);
        }
        if(left && !left.visited){

            neighbors.push(left);
        }
        
        if(neighbors.length > 0){
            var r = getRandomInt(0, neighbors.length);
            return neighbors[r];
        }
        else{
            return undefined;
        }
    }

    this.highlight = function(){
        var x = this.i * w;
        var y = this.j * w;

        ctx.fillStyle = "#26f21f";
        ctx.beginPath();
        ctx.fillRect(x, y, w, w);
        ctx.stroke();

    }

    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;
        ctx.strokeStyle = "#fff";
        
        if(this.visited)
        {
            //draw walls
            if(this.walls[0])
                lineBetween(x, y, x+w, y);
            if(this.walls[1])
                lineBetween(x+w, y, x+w, y+w);
            if(this.walls[2])
                lineBetween(x+w, y+w, x, y+w);
            if(this.walls[3])
                lineBetween(x, y+w, x, y);

            //fill visited tile
            ctx.fillStyle = "#8f2ac1";
            ctx.beginPath();
            ctx.fillRect(x, y, w, w);
            ctx.stroke();
        }
    }  
}

function lineBetween(i, j, x, y)
{
        ctx.moveTo(i, j);
        ctx.lineTo(x, y);
        ctx.stroke();
}

function step() {
    current.visited = true;
    var next = current.checkNeighbors();
    if(next){
        next.visited = true;
        stack.push(current);
        removeWalls(current, next);
        current = next;
    }
    else if(stack.length > 0)
    {
        current = stack.pop();
    } 
}

function render() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "#353c47";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.stroke();
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }   
    current.highlight();
}

function gameUpdate() {
    requestAnimationFrame(this.gameUpdate);
    step();
    render();
}

function removeWalls(a, b){
    var x = a.i - b.i;
    var y = a.j - b.j;
    if(x == 1)
    {
        a.walls[3] = false;
        b.walls[1] = false;
    } 
    else if(x == -1)
    {
        a.walls[1] = false;
        b.walls[3] = false;   
    }
    if( y == 1)
    {
        a.walls[0] = false;
        b.walls[2] = false;
    }
    else if(y == -1)
    {
        a.walls[2] = false;
        b.walls[0] = false;
    }
    
}








