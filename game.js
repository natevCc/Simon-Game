var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isStarted = false;
var level = 0;
var nextSequenceTimeout;
var recordLevel = 0;

$(document).keypress(function() {
    if (isStarted) {
        return;
    }
    isStarted = true;
    nextSequence();
});

$(".btn").click(function(evt) {
    if (!isStarted) {
        return;
    }

    var userChosenColour = evt.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function playSound(audioName) {
    var audio = new Audio(`./sounds/${audioName}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    var button = $(`#${currentColour}`);
    button.addClass("pressed");
    setTimeout(() => {
        button.removeClass("pressed");
    }, 100);
}

function nextSequence() {
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern = [];

    level++;

    updateTitle(`Ниво ${level}`);
    updateRecord();
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            nextSequenceTimeout = setTimeout(nextSequence, 1000);
        }
    } else {
        clearTimeout(nextSequenceTimeout);
        playSound("wrong");
        updateTitle("Ти загуби, Натисни клавиш за Рестарт");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    isStarted = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function updateTitle(text) {
    $("#level-title").text(text);
}

function updateRecordTitle(text) {
    $("#record-title").text(text);
}

function updateRecord() {
    if (level > recordLevel) {
        recordLevel = level;
    }

    updateRecordTitle(`Настоящ Рекорд ${recordLevel}`);
}