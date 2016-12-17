var isGameStarted = false;
var isGameEnd = false;
var isAnswerChosen = false;
var totalQuestions = 0;
var rightAnswers = 0;
var wrongAnswers = 0;
var unansweredQns = 0;
var randomQnsIndexList = [];


$(document).ready(function(){
	toggleDivs('hide');	
	
	$('#startBtn').on('click', function(){
		isGameStarted = true;
		generateUniqueQuestions();
		startGame();
	});

	$('.choiceAns').on('click', function(){
		stopwatch.stop();
		game.checkAnswers($(this).data("index"));
	});

	$('#replay').click(function(){
		$('#myModal').modal('hide');
		$("#myModal").on("hidden.bs.modal", function(){
		 	$('#myModal').find('.modal-body').html(" ");
		});
		isGameStarted = true;
		generateUniqueQuestions();
		startGame();
	});	

	$('#restart').click(function(){
		$('#myModal').modal('hide');
		$("#myModal").on("hidden.bs.modal", function(){
		 	$('#myModal').find('.modal-body').html(" ");
		});
		location.reload();
	});	

});

function startGame(){
	sound("start");
	// console.log('In startGame().........');	
	toggleDivs('show');
	game.getRandomQuestion();
	stopwatch.reset();
	stopwatch.start();
}

function resetGame(){
	// console.log('In resetGame().........');
	stopwatch.stop();
	isGameStarted = false;
	isGameEnd = false;
	isAnswerChosen = false;
	totalQuestions = 0;
	rightAnswers = 0;
	wrongAnswers = 0;
	unansweredQns = 0;

	randomQnsIndexList = [];
}


function generateUniqueQuestions(){
	while(randomQnsIndexList.length <10){
    var randomnumber = Math.ceil(Math.random()* dataBank.length-1)
    if(randomQnsIndexList.indexOf(randomnumber) > -1) 
    	continue;
    randomQnsIndexList[randomQnsIndexList.length] = randomnumber;
	}
   console.log(randomQnsIndexList);
}


var game = {

	totalQuestions : 0,
	rightAnswerIndex : 0,
	correctAnswer : 0,
	correctImage : '',

	getRandomQuestion : function(){
		// console.log('In getRandomQuestion().........');
		// let questionIndex = Math.floor(Math.random() * dataBank.length);
		var questionIndex;
		if (randomQnsIndexList.length > 0){
			questionIndex = randomQnsIndexList.pop(randomQnsIndexList.length-1);
		}

		// console.log('questionIndex =' + questionIndex);

		if(questionIndex != undefined){

			// console.log('Got questionIndex and answers');
			$("#questionDiv").html(dataBank[questionIndex].question);
			$("#choice_0").html(dataBank[questionIndex].answer[0]);
			$("#choice_1").html(dataBank[questionIndex].answer[1]);
			$("#choice_2").html(dataBank[questionIndex].answer[2]);
			$("#choice_3").html(dataBank[questionIndex].answer[3]);

			this.rightAnswerIndex = dataBank[questionIndex].rightAnsIndex;
			this.correctAnswer = dataBank[questionIndex].answer[this.rightAnswerIndex];
			this.correctImage = dataBank[questionIndex].qaURL;

		}

		totalQuestions++ ;

	},

	updateStatus : function(){

		if(totalQuestions <=10){
			unansweredQns++;
			// console.log('unansweredQns', unansweredQns);
			this.showCorrect('missed');
			setTimeout(startGame, 5000);

		}else{
			this.showResults();
			resetGame();
		}
	},

	checkAnswers : function(index){

		// var showCorrectMethod = this.showCorrect;
		
		if(index === this.rightAnswerIndex ){

		// $('*[data-customerID="22"]');

		let idName = $('[data-index="' + index + '"]').attr('id');
		$('#' +idName).prepend("<span class='glyphicon glyphicon-ok'></span>       ");

		rightAnswers++;
			// console.log('rightAnswers',rightAnswers);
			this.showCorrect('right');

			// 	setTimeout(function(){
			// 	showCorrectMethod('right');
			// }, 2000); 


		}else{			
			
			let idName = $('[data-index="' + index + '"]').attr('id');
			$('#' +idName).prepend("<span class='glyphicon glyphicon-remove'></span>       ");
			wrongAnswers++;
			// console.log('wrongAnswers',wrongAnswers);
			this.showCorrect('wrong');
			
			// setTimeout(function(){
			// 	showCorrectMethod('wrong');
			// }, 2000); 
		}

		if(totalQuestions < 10){
			setTimeout(startGame, 5000);

		}else{
			this.showResults();	
			this.reset();
			resetGame();		
		}

	},

	showCorrect : function(str){
		// console.log(str, this);

		toggleDivs('pause');

		if(str ==='right'){
			sound('right');
			$('#statusAnswer').html(" YOU GOT THAT RIGHT! <img src='" + "assets/images/clap.gif" + "' width= 50 height =50>" + "<BR><BR> THE CORRECT ANSWER IS ");
			$('#statusAnswer').css("color", 'green');
		}else if (str === 'wrong'){
			sound('wrong');
			$('#statusAnswer').html(" YOU GOT THAT WRONG! <img src='" + "assets/images/wrong.gif" + "' width= 50 height =50>" + "<BR> THE CORRECT ANSWER IS ");
			$('#statusAnswer').css("color", 'red');	
		}else if (str === 'missed'){
			sound('missed');
			$('#statusAnswer').html(" YOU MISSED ANSWERING ! <BR><BR>The CORRECT ANSWER IS ");
			$('#statusAnswer').css("color", 'red');	
		}

		$('#rightAnswer').html(this.correctAnswer);
		$('#jsImg').find('img').attr('src', '');

		$("#result-img").html("<img width='450' height= '310' src='" 
						+ this.correctImage
						+ "'>");

	},

	showResults : function(){
		sound('end');
		let results = 
		 "Right Answers : " + rightAnswers + '<br>' + 
		 "Wrong Answers : " + wrongAnswers + '<br>' + 
		 "Unanswered Questions: " + unansweredQns; 
		 
		 $('#myModal').modal('show');
 		 $('#myModal').on('shown.bs.modal', function() {
    	 $('#myModal').find('.modal-body').html(results);
    	 	});
	},

	reset : function(){
		stopwatch.stop();
		this.totalQuestions = 0;
	}

};


var myWatch;

var stopwatch = {

  time: 15,

  reset: function() {
    stopwatch.time = 15;
  },

  start: function() {
    myWatch = setInterval(stopwatch.count, 1000);
  },

  stop: function() {
    clearInterval(myWatch);
  },

  count: function() {
  	// console.log("in stopwatch:count");
  	if(stopwatch.time == 0){
  		stopwatch.stop();
  		game.updateStatus();

  	}else{
  		sound('tick');
    	stopwatch.time--;
    	// console.log(stopwatch.time);
  		currentTime = stopwatch.timeConverter(stopwatch.time);
  	}

    $('#timer').html(currentTime);

  },

  timeConverter: function(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};

function toggleDivs(action){

	if(action == 'hide'){
		$('#resultsDiv').hide();
		$('#playDiv').hide();
		$('#answersDiv').hide();
		$('#questionDiv').hide();
		$('.mainQuestion').hide();
		$('#timer').hide();
	}else if(action == 'show'){		
		$('#playDiv').show();
		$('#answersDiv').show();
		$('#questionDiv').show();
		$('.mainQuestion').show();
		$('#resultsDiv').hide();
		$('#startDiv').hide();
		$('#timer').show();
	}else if(action == 'pause'){
		$("#resultsDiv").show();
		$('#playDiv').hide();
		$('#answersDiv').hide();
	}

}

function sound(str){
    var audio = document.createElement("audio");
    if(str ==="right"){
    	audio.src = "assets/sounds/right.wav";
	}else if(str === "wrong"){
		audio.src = "assets/sounds/wrong.wav";
	}else if(str === "click"){
		audio.src = "assets/sounds/click.wav";
	}else if(str === "tick"){
		audio.src = "assets/sounds/tick.wav";
	}else if(str === "end"){
		audio.src = "assets/sounds/end.wav";
	}else if(str === "start"){
		audio.src = "assets/sounds/start.wav";
	}else if(str === "missed"){
		audio.src = "assets/sounds/sad.wav";
	}
    audio.play();   
	}




