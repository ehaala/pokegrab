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
				clearInterval(counter);
				$('#battle').get(0).pause();
				$('h3').addClass("flash");
				$('#gameBoard').hide();
				$('h5').hide();
				$('header').append('<button type="button" class="myButton" id="reset">PLAY AGAIN !</button>');
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
	score++;
	$('.pikachu').attr("src","img/pokeball.png");
	$('#score').text(score);
	checkScore(score);
	setTimeout(function() {
		pikaSpaces.empty();
	}, 200);
});

//score increases by 2 if mew is clicked
$(document).on('click', '.mewgif', function(e) {
	score += 2;
	$('.mewgif').attr("src","img/pokeball.png");
	$('#score').text(score);
	checkScore(score);
	setTimeout(function() {
		mewSpace.empty();
	}, 200);
});

//game over if charizard is clicked
$(document).on('click', '.charizard', function(e) {
	count = 0;
	score = 0;
	$('h3').addClass("flash");
	$('h3').text("Charizard attacked. Game Over.");
	$('h4').hide();
	$('h5').hide();
	$('#gameBoard').hide();
	checkWin(score);
})

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

//makes random new position within document
function makeNewPosition(){
    var h = $(document).height();
    var w = $(document).width();
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];    
}

function animateMew(){
    var newq = makeNewPosition();
    //offset returns object containing properties top & left
    var oldq = $('.mew').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $('.mew').animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateMew();        
    });
};

function calcSpeed(prev, next) {
	//finds difference in x coor
    var x = Math.abs(prev[1] - next[1]);
    //difference in y coor
    var y = Math.abs(prev[0] - next[0]);
    //if x > y, greatest = x; else, greatest = y
    var greatest = x > y ? x : y;
    if ($('#form').val() === "hard") {
    	var speedModifier = 0.4;
    } else {
    	var speedModifier = 0.1;
    }
    var speed = Math.ceil(greatest/speedModifier);
    return speed;
}