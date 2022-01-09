// Getting elements

var start_quiz_btn = document.querySelector(".start-btn button");
var info_box = document.querySelector(".info-box");
var quit_btn = info_box.querySelector(".info-button .quit");
var continue_btn = info_box.querySelector(".info-button .restart");
var quiz_box = document.querySelector(".quiz-box");
var option_list = document.querySelector(".option-list");
var timer_read = quiz_box.querySelector(".sec");

// First page- Start page
// Start quiz button click event

start_quiz_btn.addEventListener("click", function() {
    info_box.classList.add("clicked"); //show the info box
});

// 2nd page- Info page
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

// 3rd page- Question page

var question_count = 0;
var time_remain = 120;
var next_btn = document.querySelector(".next-btn");
var new_score = document.querySelector(".score")

// Timer event

function endgame() {

    // record final score
    new_score = time_remain;

    clearInterval(timer_count);

    // reset timer 
    time_remain = 120;
    timer_read.textContent = time_remain;
    return;
}

function timerStart() {
    timer_count = setInterval(function() {
        time_remain = time_remain - 1;
        if (time_remain < 0) {
            endgame();
        } else {
            timer_read.textContent = time_remain;
        }
    }, 1000)
}

// Next button click event

next_btn.addEventListener("click", function() {

    if (question_count < questions.length - 1) {
        question_count++;
        showQuestion(question_count);

        // only shows button if option was selected
        next_btn.style.display = "none";

    } else {
        quiz_box.classList.remove("clicked"); //hide the quiz box
        result_box.classList.add("clicked"); //show the result box
        new_score.innerHTML = " " + time_remain + " ";
        endgame(); // stop timer and record score

    }
});



// Getting question

function showQuestion(index) {
    var question_text = document.querySelector(".quiz-text");
    var question_tag = '<span>' + questions[index].question + '</span>';
    var option_tag =
        '<div class="option">' + questions[index].options[0] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[1] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[2] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[3] + '<span></span></div>';

    question_text.innerHTML = question_tag;
    option_list.innerHTML = option_tag;

    // when answer was picked
    var option = option_list.querySelectorAll(".option");
    for (var i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// Check if answer was correct with responsive color
var tick_Icon = '<div class="icon-tick"><i class="far fa-check-circle"></i></div>';
var cross_Icon = '<div class="icon-cross"><i class="far fa-times-circle"></i></div>';


function optionSelected(answer) {
    var chosen_answer = answer.textContent;
    var correct_answer = questions[question_count].answer;

    if (chosen_answer == correct_answer) {
        answer.classList.add("correct");
        answer.insertAdjacentHTML('beforeend', tick_Icon);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML('beforeend', cross_Icon);

        // subtract time from providing wrong answer
        time_remain = time_remain - 20;
    }

    // Disable options once answer was selected
    var disable_opt = option_list.children.length;
    for (let i = 0; i < disable_opt; i++) {
        option_list.children[i].classList.add("disabled");
    }
    // don't show next button unless option is selected
    next_btn.style.display = "block";
}

// 4th page Result page

var result_box = document.querySelector(".result-box");
var score_btn = result_box.querySelector(".quit");
var user_name = document.getElementById("input");

var replay_btn = result_box.querySelector(".restart");

// replay button event

// replay_btn.addEventListener("click", function() {
//     result_box.classList.remove("clicked"); //hide the quiz box
// });

// Score button event
var leaderboard = [];
var scoreboard_box = document.querySelector(".scoreboard-box");

score_btn.addEventListener("click", function(event) {
    event.preventDefault();
    var resultscore = {
        name: user_name.value.trim(),
        score: new_score,
    }
    console.log(resultscore);
    localStorage.setItem("resultscore", JSON.stringify(resultscore));
    result_box.classList.remove("clicked"); //hide the info box
    scoreboard_box.classList.add("clicked"); // show scoreboard
});