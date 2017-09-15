var pikaSpaces = $('.pika');
var charSpaces = $('.char');
var mewSpace = $('.mew');
var score = 0;
var count = 15;

localStorage.high;
if(localStorage.high === undefined){
	localStorage.high = 0;
}

function randomPikachu() {
	setTimeout(function() {
		var image = '<img class="pikachu bounceInUp" src="img/pika2.gif"/>';
		$(image).appendTo(pikaSpaces[Math.floor(Math.random()*7)]);
		setTimeout(function() {
			pikaSpaces.empty();
			randomPikachu();
		}, 750 + Math.random() * 1000);
	}, 200);
}

function randomMew() {
	setTimeout(function() {
		var image = '<img class="mewgif" src="img/mew.gif"/>';
		$(image).appendTo(mewSpace);
		setTimeout(function() {
			mewSpace.empty();
			randomMew();
		}, 750 + Math.random() * 1000);
	}, 2000)
}

function randomCharizard() {
	setTimeout(function() {
		var image = '<img class="charizard" src="img/char2.gif"/>';
		$(image).appendTo(charSpaces[Math.floor(Math.random()*4)]);
		setTimeout(function() {
			charSpaces.empty();
			randomCharizard();
		}, 1000 + Math.random() * 2000);
	}, 500)
}

//adds click event to start button, which calls moles function
$('.start').click(function(){
	$('#battle').get(0).play();
	$('#intro').hide();
	setTimeout(function() {
		randomPikachu();
		randomMew();
		animateMew();
		if ($('#form').val() === "hard") {
			randomCharizard();
		}
		var counter = setInterval(timer, 1000);
		function timer() {
			count--;
			if (count < 0) {
				$('#battle').get(0).pause();
				clearInterval(counter);
				$('#gameBoard').hide();
				$('h3').addClass("flash");
				$('#start').hide();
				$('h5').hide();
				$('header').append('<button type="button" class="myButton" id="reset">Play Again!</button>');
				checkWin(score);
				return;
			}
			$('#time').text(count);
		}
	}, 2000);
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
	}, 200);
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
	$('h3').text("Charizard used flamethrower. Game Over.");
})
//score increases by 2 if mew is clicked
$(document).on('click', '.mewgif', function(e) {
	$('.mewgif').attr("src","img/pokeball.png");
	score += 2;
	$('#score').text(score);
	checkScore(score);
	setTimeout(function() {
		mewSpace.empty();
	}, 200);
});

//compares current score to high score(local storage)
function checkScore(score) {
	if (score > localStorage.high) {
		localStorage.high = score;
	}
}
$('#high').text(localStorage.high);

//win conditions based on score
function checkWin(score) {
	if (score > 0 && score < 10) {
		$('body').addClass("tryAgain");
		$('h3').text("Only " + score + " Pokémon??! You could do better...");
		$('#battleWon').get(0).play();
	} else if (score > 9) {
		$('body').addClass("winner");
		$('h3').text("You caught " + score + " Pokémon!! You're a PokéMaster!");
		$('#battleWon').get(0).play();
	} else if (score === 0) {
		$('body').addClass("gameOver");
		$('#battleLost').get(0).play();

	}
}

//MEW FLYING ANIMATION
function makeNewPosition(){
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
}

function animateMew(){
    var newX = makeNewPosition();
    var oldX = $('.mew').offset();
    var speed = calcSpeed([oldX.top, oldX.left], newX);
    
    $('.mew').animate({ top: newX[0], left: newX[1] }, speed, function(){
      animateMew();        
    });
};

function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    var greatest = x > y ? x : y;
    if ($('#form').val() === "hard") {
    	var speedModifier = 0.3;
    } else {
    	var speedModifier = 0.1;
    }
    var speed = Math.ceil(greatest/speedModifier);
    return speed;
}