var holes = $('.hole');
var hole1 = $('#topLeft');
var score = 0;
var count = 15;

localStorage.high;
if(localStorage.high === undefined){
	localStorage.high = 0;
}
console.log(localStorage.high);

function moles() {
	setTimeout(function() {
		var image = '<img class="trump" src="img/trump.png"/>';
		$(image).appendTo(holes[Math.floor(Math.random()*8)]);
		setTimeout(function() {
			holes.empty();
			moles();
		}, 500 + Math.random() * 2000);
	}, 10);
}

//adds click event to start button, which calls moles function
$('#start').click(function(){
	check();
	moles();
	console.log("let the games begin");
	var counter = setInterval(timer, 1000);
	function timer() {
		count--;
		if (count < 0) {
			clearInterval(counter);
			$('#gameBoard').hide();
			$('h3').addClass("flash");
			$('#start').hide();
			$('header').append('<button type="button" id="reset">Try Again!</button>');
			return;
		}
		$('#time').text(count);
	}
})


//THIS FUNCTION IS NOT WORKING PROPERLY
function check() {
	var difficulty = $('#difficulty').value;
	if (difficulty === "easy") {
		console.log("this is easy");
	} else {
		console.log("this is hard");
	}
}

//reset button (refreshes page)
$(document).on('click', '#reset', function(e){
	location.reload();
})

//increases score every time image is clicked
$(document).on('click', '.trump', function(e) {
	$('img').attr("src","img/punched.png");
	score++;
	console.log(score);
	$('#score').text(score);
	checkScore(score);
	setTimeout(function() {
		hole1.empty()
	}, 300);
});

//compares current score to high score(local storage)
function checkScore(score) {
	if (score > localStorage.high) {
		localStorage.high = score;
	}
}
$('#high').text(localStorage.high);