console.log("Welcome to the NxN TicTacToe Game");

////////////////////////////////////////////////////////////////////////////////

class BoardChecker
{
    constructor( win )
    {
        this.winStreak = win;
    }

    check( board , x , y )
    {
        let winningSpots = [];
        var mark = board[y][x];

        var vertResult = this.checkVertical(board , x , y, mark);
        var horiResult = this.checkHorizontal(board , x , y, mark);
        var dia1Result = this.checkDiagonalTLBR(board , x , y, mark);
        var dia2Result = this.checkDiagonalTRBL(board , x , y, mark);

        var vertWin = vertResult.pop();
        var horiWin = horiResult.pop();
        var dia1Win = dia1Result.pop();
        var dia2Win = dia2Result.pop();

        if(vertWin)
            winningSpots = winningSpots.concat(vertResult);
        if(horiWin)
            winningSpots = winningSpots.concat(horiResult);
        if(dia1Win)
            winningSpots = winningSpots.concat(dia1Result);
        if(dia2Win)
            winningSpots = winningSpots.concat(dia2Result);

        console.log(winningSpots);

        return winningSpots;
    }

    checkVertical(board , x , y, mark)
    {
        var winRow = [];
        var shiftX = x;

        //check left
        while(board[y][shiftX] == mark){
            winRow.push( [y,shiftX] );
            shiftX--;

            if(shiftX < 0)                  // stay in bounds
                break;
        }

        shiftX = x+1;
        if(shiftX < board.length)          // stay in bounds
        {
            //check right
            while(board[y][shiftX] == mark){
                winRow.push( [y,shiftX] );
                shiftX++;

                if(shiftX >= board.length)      // stay in bounds
                    break;
            }
        }

        if(winRow.length >= this.winStreak)
            winRow.push(true);
        else
            winRow.push(false);

        return winRow;
    }
    checkHorizontal(board , x , y, mark)
    {
        var winRow = [];
        var shiftY = y;
        //check up
        while(board[shiftY][x] == mark){
            winRow.push( [shiftY,x] );
            shiftY--;

            if(shiftY < 0)              // stay in bounds
                break;
        }

        shiftY = y+1;
        if(shiftY < board.length)          // stay in bounds
        {
            //check down
            while(board[shiftY][x] == mark){
                winRow.push( [shiftY,x] );
                shiftY++;

                if(shiftY >= board.length)  // stay in bounds
                    break;
            }
        }
        if(winRow.length >= this.winStreak)
            winRow.push(true);
        else
            winRow.push(false);

        return winRow;
    }
    checkDiagonalTLBR(board , x , y, mark)
    {
        var winRow = [];
        var shiftX = x;
        var shiftY = y;
        //check top left
        while(board[shiftY][shiftX] == mark){
            winRow.push( [shiftY,shiftX] );
            shiftY--;
            shiftX--;
            if(shiftX < 0 || shiftY < 0)              // stay in bounds
                break;
        }

        shiftX = x+1;
        shiftY = y+1;
        if(shiftX < board.length && shiftY < board.length)              // stay in bounds
        {
            //check bottom right
            while(board[shiftY][shiftX] == mark){
                winRow.push( [shiftY,shiftX] );
                shiftY++;
                shiftX++;
                if(shiftX >= board.length || shiftY >= board.length)              // stay in bounds
                    break;
            }
        }
        if(winRow.length >= this.winStreak)
            winRow.push(true);
        else
            winRow.push(false);

        return winRow;

    }
    checkDiagonalTRBL(board , x , y, mark)
    {
        var winRow = [];
        var shiftX = x;
        var shiftY = y;
        //check bottom left
        while(board[shiftY][shiftX] == mark){
            winRow.push( [shiftY,shiftX] );
            shiftY++;
            shiftX--;
            if(shiftX < 0 || shiftY >= board.length)            // stay in bounds
                break;
        }

        shiftX = x+1;
        shiftY = y-1;
        if(shiftX < board.length && shiftY >= 0)                // stay in bounds
        {
            //check top right
            while(board[shiftY][shiftX] == mark)
            {
                winRow.push( [shiftY,shiftX] );
                shiftY--;
                shiftX++;
                if(shiftX >= board.length || shiftY < 0)            // stay in bounds
                    break;
            }
        }

        if(winRow.length >= this.winStreak)
            winRow.push(true);
        else
            winRow.push(false);

        return winRow;
    }
}

////////////////////////////////////////////////////////////////////////////////

class Board
{
    constructor(size, tableElem)
    {
        this.size = size;
        this.table = tableElem;

        // gameboard data 2D array
        this.grid = [];
        this.checker = new BoardChecker(3);
        this.lastMark = [];

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
        this.boardW = 1/(this.size+1);
    }

    createSpace( name, cell )
    {
        var td = document.createElement("TD");
        var cell = document.createElement("DIV");
        cell.setAttribute("id", name);
        cell.addEventListener("click", markCell);
        cell.style.width = (this.cellSize+1) + "px";
        cell.style.height = this.cellSize + "px";
        cell.style.fontSize = (385/this.size)-(this.size/7) + "px"; // magic formula
        cell.style.margin = this.boardW + "px";
        cell.innerText = " ";
        td.setAttribute("class", "cell");
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
                //cell.style.border = "0px solid " + this.lineColor;
                cell.style.borderWidth = this.styleCellBorder(i,j);

                // draws horizontal lines (except for last for last row)
                if( i != (this.size-1))
                    row.setAttribute("class", "boardRow");

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

        this.lastMark.push(x);
        this.lastMark.push(y);
    }

    checkForWin()
    {
        var winningSlots = this.checker.check(this.grid, this.lastMark[0], this.lastMark[1]);

        if(winningSlots.length > 0)
            console.log("somebody won");

        if(winningSlots.length > 0)
        {
            for(var i=0; i<winningSlots.length; i++)
            {

                let cellNum = this.grid.length * winningSlots[i][0];
                cellNum += winningSlots[i][1];

                var cell = document.getElementById(cellNum.toString());
                cell.setAttribute("class", "cellWin");
            }
        }

        this.lastMark = [];
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
    getName() {   return this.name;  }
    setName(n){   this.name = n;     }
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

class LeaderBoard
{
    constructor(table)
    {
        this.rows = [];
        this.leaderBoard = table;
        this.turn = 0;
        this.clearBoard();
    }

    clearBoard()
    {
        while (this.leaderBoard.firstChild){
            this.leaderBoard.removeChild(this.leaderBoard.firstChild);
        }
        this.rows = [];
        this.leaderBoard.appendChild( this.createHeader() );
        this.turn = 0;
    }

    createHeader()
    {
        var playerTitle = document.createElement("TH");
        var markTitle = document.createElement("TH");
        var row = document.createElement("TR");
        playerTitle.innerText = "Player";
        markTitle.innerText = "Mark";
        playerTitle.setAttribute("class", "playerDataHeader");
        markTitle.setAttribute("class", "playerDataHeader");

        row.appendChild(playerTitle);
        row.appendChild(markTitle);
        return row;
    }

    createRow( player )
    {
        var row = document.createElement("TR");
        var plr = document.createElement("TD");
        var mrk = document.createElement("TD");
        plr.setAttribute("class", "playerData");
        mrk.setAttribute("class", "playerData");

        plr.innerText = player.getName();
        mrk.innerText = player.getMark();

        row.appendChild(plr);
        row.appendChild(mrk);

        return row;
    }

    setTurn( t )
    {
        this.rows[this.turn].setAttribute("class", "");
        this.turn = t;
        this.rows[this.turn].setAttribute("class","playerDataTurn");
    }

    addPlayer( player )
    {
        var r = this.createRow( player );
        this.rows.push( r );
        this.leaderBoard.appendChild( r );
    }

}

////////////////////////////////////////////////////////////////////////////////

class Game
{

    constructor( n )
    {
        this.numberOfPlayers = n;
        this.players = [];
        this.pageTitle;
        this.TTTBoard;
        this.leaderBoard;
        this.playerTurn = 0;
    }

    initiateGame( )
    {
        this.pageTitle = document.getElementById('heading');
        var gameTable = document.getElementById('board');
        var playerTable = document.getElementById('playerInfo');

        var size = this.getBoardSize();
        this.pageTitle.innerText = size +"x"+size+" Tic-Tac-Toe: " + this.numberOfPlayers + " Players";

        this.TTTBoard = new Board(size, gameTable);
        this.TTTBoard.generateBoard();

        this.leaderBoard = new LeaderBoard(playerTable);
    }

    newGame( num )
    {
        this.numberOfPlayers = num;
        var size = this.getBoardSize();
        this.pageTitle.innerText = size +"x"+size+" Tic-Tac-Toe: " + this.numberOfPlayers + " Players";
        this.TTTBoard.setSize( size );
        this.TTTBoard.generateBoard();
        this.players = [];
        this.leaderBoard.clearBoard();      // ---------------------------------------------

    }

    restartGame()
    {
        this.TTTBoard.generateBoard();
        this.setRandomTurn();
    }

    addPlayer ( name, mark )
    {
        var p = new Player( name, mark );
        this.leaderBoard.addPlayer( p );        // ---------------------------------------------
        this.players.push(p);
    }

    getBoardSize()
    {
        return (2 * this.numberOfPlayers) - 1;
    }

    markSpace(cellNum)
    {
        //var x = parseInt(cellNum%this.getBoardSize());
        //var y = parseInt(cellNum/this.getBoardSize());
        var m = this.players[this.playerTurn].getMark();
        //this.TTTBoard.grid[y][x] = m;
        this.TTTBoard.markSpace(cellNum, m);
        this.nextTurn();
        return m;
    }
    checkForWin()
    {
        this.TTTBoard.checkForWin();
    }

    nextTurn()
    {
        this.playerTurn++;

        if(this.playerTurn >= this.players.length)
            this.playerTurn = 0;
        this.leaderBoard.setTurn( this.playerTurn );
    }

    setRandomTurn()
    {
        var t = Math.floor( Math.random()*this.numberOfPlayers);
        this.playerTurn = t;
        this.leaderBoard.setTurn(t);
    }

    isSpaceOpen(cellNum)
    {
        var x = parseInt(cellNum%this.getBoardSize());
        var y = parseInt(cellNum/this.getBoardSize());
        if(this.TTTBoard.grid[y][x] == " ")
            return true;
        return false;
    }

}

////////////////////////////////////////////////////////////////////////////////


var slider = document.getElementById('slider');
var numPlayers = slider.value;
var mark = ["X", "O", "Y", "Z", "A", "B", "G", "T", "H", "V", "W"];
var count = 0;

let game = new Game( numPlayers );
game.initiateGame();

for(var i=0; i<numPlayers; i++)
    game.addPlayer( "Player "+i, mark[i] );
game.setRandomTurn();




function sliderChanged()
{
    numPlayers = slider.value;
    game.newGame( slider.value );

    for(var i=0; i<numPlayers; i++)
        game.addPlayer( "Player "+i, mark[i] );
    game.setRandomTurn();
    count = 0;
    console.log("slider changed");
}




function markCell(evt)
{
    var cellNum = evt.target.id;

    if(game.isSpaceOpen(cellNum))
    {
        evt.target.innerText = game.markSpace(cellNum);
        count++;
    }
    game.checkForWin();
}

function restartGame()
{
    game.restartGame();
}
