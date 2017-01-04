'use strict'

var app = function(){
	const rows = document.querySelectorAll('.beatmaker__row');
	const buttons = document.querySelectorAll('.beatmaker__beat');
	const indicator = document.querySelector('.beatmaker__indicator');
	const playBut = document.querySelector('.beatmaker__play');
	const bpmSelector = document.querySelector('.beatmaker__bpm');
	let leftPos = 200;
	let counter = 0;
	let timer;
	let fps = 4;
	let now;
	let then = Date.now();
	let interval;
	let delta;

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

	function playBeat() {
	    requestAnimationFrame(playBeat);
	    
	    interval = 1000/fps;
	    now = Date.now();
	    delta = now - then;
  
	    if (delta > interval) {
	         
	        then = now - (delta % interval);

	        if(counter <= 16) {
				var currIndicator = counter == 0 ? document.querySelector('.indicator_1') : document.querySelector('.indicator_' + counter);
				currIndicator.style.opacity = 0.1;
				currIndicator.out = setTimeout(function(){ currIndicator.style.opacity = 0; }, interval);
				rows.forEach(row => {
					if(row.children[counter].classList.contains('active')) {
						playSound(row.children[counter].getAttribute('data-key'));
					}
			 	})
			 	//this takes care of the delay after the last beat is played
			 	counter == 16 ? counter = 1 : counter++;
			}else{
				counter = 1;
			}
	    }
	}

	function setBPM(currentBPM) {
		switch(currentBPM) {
			case '60': 
				fps = 4;
			break;
			case '120':
				fps = 8;
			break;
			case '140':
				fps = 10;
			break;
		}
	}

	function handleBPMChange(e) {
		var el = e.target;
		var currentBPM = el.options[el.selectedIndex].dataset.bpm;
		setBPM(currentBPM);
	}
	
	buttons.forEach(button => button.addEventListener('click', clickHandler));
	playBut.addEventListener('click', playBeat);
	bpmSelector.addEventListener('change', handleBPMChange);
};

document.addEventListener('DOMContentLoaded', function() {
	app();
})