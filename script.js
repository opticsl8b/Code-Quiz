// Info Text
// 1. You will have only <span>120 second</span> for the quiz.
// 2. Once answer is selected, cant be reselectd.
// 3. Proving with wrong answer will subtract from the timer.
// 4. Timer will only stop once all the quiz are answered.
// 5. Points will be recorded with your name.

// Quiz Text
// Q1
// _______ is the process of finding errors and fixing them within a program.

// A. Compiling
// B. Executing
// C. Scanning
// D. Debugging

// answer:D

// Q2
// Sal needs to execute a section of code ten times within a program. Compare the selection structures below and select which one meets the needs identified.
// A. If-Else
// B. For
// C. While
// D. If

// answer:B

// Q3
// During program development, software requirements specify

// A. How the program will accomplish the task
// B. How to divide the task into subtasks
// C. What the task is that the program must perform
// D. How to test the program when it is done

// answer:C

// Q4
// A loop that never ends is referred to as a(n)_________.
// A. While loop
// B. Infinite loop
// C. Recursive loop
// D. for loop

// answer:B

// Q5
// Which of the following can be used to call a JavaScript Code Snippet?
// A. Function/Method
// B. Preprocessor
// C. Triggering Event
// D. RMI

// answer:A

//getting reqired elements

var start_quiz_btn = document.querySelector(".start-btn button");
var info_box = document.querySelector(".info-box");
var quit_btn = info_box.querySelector(".buttons .quit");
var restart_btn = info_box.querySelector(".buttons .restart");

// start quiz button click event

start_quiz_btn.addEventListener("click", function() {
    info_box.classList.add("clicked");
});