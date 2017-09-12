var pikaSpaces = $('.pika');
var charSpaces = $('.char');
var mewSpaces = $('.mew');
var score = 0;
var count = 15;

localStorage.high;
if(localStorage.high === undefined){
	localStorage.high = 0;
}
console.log(localStorage.high);

function randomPikachu() {
	setTimeout(function() {
		var image = '<img class="pikachu" src="img/pikachu.png"/>';
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
	$('.start').hide();
	$('h4').hide();
	var counter = setInterval(timer, 1000);
	function timer() {
		count--;
		if (count < 0) {
			clearInterval(counter);
			$('#gameBoard').hide();
			$('h3').addClass("flash");
			$('#start').hide();
			$('header').append('<button type="button" class="myButton" id="reset">Try Again!</button>');
			$('p').hide();
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
	console.log(score);
	$('#score').text(score);
	checkScore(score);
	setTimeout(function() {
		pikaSpaces.empty();
	}, 300);
});

$(document).on('click', '.charizard', function(e) {
	$('h5').hide();
	$('h4').hide();
	$('#gameBoard').empty();
	$('body').addClass("gameOver");
	count = 0;
})

$(document).on('click', '.mewgif', function(e) {
	$('.mewgif').attr("src","img/pokeball.png");
	score += 2;
	$('#score').text(score);
	checkScore(score);
	setTimeout(function() {
		mewSpace.empty();
	}, 300);
});

//compares current score to high score(local storage)
function checkScore(score) {
	if (score > localStorage.high) {
		localStorage.high = score;
	}
}
$('#high').text(localStorage.high);

// function checkWin(score) {
// 	if (score = 0) {
// 		$('#score').text("You didn't catch any Pokémon!");
// 	} else if (1 <= score <= 5) {
// 		$('#score').text("only " + score);
// 	} else {
// 		$('#score').text(score);
// 	}
// }