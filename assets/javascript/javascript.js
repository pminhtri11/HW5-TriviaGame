var questionObjects = [
  "Why does Kerrigan want to kill Mengsk?",
  "How did Raynor die?",
  "What is another name for Amon?",
  "What is the first expansion of StarCraft II?",
  "Which one is a Protoss building?",
  "Which one is a Terran building?",
  "Which one is a Zerg building?",
  "How many mission's exist in StarCraft II (including all expansion)?"
];
var answerChoice = [
  "Mengsk kill her family", "Mengsk want to kill everyone", "Kerrigan want to destroy the world", "He betray her and left her to die!",
  "He was shot.", "He never die.", "The Protoss assasinate him", "Mengsk kill him.",
  "Death Bringer", "The Fallen One", "The Acient One", "The Final Surviver",
  "Heart of the Swarm", "The Great Liberation", "Death Day", "Legacy of the Void",
  "Nexus", "Command Center", "Hatchery", "Museum",
  "Gateway", "Stargate", "Bunker", "Evolution Chammber",
  "Spire", "Fleet Beacon", "Warpgate", "Barracks",
  "25", "30", "68", "125"
];

// All the answer to the questions.
var answerArray = [
  "He betray her and left her to die!",
  "He never die.",
  "The Fallen One",
  "Heart of the Swarm",
  "Nexus",
  "Bunker",
  "Spire",
  "68"
];

var a = 0;
var b = 0;
var correctJ = 0;
var wrongJ = 0;
var notAnswer = 0;
var timerFinal;

//hide the score Container Initially
$(".scoreContainer").hide();

//Press button to start the program.
function startButton() {
  $("#start").on("click", function () {
    timerInterval();
    $("button").hide();
  });
}


// a buffer function for setTimeInterval so there wont be an overlap in seconds.
function buffer() {
  //call timer function.
  timerInterval();
}


function imageDisplay(){
  $(".onClickButton").hide();
  $("#image").show();
  var x = document.createElement("IMG");    
  x.setAttribute("src", imagePic);
  x.setAttribute("width", "304");
  x.setAttribute("height", "228");
  $("#image").html(x);

  setTimeout(function(){
    $("#image").hide();
    if (b < questionObjects.length)
    {
      $(".onClickButton").show();
    }    
  }, 2000 );
}

//creating timecountdown.
function timerInterval() {
  var sec = 10;
  document.getElementById("timer").innerHTML = "Time Remain: " + sec + " second";

  timerFinal = setInterval(function () {
    sec--;
    document.getElementById("timer").innerHTML = "Time Remain: " + sec + " second";
    console.log(timerFinal);

    if (sec == 0) {
      notAnswer++;
      $("#guess").show();
      document.getElementById("guess").innerHTML = "Your out of time. The correct answer is: " + answerArray[b];
      imageDisplay();
      a = a + 4;
      b++;

      clearInterval(timerFinal);
      console.log("timerInterval clear: " + timerFinal);

      if (b >= questionObjects.length) {
        result();
        return;
      }

      setTimeout(function () {
        buffer();
      }, 2000);
    }

  }, 1000);
  // run Q & A function
  QA();
}


// use to initialize the Answer choices, questions and take their answer.
function QA() {

  // if running out of questions, call the result function to end the program.
  if (b >= questionObjects.length) {
    result();
    return;
  }

  // hide the result 
  $("#guess").hide();

  //get the question above
  document.getElementById("questionAsk").innerHTML = "Question: " + questionObjects[b];

  //Probably better way to combine both the innerHTML and value together?
  for (var i = 0; i < 4; i++) {
    document.getElementById("answerChoice1").innerHTML = "1. " + answerChoice[a];
    document.getElementById("answerChoice1").value = answerChoice[a];
    document.getElementById("answerChoice2").innerHTML = "2. " + answerChoice[a + 1];
    document.getElementById("answerChoice2").value = answerChoice[a + 1];
    document.getElementById("answerChoice3").innerHTML = "3. " + answerChoice[a + 2];
    document.getElementById("answerChoice3").value = answerChoice[a + 2];
    document.getElementById("answerChoice4").innerHTML = "4. " + answerChoice[a + 3];
    document.getElementById("answerChoice4").value = answerChoice[a + 3];
  }

  $("#answerChoice1, #answerChoice2, #answerChoice3, #answerChoice4").bind("click", function () {

    //unbind it after click
    $("#answerChoice1, #answerChoice2, #answerChoice3, #answerChoice4").unbind("click");
    if (this.value === answerArray[b]) {
      $("#guess").show();
      document.getElementById("guess").innerHTML = "You are correct!";
      imagePic = "https://media.tenor.com/images/0640af817a95f0460657f52a98225fcd/tenor.gif";
      imageDisplay();
      correctJ++;
    }
    else {
      $("#guess").show();
      document.getElementById("guess").innerHTML = "You are wrong! The correct answer is: " + answerArray[b];
      imagePic = "https://i.imgur.com/Q375Y1I.gif?1";
      imageDisplay();
      wrongJ++;
    }

    // rotate to the next 4 answer choice
    a = a + 4;
    b++;

    //pause the time after we click
    clearInterval(timerFinal);
    console.log("click function: " + timerFinal);

    // if out of question go to result;
    if (b >= questionObjects.length) {
      result();
      return;
    }
    //pause for 2 second then run buffer
    setTimeout(function () {
      buffer();
    }, 2000);
  });

}

function result() {
  $("#timer").hide();
  $(".onClickButton").hide();
  $("#guess").hide();
  $(".scoreContainer").show();
  document.getElementById("correct").innerHTML = "Right answers: " + correctJ;
  document.getElementById("wrong").innerHTML = "Wrong answers: " + wrongJ;
  document.getElementById("unAnswer").innerHTML = "Unanswered Question: " + notAnswer;
  console.log(timerFinal);
}



// Error With the Program:
// 2. The timer at the result screen wont stop. 