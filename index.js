//Start Page

let questionTally = 0;
let scoreTally = 0;

function beginQuizClicked() {
	// What happens when you click on the start page "begin" button
	$('.quizStart').on('click', '.startButton', function(event) {
		$('.quizStart').empty();
		startQuiz();
	});
}

function startQuiz() {
	updateQuestionTally();
	renderQuizQuestion();
	renderQuizAnswers();
}

function resetPage() {
	//restore sections for Q&A
	$('main').html(`
		<section role="Quiz Questions" class="quizQuestions"></section>
		<section role="Answers" class="answerForm"></section>`);
}

//Questions page

function renderQuizQuestion() {
	$('.quizQuestions').html(generateQuizQuestion());
}

function generateQuizQuestion() {
	if (questionTally < HOLOCRON.length) {
		return `<section role="Quiz Question number ${questionTally}" class="question-${questionTally}">
	    <h2>${HOLOCRON[questionTally].question}</h2></section>`;
	} else showResults();
}

function renderQuizAnswers() {
	$('.answerForm').html(generateQuizAnswers());
	submitAnswer();
}

function generateQuizAnswers() {
	if (questionTally < HOLOCRON.length) {
		return `<section role="Answer Choices" class="quizAnswers">
	    <form id="answerForm">
		    <fieldset>
			    <label class="answerChoice">
				    <input type="radio" value="${HOLOCRON[questionTally]
							.answers[0]}" name="answer" required autofocus>
				    <span>${HOLOCRON[questionTally].answers[0]}</span>
			    </label>
			    <label class="answerChoice">
				    <input type="radio" value="${HOLOCRON[questionTally]
							.answers[1]}" name="answer" required>
				    <span>${HOLOCRON[questionTally].answers[1]}</span>
			    </label>
			    <label class="answerChoice">
				    <input type="radio" value="${HOLOCRON[questionTally]
							.answers[2]}" name="answer" required>
				    <span>${HOLOCRON[questionTally].answers[2]}</span>
			    </label>
			    <label class="answerChoice">
				    <input type="radio" value="${HOLOCRON[questionTally]
							.answers[3]}" name="answer" required>
				    <span>${HOLOCRON[questionTally].answers[3]}</span>
			    </label>
			    <button type="submit" class="submitButton">Submit</button>
		    </fieldset>
	    </form>
    </section>
    `;
	} else {
		showResults();
		restartQuiz();
		$('.questionTally').text(10);
	}
}

//Ongoing Quiz progress

function changeScoreTally() {
	scoreTally++;
}

function updateScoreText() {
	$('.scoreTally').text(scoreTally);
}

function changeQuestionTally() {
	questionTally++;
	updateQuestionTally();
}

function updateQuestionTally() {
	$('.questionTally').text(questionTally + 1);
}

//Feedback

function submitAnswer() {
	$('#answerForm').on('submit', event => {
		event.preventDefault();
		let selected = $('input:checked');
		let answer = selected.val();
		let correctAnswer = `${HOLOCRON[questionTally].correctAnswer}`;
		if (answer === correctAnswer) {
			answerCorrect();
			nextQuestion();
		} else {
			answerWrong();
			nextQuestion();
		}
	});
}

function nextQuestion() {
	$('.nextButton').on('click', event => {
		changeQuestionTally();
		updateQuestionTally();
		$('.imgContainer').remove();
		resetPage();
		renderQuizQuestion();
		renderQuizAnswers();
	});
}

function answerWrong() {
	// What happens if the answer is wrong
	$('main').html(`
		<div class="imgContainer col-12">
			<img alt="Luke saying 'No!'" src="https://image.ibb.co/j07y5x/luke.gif">
			<p>Sorry, the correct answer was: "${HOLOCRON[questionTally]
				.correctAnswer}"</p>
			<button type="button" class="nextButton">Next Question</button>
			</div>`);
}

function answerCorrect() {
	// What happens if the answer is correct
	$('main').html(`
		<div class="imgContainer col-12">
		<img alt="Leia saying 'That's correct.'" src="https://image.ibb.co/cuVwsc/leia.gif">
		<button type="button" class="nextButton">Next Question</button>
		</div>`);
	changeScoreTally();
	updateScoreText();
}

//Quiz finished

function showResults() {
	if (scoreTally <= 2) {
		$('.quizQuestions').html(
			`<p>You only scored ${scoreTally} out of 10</p><h2>Into exile you must go, failed you have.</h2><button class="restartButton">Try Again?</button>`
		);
	} else if (scoreTally > 2 && scoreTally <= 5) {
		$('.quizQuestions').html(
			`<p>You scored ${scoreTally} out of 10</p><h2>You do have your moments. Not many, but you have them.</h2><button class="restartButton">Try Again?</button>`
		);
	} else if (scoreTally > 5 && scoreTally <= 8) {
		$('.quizQuestions').html(
			`<p>You scored ${scoreTally} out of 10</p><h2>Great, kid. Don’t get cocky.</h2><button class="restartButton">Try Again?</button>`
		);
	} else {
		$('.quizQuestions').html(
			`<p>You scored an outstanding ${scoreTally} out of 10!</p><h2>All too easy</h2><button class="restartButton">Try Again?</button>`
		);
	}
}

function restartQuiz() {
	$('main').on('click', '.restartButton', event => {
		scoreTally = 0;
		questionTally = 0;
		updateScoreText();
		updateQuestionTally();
		startQuiz();
	});
}
//Run the Quiz

function loadSWQuiz() {
	beginQuizClicked();
}

loadSWQuiz();
