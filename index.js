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
});

$(document).on("keypress", function(event) {
    if (!gameOn) {
        nextSequence();
        gameOn = true;
        $("#level-title").text("LEVEL: " + level)
    }
})



function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function nextSequence() {
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
    $("#level-title").text("LEVEL: " + level)
    
}
