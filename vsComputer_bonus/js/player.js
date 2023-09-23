var player_r, player_wh;

/**this function is used to create a new player object*/
function Player(color,name){
    this.name = name;
	this.color = color;
	this.pyeffect = false;
	this.turn = false;
	this.hasWon = false;
	this.position = 0;
	this.roll = 0;
}

/**This function returns which player is currently playing
 * (returns an instance of a player object)
 * */
function getPlayerTurn(){

    if(player_r.turn)
        return player_r;

    return player_wh;
}

/**This function is used to determine which player is playing next*/
function changePlayerTurn(){
    if(getPlayerTurn().roll !== 6){
        let tmp = getPlayerTurn();
        getPlayerTurn().opponent.turn = true;
        tmp.turn = false;
    }
    //If they roll 6  we don't change anything
}

function setOpponents(){
    player_wh.opponent = player_r;
    player_r.opponent = player_wh;
}

/**this function is used to move the player along on the board*/
function movePlayer(){

    getPlayerTurn().roll = rollDice();
    let old_pos = getPlayerTurn().position;     //tmp for old position
    let new_pos =  getPlayerTurn().position + getPlayerTurn().roll; //calculate new position

    msg1 = '';
    msg2 = '';

    if(getPlayerTurn().roll == 6)
        msg1 = 'You lucky rolled 6, Roll Again!';
    else
        msg1 = 'Roll the Dice!';

    if(new_pos > 80){               // we need that b4 special cases because of snake cell NO78.
        var moveBack = new_pos - 80;
        new_pos = 80 - moveBack;
    }

    //check for special cases
    if(cells[new_pos].type == 'pythonEffect')   //Python cell scenario
        getPlayerTurn().pyeffect = true;

    else if(cells[new_pos].type == 'Snake'){    //Snake cell scenario
        msg2 = getPlayerTurn().name;
       if(!getPlayerTurn().pyeffect){
           msg2 += ' landed on snake cell No' + new_pos;
           new_pos = cells[new_pos].to;
           msg2 += ' and fell down to cell No' + new_pos;
       }
       else
           msg2 += ' landed on a snake cell, but since they have python effect, snakes wont touch them!';
    }

    else if(cells[new_pos].type == 'Ladders'){  //Ladder cell scenario
        msg2 = getPlayerTurn().name;
        msg2 += ' landed on ladder cell No' + new_pos;
        new_pos = cells[new_pos].to;
        msg2 += ' and went up to cell No' + new_pos;
    }

    if(new_pos == 80)
        getPlayerTurn().hasWon = true;

    getPlayerTurn().position = new_pos;         //update position
    UpdateGUI(old_pos, new_pos);
}
