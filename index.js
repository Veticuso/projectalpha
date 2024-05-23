var userClickedPattern = [];
var gameHandler = [];
var gameSequence = [];
var level = 0;
var gameStarted = false;
var gameRunning = false;

function btnAnimLogic(e) {
    $("#" + e).toggleClass("pressed");
    setTimeout(function() {
        $("#" + e).toggleClass("pressed");
    }, 150);
}

function audioLogic(e) {
    switch(e) {
        case "green":
            var audioSel = new Audio("./sounds/green.mp3");
            audioSel.play();
        break;
        case "red":
            var audioSel = new Audio("./sounds/red.mp3");
            audioSel.play();
        break;
        case "yellow":
            var audioSel = new Audio("./sounds/yellow.mp3");
            audioSel.play();
        break;
        case "blue":
            var audioSel = new Audio("./sounds/blue.mp3");
            audioSel.play();
        break;
        default: var audioSel = new Audio("./sounds/wrong.mp3"); audioSel.play();
    }
}

function gameLogic() {
    var colorArray = ["green", "red", "yellow", "blue"];
    var randomNum = Math.floor(Math.random() * 4);
    var randomColor = colorArray[randomNum];

    clickControl(false);

    $("h1").text("Level: " + (level + 1));

    gameSequence.push(randomColor);

    setTimeout(function() {
        $("#" + randomColor).fadeToggle(150);
        audioLogic(randomColor);
        $("#" + randomColor).fadeToggle(150);
    }, 400);

    gameHandler = [];

    console.log("First user: " + userClickedPattern);
    console.log("First hand: " + gameHandler);
    console.log("First game: " + gameSequence);
    console.log("------------------------");
    console.log("Game: Initialise");
    console.log("------------------------");

    clickControl(true);
}

function checkInput(color) {
    var latestValue = userClickedPattern.length - 1;

    clickControl(false);

    if(gameRunning) {
        if(userClickedPattern[0] == gameSequence[0]) {
            if(gameSequence.length == 1) {
                clickControl(false);

                console.log("Fifth user: " + userClickedPattern);
                console.log("Fifth hand: " + gameHandler);
                console.log("Fifth game: " + gameSequence);
                console.log("------------------------");
                console.log("Turn: Selected");
                console.log("------------------------");

                gameHandler.push(userClickedPattern[0]);
                gameSequence.shift();

                userClickedPattern = [];
                level += 1;

                console.log("Sixth user: " + userClickedPattern);
                console.log("Sixth hand: " + gameHandler);
                console.log("Sixth game: " + gameSequence);
                console.log("------------------------");
                console.log("Completed Level: " + level);
                console.log("------------------------");
        
                gameSequence.push(...gameHandler);
                gameHandler = [];

                setTimeout(function() {
                    gameLogic();
                }, 1000);

                return;
            }

            clickControl(true);

            console.log("Third user: " + userClickedPattern);
            console.log("Third hand: " + gameHandler);
            console.log("Third game: " + gameSequence);
            console.log("------------------------");
            console.log("Turn: Selected");
            console.log("------------------------");

            gameHandler.push(userClickedPattern[0]);
            gameSequence.shift();
            userClickedPattern = [];

            console.log("Forth user: " + userClickedPattern);
            console.log("Forth hand: " + gameHandler);
            console.log("Forth game: " + gameSequence);
            console.log("------------------------");
            console.log("Turn: Outcome");
            console.log("------------------------");

            return;
        }
    }

    if(color == gameSequence[0]) {
        console.log("Second user: " + userClickedPattern);
        console.log("Second hand: " + gameHandler);
        console.log("Second game: " + gameSequence);
        console.log("------------------------");
        console.log("Completed Level: " + (level + 1));
        console.log("------------------------");

        clickControl(false);

        gameHandler.push(userClickedPattern[0]);

        userClickedPattern = [];
        level += 1;
        gameRunning = true;

        setTimeout(function() {
            gameLogic();
        }, 1000);
    } else {
        console.log("Second user: " + userClickedPattern);
        console.log("Second hand: " + gameHandler);
        console.log("Second game: " + gameSequence);
        console.log("------------------------");
        console.log("Failed Level: " + (level + 1));
        console.log("------------------------");

        clickControl(false);

        $(document.body).toggleClass("game-over");
        setTimeout(function() {
            $(document.body).toggleClass("game-over"); 
        }, 150);

        $("h1").text("Press any key to try again!");

        userClickedPattern = [];
        gameHandler = [];
        gameSequence = [];

        audioLogic();
    }
}

function clickControl(bool) {
    if(bool) {
        $(".btn").on("click", function() {
            var colorSel = this.id;
        
            userClickedPattern.unshift(colorSel);
        
            audioLogic(colorSel);
            btnAnimLogic(colorSel);
            checkInput(colorSel);
        })
    } else {
        $(".btn").off("click");
    }
}

$(document).keydown(function(e) {
    level = 0;

    if(gameStarted) {
        console.log("------------------------");
        console.log("RESTART");
        console.log("------------------------");

        gameStarted = false;

        setTimeout(function() {
            gameLogic();
        }, 100);

        return;
    }

    if(e.key == "a" && !gameStarted) {
        console.log("------------------------");
        console.log("START");
        console.log("------------------------");

        gameStarted = true;
        
        setTimeout(function() {
            gameLogic();
        }, 100);
    } else {
        return;
    }
})