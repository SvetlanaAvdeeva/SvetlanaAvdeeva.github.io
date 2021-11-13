window.addEventListener('load', function(){
	
	let scoreUser=document.querySelector('.score-user'),
		scoreComp=document.querySelector('.score-comp'),
		userField=document.querySelector('.user-field'),
		compField=document.querySelector('.comp-field'),
		sound=document.querySelector('.sound'),
		play=document.querySelector('.play'),
		fields=document.querySelectorAll('.field'),
		res=document.querySelector('.result'),
		userStep, compStep, countU=0, countC=0, blocked=false;
		
		function choiceUser(e){
			if(blocked) return;
			let target=e.target;
			if(target.classList.contains('field')){
				userStep=target.dataset.field;
				fields.forEach(item=>item.classList.remove('active', 'error'));
				target.classList.add('active');
				choiceComp();
			}
		}
		
		function choiceComp(){
			blocked=true;
			let rand=Math.floor(Math.random()*3);
			compField.classList.add('blink');
			let compFields=compField.querySelectorAll('.field');
			
		setTimeout(() => {
			compField.classList.remove('blink');
			compStep=compFields[rand].dataset.field;
			compFields[rand].classList.add('active');
			winner();
		},3000);
	}
		
		
		function winner(){
			blocked=false;
			let comb=userStep+compStep;
			console.log(comb);
		
			if(comb=='rr' || comb=='ss' || comb=='pp'){
				res.innerText='Draw!';
				sound.setAttribute('src', 'audio/draw.mp3');
				sound.play();
			}
			else if(comb=='rs' || comb=='sp' || comb=='pr'){
				res.innerText='You Win!';
				sound.setAttribute('src', 'audio/win.mp3');
				sound.play();
				countU++;
				scoreUser.innerText=countU;
				compField.querySelector('[data-field='+compStep+']').classList.add('error');
			}
			else  if(comb=='sr' || comb=='ps' || comb=='rp'){ 
				res.innerText='You Lose!';
				sound.setAttribute('src', 'audio/loss.mp3');
				sound.play();
				countC++;
				scoreComp.innerText=countC;
				userField.querySelector('[data-field='+userStep+']').classList.add('error');
			}
		}
		
		function playGame(){
			countU=countC=0;
			res.innerText='You choose';
			scoreUser.innerText='0';
			scoreComp.innerText='0';
			fields.forEach(item => item.classList.remove('active', 'error'));
		}
		
		play.addEventListener('click', playGame);
		userField.addEventListener('click', choiceUser);
});