
$(document).ready(function() {
	
	var totalQuestions = 0;
	var rightAnswerIndex;
	var rightAnswers = 0;
	var wrongAnswers = 0;
	var unanswered = 0;
	var counter = 10;


	$('.choiceAns').on('click', function(){
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
		
	});


	$('#replay').click(function(){
		$('#myModal').modal('hide');
		$("#myModal").on("hidden.bs.modal", function(){
    		 $('#myModal').find('.modal-body').html(" ");
		});
		
		initGame();
		beginGame();
	});


function initGame(){
	totalQuestions = 0;
	rightAnswers = 0;
	wrongAnswers = 0;
	unanswered = 0;
	counter = 10;
}	

function beginGame(){
	counter = 10;
	getRandomQuestion();
	//start timer	
	myVar = setInterval(beginTimer, 1000); //counter time

}

function getRandomQuestion(){
	totalQuestions ++;

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
	// console.log(counter);
	$("#timer").html(counter);
	 if(counter == 0){
	 	unanswered++;
	 	console.log('unanswered', unanswered);
	 	endTimer();
	 }
}

function endTimer(){
	clearInterval(myVar);

	if(totalQuestions < 5){
		setTimeout(beginGame, 2000);
	}else{
		 var results = 
		 "Right Answers : " + rightAnswers + '<br>' + 
		 "Wrong Answers : " + wrongAnswers + '<br>' + 
		 "Unanswered Questions: " + unanswered; 
		 
		 $('#myModal').modal('show');
 		 $('#myModal').on('shown.bs.modal', function() {
    	 $('#myModal').find('.modal-body').html(results);
    	 	});
	}
}

beginGame();

});