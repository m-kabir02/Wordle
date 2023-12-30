// creating 30 tiles thru js

var height = 6; //# of guesses
var width = 5; // length of the word

//to find out where in the board we are: must init row and col
var row = 0; //current guess (attempt #)
var col = 0; //current letter for that attempt


var gameOver = false;
var word = "SQUID"; // uses one word = squid

// words = ["SQUID", "APPLE"]
// word = words[Math.random]

window.onload = function () {
    initialize();
}

function initialize() {
    //multiplies tile for board. limits to 6 attempts (height) and 5 letters (wdith)
    for (let i = 0; i < height; i++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            //uses span so elements are next to each other without moving to another line
            tile.id = i.toString() + "-" + c.toString();
            tile.classList.add("tile");
            //applies styling for class .tile to the tile in js

            //<span id ="0-0" class="tile"></span>
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
            // adds js tile to the board id in html
            
        }
    }
    
    //listen for key press
    document.addEventListener("keyup", (e) => {
        //when user releases a key {
        if (gameOver) return;
        // alert(e.code);
        //returns what key was pressed (.code)
        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            //to limit to alphabet keys>>>
            if (col < width) {
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                if (currTile.innerText === "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                    
                }
                
                
            }
            
            
        }
        
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                // if col is between 1 and 5, they can backspace
                col -= 1;
                //goes to the previous col
            }
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            //fetches tile
            currTile.innerText = "";
            //sets currTile to blank
        }
        
        else if (e.code == "Enter") {
            update();
                row += 1; //starts new row
                col = 0; //starts at 0 for new row.
            }
            
            if (!gameOver && row == height) {
                //row == height means all 6 attempts are done
                gameOver = true;
                document.getElementById("answer").innerText = word;
            }
        
        
    })
}

    
    function update() {
        let correct = 0;
        for (let c = 0; c < width; c++) {
            let currTile = document.getElementById(row.toString() + "-" + c.toString());
            let letter = currTile.innerText;

            //are letters in the correct position?
            if (word[c] == letter) {
                currTile.classList.add("correct");
                correct += 1;
            }
            // is it in the word? 
            else if (word.includes(letter)) {
                currTile.classList.add("present");
            } // is not in word?
            else {
                currTile.classList.add("absent")
            }

           
            
        }
        if (correct == width) {
            gameOver = true;
        }
    }       