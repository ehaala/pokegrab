var holes = $('.hole');
var score = 0;
var hole1 = $('#topLeft');
var count = 10;

function moles() {
	setTimeout(function() {
		hole1.append('<img class="trump" src="img/trump.png">');
		setTimeout(function() {
			hole1.empty();
			moles();
		}, 3000);
	}, 6000);
}


//adds click event to start button, which calls moles function
$('#start').click(function(){
	moles();
	console.log("let the games begin");
	var counter = setInterval(timer, 1000);
	function timer() {
		count--;
		if (count < 0) {
			clearInterval(counter);
			$('#gameBoard').empty();
			$('h3').addClass("flash");
			return;
		}
		$('#time').text(count);
	}
})




$(document).on('click', '.trump', function(e) {
	$('img').attr("src","img/punched.png");
	score++;
	console.log(score);
	$('#score').text(score);
	setTimeout(function() {
		hole1.empty()
	}, 300);
});