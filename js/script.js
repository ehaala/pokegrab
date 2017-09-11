var holes = $('.hole');
var score = 0;
// holes.click(function(){
// 	holes.prepend('<img src="img/trump.png">');
// })

// setInterval(function() {
// 	holes.prepend('<img src="img/trump.png">');
// }, 2000);

function moles() {
	setTimeout(function() {
		holes.prepend('<img src="img/trump.png">');
		setTimeout(function() {
			holes.empty();
			moles();
		}, 1000);
	}, Math.random() * 4000);
}
moles();

