'use strict'

var app = function(){
	const rows = document.querySelectorAll('.beatmaker__row');
	const buttons = document.querySelectorAll('.beatmaker__beat');
	const indicator = document.querySelector('.beatmaker__indicator');
	const playBut = document.querySelector('.beatmaker__play');
	let leftPos = 200;
	let counter = 0;
	let timer;

	function clickHandler(e) {
		if(e.target.tagName.toLowerCase() === 'button') {
			e.target.classList.toggle('active');
			e.target.firstChild.classList.toggle('active');
		}else if(e.target.tagName.toLowerCase() === 'i') {
			e.target.parentNode.classList.toggle('active');
			e.target.classList.toggle('active');
		}
	}

	function playSound(key) {
	  const audio = document.querySelector(`audio[data-key="${key}"]`);
	  if(!audio) return;
	  audio.currentTime = 0;
	  audio.play();
	}

	function doBeat() {
		clearTimeout(timer);
		counter++;
		if(counter < 17) {
			var currIndicator = document.querySelector('.indicator_' + counter);
			currIndicator.style.opacity = 0.1;
			currIndicator.out = setTimeout(function(){ currIndicator.style.opacity = 0; }, 250);
			rows.forEach(row => {
				if(row.children[counter].classList.contains('active')) {
					playSound(row.children[counter].getAttribute('data-key'));
					//console.log(row.children[counter].getAttribute('data-key'));
				}
		 		//console.log(row.children[counter].classList.contains('active'));
		 	})
			startBeats();
		}else{
			counter = 0;
			startBeats();
		}
	}

	function startBeats() {
		timer = setTimeout(function() {
			doBeat();
		}, 250) 
	}
	
	buttons.forEach(button => button.addEventListener('click', clickHandler));
	playBut.addEventListener('click', startBeats);
};

document.addEventListener('DOMContentLoaded', function() {
	app();
})