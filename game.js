randomChoosenColor = "";

function nextSequence()
{
    //making user's pattern empty for next level
    userClickedPattern = [];
    level++;

    //selecting a random color
    randomNumber = Math.floor(Math.random()*4);
    buttonColors = ["red", "blue", "green", "yellow"];
    randomChoosenColor = buttonColors[randomNumber];
    
    //adding the random color to game pattern
    gamePattern.push(randomChoosenColor);

    playSound(randomChoosenColor);
    animatePress(randomChoosenColor);

    //updating level
    $("h1").text("Level " + level);
}

//waiting for a single keypress to begin the game
$(document).one("keypress", function(){    
    nextSequence();
});

//Or waiting for a single tap to begin the game
$(document).one("touchstart", function(){    
    nextSequence();
});

//initializing variables(initial state)
userClickedPattern = [];
gamePattern = [];
var level = 0;

//button click
$(".btn").click(function(){
    userChoosenColor = this.id; //capturing the clicked button
    //updating userClickedPattern
    userClickedPattern.push(userChoosenColor);

    animatePress(userChoosenColor);
    playSound(userChoosenColor);

    //checking if the user messed up
    checkAnswer(userClickedPattern.length -1); //passing the latest click's index
});

//button animation
function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");

setTimeout(function(){
    
    $("#" + currentColor).removeClass("pressed")

}, 100);
}

//sounds
function playSound(name)
{
    switch(name){
        case "red":
            var audio = new Audio("sounds/red.mp3");
            audio.play();
        break;
        case "blue":
            var audio = new Audio("sounds/red.mp3");
            audio.play();
        break;
        case "green":
            var audio = new Audio("sounds/red.mp3");
            audio.play();
        break;
        case "yellow":
            var audio = new Audio("sounds/red.mp3");
            audio.play();
        break;
    
        default:
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
    }
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) //user choice matches the corresponding game pattern
    {
        if(userClickedPattern.length == gamePattern.length) //means the current level is complete
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    //user messed up
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        //Restart
        startOver();
    }
}

function startOver()
{
    $("h1").text("Game Over, Press Any Key to Restart");
    
    //Restting variables
    level = 0;
    gamePattern = [];

    //expecting a single keypress to begin again
    $(document).one("keypress", function(){    
        nextSequence();
    });

    //Or expecting a single tap to begin again
    $(document).one("touchstart", function(){    
        nextSequence();
    });
}