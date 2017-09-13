var pikaSpaces = $('.pika');
var charSpaces = $('.char');
var mewSpaces = $('.mew');
var score = 0;
var count = 15;

localStorage.high;
if(localStorage.high === undefined){
	localStorage.high = 0;
}

function randomPikachu() {
	setTimeout(function() {
		var image = '<img class="pikachu bounceInUp" src="img/pika2.gif"/>';
		$(image).appendTo(pikaSpaces[Math.floor(Math.random()*5)]);
		setTimeout(function() {
			pikaSpaces.empty();
			randomPikachu();
		}, 750 + Math.random() * 1000);
	}, 200);
}

function randomCharizard() {
	setTimeout(function() {
		var image = '<img class="charizard" src="img/flychar.gif"/>';
		$(image).appendTo(charSpaces[Math.floor(Math.random()*4)]);
		setTimeout(function() {
			charSpaces.empty();
			randomCharizard();
		}, 1000 + Math.random() * 2000);
	}, 500)
}

function randomMew() {
	setTimeout(function() {
		var image = '<img class="mewgif" src="img/mew.gif"/>';
		$(image).appendTo(mewSpaces[Math.floor(Math.random()*3)]);
		setTimeout(function() {
			mewSpaces.empty();
			randomMew();
		}, 500 + Math.random() * 1000);
	}, 1000)
}

//adds click event to start button, which calls moles function
$('.start').click(function(){
	randomPikachu();
	randomCharizard();
	randomMew();
	$('#intro').hide();
	var counter = setInterval(timer, 1000);
	function timer() {
		count--;
		if (count < 0) {
			clearInterval(counter);
			$('#gameBoard').hide();
			$('h3').addClass("flash");
			$('#start').hide();
			$('h5').hide();
			$('header').append('<button type="button" class="myButton" id="reset">Try Again!</button>');
			checkWin(score);
			return;
		}
		$('#time').text(count);
	}
})

//reset button (refreshes page)
$(document).on('click', '#reset', function(e){
	location.reload();
})

//increases score every time pikachu is clicked
$(document).on('click', '.pikachu', function(e) {
	$('.pikachu').attr("src","img/pokeball.png");
	score++;
	$('#score').text(score);
	checkScore(score);
	setTimeout(function() {
		pikaSpaces.empty();
	}, 300);
});
//game over if charizard is clicked
$(document).on('click', '.charizard', function(e) {
	$('h5').hide();
	$('h4').hide();
	$('#gameBoard').empty();
	// $('body').addClass("gameOver");
	count = 0;
	score = 0;
	checkWin(score);
	$('h3').text("Charizard used flamethrower. Game Over!");
})
//score increases by 2 if mew is clicked
$(document).on('click', '.mewgif', function(e) {
	$('.mewgif').attr("src","img/pokeball.png");
	score += 2;
	$('#score').text(score);
	checkScore(score);
	setTimeout(function() {
		mewSpaces.empty();
	}, 300);
});

//compares current score to high score(local storage)
function checkScore(score) {
	if (score > localStorage.high) {
		localStorage.high = score;
	}
}
$('#high').text(localStorage.high);

function checkWin(score) {
	if (score > 0 && score < 6) {
		$('body').addClass("tryAgain");
		$('h3').text("You only caught " + score + " Pokémon... Try again!");
	} else if (score > 6) {
		$('body').addClass("winner");
		$('h3').text("You caught " + score + " Pokémon!! You're a PokéMaster!")
	} else if (score === 0) {
		console.log("zerooooo");
		$('body').addClass("gameOver");
	}
}