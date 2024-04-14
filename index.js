var gameOn = false;
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

$(".btn").on("click", function(event) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);
    console.log(gamePattern);
    checkAnswer(userClickedPattern.length - 1);
    
});

$(document).on("keypress", function(event) {
    if (!gameOn) {
        nextSequence();
        gameOn = true;
        $("#level-title").text("LEVEL: " + level)
    }
})



/**
 * This function takes the currentLevel as an input and check userClickedPattern with the stored gamePattern.
 * @param {Number} currentLevel Index of the last colour in array
 */
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function() {
            nextSequence();
            }, 1000);
            
        }
        
    } else {
        console.log("wrong");
        playSound("wrong");
        
        $('body').addClass("game-over");
        setTimeout(function() {
            $('body').removeClass("game-over");
        }, 200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

/**
 * This function reset the game to start over
 */
function startOver() {
    level = 0;
    gamePattern = [];
    gameOn = false;
}


/**
 * This function takes the currentColour as an input and animates it with the css '.pressed' class
 * @param {string} currentColour Current color name
 */
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


/**
 * This function takes a sound name as argument and plays the sound.
 * @param {string} name Name of the sound
 */
function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

/**
 * This function generates a random number between 0 and 3,
 * Choses a color from buttonColours array using the random generated number.
 * And adds the chosen color to the gamePattern array.
 */
function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
    $("#level-title").text("LEVEL: " + level)
    
}
