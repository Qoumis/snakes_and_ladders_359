var msg1, msg2;

/*code*/
function setPositions() {
	var positions=[];
	var snakePositions   =[13,20,28,44,58,59,65,72,78];
	var snakeNewPositions=[11,10,7,34,48,39,25,52,69];

	var ladderPositions   =[5,16,21,37,42,54,60,67,73];
	var ladderNewPositions=[33,36,61,56,53,64,80,77,76];


	for (var i = 1; i <=80 ; i++) {
	 positions[i]=new Object();
	 positions[i].from=i;


	 if(snakePositions.indexOf(i)!=-1){
	   positions[i].to=snakeNewPositions[snakePositions.indexOf(i)];
	   positions[i].type="Snake";
	 }
	 else if(ladderPositions.indexOf(i)!=-1){
	   positions[i].to=ladderNewPositions[ladderPositions.indexOf(i)];
	   positions[i].type="Ladders";
	 }
	 else{
	   positions[i].to=i;
		if(i===29 || i===46)
			positions[i].type="pythonEffect";
		else
			positions[i].type="Normal";

	 }
	}
	 return positions;
	}

/**When player hits roll dice*/
function play(){
	movePlayer();  //updateGUI() is called here

	update_dice_img();

	if(getPlayerTurn().hasWon)
		endGame();
	else
		changePlayerTurn();

	updateInfoBox(msg1, msg2);
}

/**This function is used to print the last messages on infobox and finish the game*/
function endGame(){
	msg1 = 'Congratulations! '
	msg1 += getPlayerTurn().name + ' won the game!!!';

	if(getPlayerTurn().name == "tsitsipas")
		msg1 += '<br> He played with quality.';

	msg2 = 'Game finished.';

	var button = document.getElementById('btn'); //disable roll button
	button.disabled = true;
	button.style.opacity = '30%';
}

/**GUI
 * This function is used to change/update the images on board when a player moves*/
function UpdateGUI(oldPosition, newPosition){

	let p1 = getPlayerTurn().position;
	let p2 = getPlayerTurn().opponent.position;

	if(oldPosition !== 0){		//change old pic
		if(p2 == oldPosition){		//if they shared the same block the previous turn
			if(getPlayerTurn().color === 'Red')
				document.getElementById("position"+oldPosition).innerHTML="<img  src='../imagesWhite/"+oldPosition+".png' height=70 width=70></div>";
			else
				document.getElementById("position"+oldPosition).innerHTML="<img  src='../imagesRed/"+oldPosition+".png' height=70 width=70></div>";
		}
		else
			document.getElementById("position"+oldPosition).innerHTML="<img  src='../images/"+oldPosition+".png' height=70 width=70></div>";
	}

	if(p1 == p2)   //both on same block case
		document.getElementById("position"+newPosition).innerHTML="<img  src='../imagesBoth/"+newPosition+".png' height=70 width=70></div>";

	else if(getPlayerTurn().color === 'Red') //changes red pic
		document.getElementById("position"+newPosition).innerHTML="<img  src='../imagesRed/"+newPosition+".png' height=70 width=70></div>";

	else //changes white pick
		document.getElementById("position"+newPosition).innerHTML="<img  src='../imagesWhite/"+newPosition+".png' height=70 width=70></div>";

}

