var cells;


/**This function is used to initialize a new game*/
function newGame(){
	initBoard();
	player_r  = new Player('Red');
	player_wh = new Player('White');
	setOpponents();
	setStartingPlayer();
	updateInfoBox('Game Started!','Roll the dice to play!');
	cells = setPositions();
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
		document.getElementById('turn').innerHTML+="<span style='color: red; font-weight: bold'>Red</span>";
	else
		document.getElementById('turn').innerHTML+="<span style='color: white; font-weight: bold'>White</span>";


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



