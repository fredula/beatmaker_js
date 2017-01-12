'use strict'

var app = function(){
	const rows = document.querySelectorAll('.beatmaker__row');
	const buttons = document.querySelectorAll('.beatmaker__beat');
	const indicator = document.querySelector('.beatmaker__indicator');
	const playBut = document.querySelector('.beatmaker__play');
	const stopBut = document.querySelector('.beatmaker__stop');
	const bpmSelector = document.querySelector('.beatmaker__bpm');
	const preSelector = document.querySelector('.beatmaker_pre');
	const predefinedBeats = [
								{
									1:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
									2:[0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0],
									3:[0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
									4:[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0],
									5:[0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
									6:[0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
									7:[0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,1,1],
									8:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
									9:[0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0],
								},
								{
									1:[0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0],
									2:[0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0],
									3:[0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
									4:[0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0],
									5:[0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
									6:[0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0],
									7:[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0],
									8:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
									9:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
								}
							]
	let leftPos = 200;
	let counter = 0;
	let timer;
	let fps = 4;
	let now;
	let then = Date.now();
	let interval;
	let delta;
	let isPlaying = false;
	let req;

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
	    req = requestAnimationFrame(playBeat);
	    
	    if(this){
	    	if(!isPlaying) {
	    		this.style.display = "none";
	    		stopBut.style.display = "block";
	    		bpmSelector.setAttribute('disabled', true);
	    		preSelector.setAttribute('disabled', true);
	    		isPlaying = true;
	    	}
	    }

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

	function handlePreChange(e) {
		var el = e.target;
		var currentPRE = el.options[el.selectedIndex].dataset.pre;
		if (currentPRE === Number(1)) setBPM('120');
		var rows = document.querySelectorAll('.beatmaker__row');
		var counter = 1;
		rows.forEach(function(el) {
			var child = el.children;
			[].forEach.call(child, function(childEl, index) {
				if(predefinedBeats[Number(currentPRE)][counter][index] === 1) child[index].classList.add('active');
			})
			counter++
		})
	}

	function stopBeat() {
		window.cancelAnimationFrame(req);
		if(isPlaying) {
    		this.style.display = "none";
    		playBut.style.display = "block";
    		isPlaying = false;
    		bpmSelector.removeAttribute('disabled');
	    	preSelector.removeAttribute('disabled');
    	}
	}
	// setTimeout(function() {
	// 	window.cancelAnimationFrame(req);
	// },5000);
	
	buttons.forEach(button => button.addEventListener('click', clickHandler));
	playBut.addEventListener('click', playBeat);
	stopBut.addEventListener('click', stopBeat);
	bpmSelector.addEventListener('change', handleBPMChange);
	preSelector.addEventListener('change', handlePreChange);
};

document.addEventListener('DOMContentLoaded', function() {
	app();
})