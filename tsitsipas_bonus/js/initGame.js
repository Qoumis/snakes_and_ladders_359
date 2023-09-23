var cells;
var name1, name2;
var flag = false;

/**This function is used to initialize an new game*/
function newGame(){
	initBoard();
	document.getElementById('status').innerHTML = "Enter your names to start the game.";
	document.getElementById('btn').disabled = true;			//disable roll button till user hits 'start game'
	document.getElementById('btn').style.opacity = '30%';

	cells = setPositions();
}

/**When players enter their names and hit the 'Start Game' button,
 * this function is called to make the rest of the initializations.
 */
function startGame(){

	name1 = document.getElementById('p1').value;
	name2 = document.getElementById('p2').value;

	if(name1.length < 1 || name2.length < 1){ //dont proceed until both players have entered a name
		document.getElementById('error').innerHTML =  'Enter your names!';
		return ;
	}
	else if(name1 === name2){
		document.getElementById('error').innerHTML =  'You cant have the same name!';
		return ;
	}

	document.getElementById('btn').disabled = false;			//enable roll button
	document.getElementById('btn').style.opacity = '100%';

	player_r  = new Player('Red', name1);
	player_wh = new Player('White', name2);
	setOpponents();
	setStartingPlayer();
	updateInfoBox('Game Started!','Roll the dice to play!');

}

/*Gui*/
function initBoard(){
	var table = document.getElementById('mainTable');
	var tr = document.createElement('tr');

	for (var i = 8; i >=1; i--) {
	  var tr = document.createElement('tr');
	  for (var j = 9; j >=0; j--) {
	  var td1 = document.createElement('td');
	  var num=i*10-j;
	  td1.innerHTML="<div id='position"+num+"'><img src='../images/"+num+".png'  height=70 width=70></div>";
	  
	  tr.appendChild(td1);
	  
	  }
	  table.appendChild(tr);
	}
}

/**This function is used to update the contents of info box
 *
 * @param topMSG  The message that will be displayed on top
 * @param botMSG  The message that will be displayed on bottom
 */
function updateInfoBox(topMSG, botMSG){

	document.getElementById('turn').innerHTML="Player turn: ";
	if(getPlayerTurn().color === "Red")
		document.getElementById('turn').innerHTML+="<span style='color: red; font-weight: bold'>" + getPlayerTurn().name + "</span>";
	else
		document.getElementById('turn').innerHTML+="<span style='color: white; font-weight: bold'>" + getPlayerTurn().name + "</span>";


	document.getElementById('pyeffect').innerHTML="Python effect: ";
	if(getPlayerTurn().pyeffect)
		document.getElementById('pyeffect').innerHTML+="<span style='color: green; font-weight: bold'>True</span>";
	else
		document.getElementById('pyeffect').innerHTML+="<span style='color: orange; font-weight: bold'>False</span>";

	document.getElementById('status').innerHTML=topMSG;
	document.getElementById('message').innerHTML=botMSG;
}

/**Each player has 50% chance to play first*/
function setStartingPlayer(){

    if(Math.floor(Math.random() * 2))
		player_wh.turn = true;
	else
		player_r.turn = true;

}


