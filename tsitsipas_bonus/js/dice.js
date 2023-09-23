
var last_roll = 6;

/**This function returns a number in range 1-6*
 *and is used when a player rolls the dice
 */
function rollDice(){
    last_roll = (Math.floor(Math.random() * 6) + 1);
   return last_roll;
}

function update_dice_img(){
    document.getElementById("dice").src="../ImagesDice/"+ last_roll +".png";
}
