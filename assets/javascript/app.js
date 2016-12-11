
$( document ).ready(function() {

	//get random question from the databank
	// var dataBankLength = dataBank.length-1;
	var counter;
	var myVar;
	var rightAnswerIndex;
	var rightAnswers = 0;
	var wrongAnswers = 0;
	var unanswered = 0;

	
	// when answer selected, display correct or wrong. update counter of right/wrong/unanwered

	//time out, move on to next question


	$('.choiceAns').on('click', function(){
		// console.log('rightAnswerIndex',rightAnswerIndex);
		// console.log($(this).data("index"));

		if($(this).data("index") === rightAnswerIndex ){
			// console.log('correct answer!');
			$(this).prepend("<span class='glyphicon glyphicon-ok'></span>    ");
			rightAnswers++;
			console.log('correct answer!' + rightAnswers);


		}else{
			
			$(this).prepend("<span class='glyphicon glyphicon-remove'></span>    ");
			wrongAnswers++;
			console.log('wrong answer!' + wrongAnswers);
		}
		endTimer();
		// beginGame();
		
	});

function beginGame(){
	counter = 30;
	getRandomQuestion();
	//start timer	
	myVar = setInterval(beginTimer, 1000); //counter time

}

function getRandomQuestion(){

	var questionIndex = Math.floor(Math.random() * dataBank.length);

	$("#questionDiv").html(dataBank[questionIndex].question);
	$("#choice_1").html(dataBank[questionIndex].answer[0]);
	$("#choice_2").html(dataBank[questionIndex].answer[1]);
	$("#choice_3").html(dataBank[questionIndex].answer[2]);
	$("#choice_4").html(dataBank[questionIndex].answer[3]);

	rightAnswerIndex = dataBank[questionIndex].rightAnsIndex;

}

function beginTimer(){		
	counter--;
	console.log(counter);
	$("#timer").html(counter);
	 if(counter ==0){
	 	unanswered++;
	 	console.log('unanswered', unanswered);
	 	endTimer();
	 }
}

function endTimer(){
	clearInterval(myVar);
	console.log('ending timer');
	setTimeout(beginGame, 3000);
}


beginGame();

});