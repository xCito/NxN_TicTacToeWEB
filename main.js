console.log("Welcome to the NxN TicTacToe Game");

class Board
{
    constructor(size, tableElem)
    {
        this.size = size;
        this.table = tableElem;

        // gameboard data 2D array
        this.grid = [];

        // magic numbers
        this.cellSize = 150;
        this.borderW = 5;
        this.cellSizeMagicNum = 450;
        this.fontSizeMagicNum = 385;
        this.lineColor = "black";
    }

    generateBoard()
    {
        this.deleteBoard();
        this.calculateCellSize();
        this.createBoard();
    }

    styleCellBorder(row, col)
    {
        if( row == 0 &&  col == 0)
            return "0px 4px 4px 0px";
        else if( row == 0 &&  col == (this.size-1))
            return "0px 0px 4px 4px";
        else if( row == (this.size-1) &&  col == 0)
            return "4px 4px 0px 0px";
        else if( row == (this.size-1) &&  col == (this.size-1))
            return "4px 0px 0px 4px";
        else if( row == 0 )
            return "0px 4px 4px 4px";
        else if( col == 0 )
            return "4px 4px 4px 0px";
        else if( col == (this.size-1))
            return "4px 0px 4px 4px";
        else if( row == (this.size-1))
            return "4px 4px 0px 4px";
        else
            return "4px 4px 4px 4px";
    }

    // Removes all the elements in the table
    deleteBoard()
    {
        while (this.table.firstChild){
            this.table.removeChild(this.table.firstChild);
        }
        this.grid = [];
    }

    calculateCellSize()
    {
        this.cellSize = 450/this.size;
        this.boardW = 1/this.size;
    }

    createSpace( name )
    {
        var td = document.createElement("TD");
        var cell = document.createElement("DIV");
        cell.setAttribute("class", "cell");
        cell.setAttribute("id", name);
        cell.addEventListener("click", markCell);
        cell.style.width = (this.cellSize+5) + "px";
        cell.style.height = this.cellSize + "px";
        cell.style.fontSize = (385/this.size)-(this.size/7) + "px"; // magic formula
        cell.style.margin = this.boardW + "px";
        cell.innerText = " ";

        td.appendChild(cell);

        return td;
    }

    createBoard()
    {
        var count = 0;
        // Create cells to add to board
        for(var i=0; i < this.size; i++)
        {
            var row = document.createElement("TR");
            var gridRow = [];
            for(var j=0; j< this.size; j++)
            {
                var cell = this.createSpace( count++ );
                gridRow.push(" ");
                cell.style.border = "0px solid " + this.lineColor;
                cell.style.borderWidth = this.styleCellBorder(i,j);

                // draws horizontal lines (except for last for last row)
                if( i != (this.size-1))
                    row.style.borderBottom = "thick solid " + this.lineColor;

                row.appendChild(cell);

            }

            this.grid.push(gridRow);
            this.table.appendChild(row);
        }
    }

    markSpace(cellNum, mark)
    {
        var x = parseInt(cellNum%this.size);
        var y = parseInt(cellNum/this.size);
        this.grid[y][x] = mark;
    }

    isSpaceOpen(cellNum)
    {
        var x = parseInt(cellNum%this.size);
        var y = parseInt(cellNum/this.size);
        if(this.grid[y][x] == " ")
            return true;
        return false;
    }

    setSize( s )   { this.size = s;    }
    getSize()      { return this.size; }
    setMarker( m ) { this.marker = m;  }
}

////////////////////////////////////////////////////////////////////////////////

class Player {

    constructor(name, mark)
    {
        this.name = name;
        this.mark = mark;
    }

    getMark() {   return this.mark;  }
    setMark(m){   this.mark = m;     }
}

////////////////////////////////////////////////////////////////////////////////

class Human extends Player {

    constructor(name, mark)
    {
        super(name, mark);
    }
}

////////////////////////////////////////////////////////////////////////////////

class Robot extends Player {

    constructor(name, mark, difficulty)
    {
        super(name, mark);
        this.level = difficulty;
    }
}

////////////////////////////////////////////////////////////////////////////////


var pageTitle = document.getElementById('heading');
var board  = document.getElementById('board');
var slider = document.getElementById('slider');
var playerTable = document.getElementById('playerInfo');
var numPlayers = 2;
var boardSize = Math.pow(2,numPlayers) - 1;
var mark = ["X", "O", "Y", "Z", "A", "B", "G", "T", "H", "V", "W"];
var count = 0;

var TTTBoard = new Board(boardSize, board);
for(var i=0; i<numPlayers; i++)
    playerTable.innerHTML += "<tr><td>Player " + (i+1)+ "</td><td>" + mark[i%numPlayers]+ "</td></tr>"
TTTBoard.generateBoard();

function sliderChanged()
{
    numPlayers = slider.value;
    boardSize = (2*numPlayers) - 1;
    pageTitle.innerText = boardSize+"x"+boardSize+" Tic-Tac-Toe: " + numPlayers + " Players";
    playerTable.innerHTML = "<tr><th>Player</th><th>Mark</th></tr>";
    for(var i=0; i<numPlayers; i++)
        playerTable.innerHTML += "<tr><td>Player " + (i+1)+ "</td><td id=\"mark\">" + mark[i%numPlayers]+ "</td></tr>"
    TTTBoard.setSize(boardSize);
    TTTBoard.generateBoard();
    count = 0;
    console.log("slider changed");
}

function markCell(evt)
{
    var cellNum = evt.target.id;

    if(TTTBoard.isSpaceOpen(cellNum))
    {
        evt.target.innerText = mark[count%numPlayers];
        TTTBoard.markSpace(cellNum, mark[count%numPlayers]);
        count++;
    }
    console.log("click");
}
