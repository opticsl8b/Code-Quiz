// Getting elements -Page 1.
var start_quiz_btn = document.querySelector(".start-btn button");
var info_box = document.querySelector(".info-box");

// Getting elements -Page 2.
var quit_btn = info_box.querySelector(".info-button .quit");
var continue_btn = info_box.querySelector(".info-button .restart");
var quiz_box = document.querySelector(".quiz-box");

// Getting elements -Page 3.
var timer_read = quiz_box.querySelector(".sec");
var option_list = document.querySelector(".option-list");
var next_btn = document.querySelector(".next-btn");
var new_score = document.querySelector(".score");
var question_text = document.querySelector(".quiz-text");
// elements to inform if answer was correct
var tick_Icon = '<div class="icon-tick"><i class="far fa-check-circle"></i></div>';
var cross_Icon = '<div class="icon-cross"><i class="far fa-times-circle"></i></div>';

// Getting elements -Page 4.
var result_box = document.querySelector(".result-box");
var score_btn = result_box.querySelector(".quit");
var username = document.getElementById("input");
var replay_btn = result_box.querySelector(".restart");
var scoreboard_box = document.querySelector(".scoreboard-box");
var scoreboard_content = document.querySelector(".scoreboard");

// Getting elements -Page 5. 

var replay_quiz = scoreboard_box.querySelector(".restart ");
var clear_scores = scoreboard_box.querySelector(".clear");

// Page 1.- Start page

// Start quiz button click event
start_quiz_btn.addEventListener("click", function() {
    info_box.classList.add("clicked"); //show the info box
});

// Page 2.- Info page

// Quit + Continue button click event
quit_btn.addEventListener("click", function() {
    info_box.classList.remove("clicked"); //hide the info box
});

continue_btn.addEventListener("click", function() {
    info_box.classList.remove("clicked"); //hide the info box
    quiz_box.classList.add("clicked");
    showQuestion(0); //show the first quiz box
    timerStart(); //start the timer
});

//Page 3.- Question page

// start question 1. with 120 secs
var question_count = 0;
var time_remain = 120;

// endgame funtion
function endgame() {
    // record final score
    new_score = time_remain;
    // reset timer back to 120 secs
    clearInterval(timer_count);
    time_remain = 120;
    timer_read.textContent = time_remain;
    return;
}

// timer
function timerStart() {
    timer_count = setInterval(function() {
        // start the timer from 119.99s instead of 120.99s
        time_remain = time_remain - 1;
        // stop timer when timer goes to 0
        if (time_remain < 0) {
            endgame();
        } else {
            timer_read.textContent = time_remain;
        }
    }, 1000)
}

// Function that gets displays questions
function showQuestion(question_count) {
    // element that creates question text from question.js-"question" array
    var question_tag = '<span>' + questions[question_count].question + '</span>';
    // element that creates option text responsive to the question
    var option_tag =
        '<div class="option">' + questions[question_count].options[0] + '</div>' +
        '<div class="option">' + questions[question_count].options[1] + '</div>' +
        '<div class="option">' + questions[question_count].options[2] + '</div>' +
        '<div class="option">' + questions[question_count].options[3] + '</div>';

    question_text.innerHTML = question_tag;
    option_list.innerHTML = option_tag;

    // array that selected all option div
    var option = option_list.querySelectorAll(".option");

    // when option was clicked ,check if its correct
    for (var i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//Function that checks option selected
function optionSelected(answer) {
    // elements that represent the option selected
    var chosen_answer = answer.textContent;
    // elements that represent the correct answer
    var correct_answer = questions[question_count].answer;
    // if option selected is correct
    if (chosen_answer == correct_answer) {
        // inform with responsive css class + tick icon at the end
        answer.classList.add("correct");
        answer.insertAdjacentHTML('beforeend', tick_Icon);
    } else {
        // inform with responsive css class + cross icon at the end
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML('beforeend', cross_Icon);
        // subtract time from providing wrong answer
        time_remain = time_remain - 20;
    }
    // Disable options once answer was selected avoid muti-selected
    var disable_opt = option_list.children.length;
    for (let i = 0; i < disable_opt; i++) {
        option_list.children[i].classList.add("disabled");
    }
    // don't show next button unless option is selected
    next_btn.style.display = "block";
}

// Next button click event
next_btn.addEventListener("click", function() {

    // show next question if its not the last page
    if (question_count < questions.length - 1) {
        question_count++;
        showQuestion(question_count);
        // only shows button if option was selected
        next_btn.style.display = "none";
    } else { // show Page 4. if it's the end of the quiz
        quiz_box.classList.remove("clicked"); //hide the quiz box
        result_box.classList.add("clicked"); //show the result box
        new_score.innerHTML = " " + time_remain + " ";
        endgame(); // stop timer and record score
    }
});

// Page.4 Result page

// make a array stores the scores
var leaderboard = [];

// function assists sort scores 
function compareScores(a, b) {
    return b.score - a.score;
}

// funtion displays score 
function displayScores() {
    // reset scoreboard content
    scoreboard_content.innerHTML = "";
    //sort scores in decending order  
    leaderboard.sort(compareScores);


    // create a loop adding content to the scoreboard
    for (var i = 0; i < leaderboard.length; i++) {
        var li = document.createElement("li");
        li.textContent = leaderboard[i].name + " - " + leaderboard[i].score + " points.";
        scoreboard_content.appendChild(li);
    }
}

// funtion stores scores in JSON string
function storeScore() {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// Scoreboard button event
score_btn.addEventListener("click", function(event) {
    event.preventDefault();
    //grab username entered and trim redundent 
    var username_entered = username.value.trim();

    //inform if form is empty
    if (!username_entered) {
        alert("Please Enter your Name");
        return;
    }
    // object with resultscore and username
    var resultscore = {
        score: new_score,
        name: username_entered,
    }
    leaderboard.push(resultscore); // push the objct into leaderboard array
    // empty the input
    username.value = "";
    // save & display
    storeScore();
    displayScores();
    result_box.classList.remove("clicked"); //hide the info box
    scoreboard_box.classList.add("clicked"); // show scoreboard
});

// Page 5. Scoreboard

// Replay button event
replay_quiz.addEventListener("click", function() {
    clearInterval(timer_count);
    scoreboard_box.classList.remove("clicked"); // hide the scoreboard box
    question_count = 0; // reset question count
})

// Clear button event
clear_scores.addEventListener("click", function() {
    // wipe local storage
    localStorage.clear();
    // reset leaderboard array then display
    leaderboard = [];
    displayScores();
})