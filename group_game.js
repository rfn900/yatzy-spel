
window.addEventListener("DOMContentLoaded", ()=>{
    let numberOfPlayers = parseInt(prompt("How many players? Min: 1 Max: 4"))
    
    this.checkbox = Array.from(document.getElementsByClassName("check-input")).map(element=>element.style.display = "none")

    startGameButton = document.getElementById("startGameButton");




    // We create a  first Dices class here which has 3 attribues
    // One attribute of an array in which we will push 5 Dice Objects (with a random value)
    // One attribute in which we will keep track of how many of each dice we've had.
    // One attribute for the checkboxes below the dices 

    class Dices {
        constructor(size = 5){
            this.dice = [];
            this.dice_values = [0, 0, 0, 0, 0, 0, 0];
            this.checkbox = Array.from(document.getElementsByClassName("check-input")).map(element=>element.checked)

            // Here we're pushing a new dice into the "this" dice array 
            // which will also show the right image depending on what number you get

            for (let i = 0; i < size; i++) {
                this.dice.push(new Dice(i, this.checkbox[i]));
                this.showDiceImages(i);
            }
            this.calculateDiceValues();
        }
        // In this method we're mapping the this.dice array and incrementing the value of each dice
        // For example, if we've had 2x Ones and 3x Fives in a dice throw this map function will give the
        // this.dice_values array the following values [0, 2, 0, 0, 0, 3, 0]
        calculateDiceValues(){
            this.dice.map(current_value => {
                this.dice_values[current_value.value]++;
            })
        }
        
        // Method that sets new dice image depending on value of the dice 
        // If a checkbox is checked it doesn't change the image for the next roll.
        showDiceImages(i){
            if(!this.checkbox[i]){
                let updatefield = `<img src='./images/Alea_${this.dice[i].value}.png'><input id="save-input-${(i+1)}" class="check-input" type="checkbox">`
                document.getElementById("dice-show-"+(i+1)).innerHTML=updatefield
            }
            
        }


        // Method that calculates the points for the upper table (Ones to Sixes).
        // Does it by checking each element in the dice_values array and multiplies them by the index
        // i.e If there are 5x threes it will multiply the element (5) by the index number (3) and return 15.
        upperTablePoints(){
            let pointsArray = [0, 0, 0, 0, 0, 0, 0];
            //[0, 2, 1, 0, 0, 2, 0] -> 2*1 + 1*2 + 2*5 = 14
            // pointsArray = [0, 2, 2, 0, 0, 10, 0]
            this.dice_values.forEach((element,index)=>{
                pointsArray[index] = element * index;
            })
            return pointsArray;
        }

        // Method that calculates the upper table results and shows them to the right of the yatzy form
        printUpperTableResults(){
            let pointsArray = this.upperTablePoints();
            // We need to get rid of index = 0. The shift() method does just that!
            pointsArray.shift();
            let tdShowPoints = Array.from(document.getElementsByClassName("pointsDisplay"))
            let player1Points = []
            for(let i = 0; i<6; i++){
                player1Points[i] = document.getElementById("player1-"+(i+1));
                if(!player1Points[i].innerHTML){
                    tdShowPoints[i].innerHTML = "+" + pointsArray[i]                
                } else tdShowPoints[i].innerHTML = ""
            }
            tdShowPoints.filter(e=>e.innerHTML!="").forEach(element =>{ //Behövs för att få tillbaka poängen nästa runda
                element.style.display="block";
            });
   
        }

        confirmPoints(){
            let tdShowPoints = Array.from(document.getElementsByClassName("pointsDisplay"));
            let player1Points = [];
            for (let i = 0; i < 6; i++){
                player1Points[i] = document.getElementById("player1-"+(i+1));
                tdShowPoints[i].addEventListener("click", e=>{
                    //id = player1-1 
                    player1Points[i].innerHTML = Number(tdShowPoints[i].innerHTML); //Behövs för att fåbort poängen på sidan
                    tdShowPoints.forEach(element =>{
                        element.style.display="none";
                    });
                    this.upperTableTotalSum();
                    this.checkForBonus();
                })
            }
            return player1Points;
        
        }

        upperTableTotalSum(){
            let player1Points = this.confirmPoints().map(e=>Number(e.innerHTML));//Vi skapar en ny aray med endast nummrerna ifrån player1Points
            let player1Sum = document.getElementById("sum-1");            
            //console.log(player1Points)

            return player1Points.reduce((previous_value, current_die) => {
                return player1Sum.innerHTML = previous_value + current_die;
            }, 0);    
    }
        checkForBonus(){
            let player1Sum = document.getElementById("sum-1").innerHTML;
            let player1Bonus = document.getElementById("bonus-1");

            if (Number(player1Sum)>=63){
                player1Bonus.innerHTML = 50
            }
        }

}
    // Creating a new object with one property,
    // the property is a random value between 1-6.
    class Dice {
        constructor(i=0, isCheckBoxChecked = false) {
            if(!isCheckBoxChecked){
                this.value = this.new_value();
            }else{
                let imgstr = document.getElementById("dice-show-"+(i+1)).firstChild.src
                this.value = Number(imgstr.split("_")[1].slice(0,1))
            }
            
        }
        new_value() {
            return Math.floor(Math.random() * 6) + 1;
        }
    }
    
    class Game {
        constructor(){
            this.tdShowPoints = Array.from(document.getElementsByClassName("pointsDisplay"))
            this.dice_rolls = Number(document.getElementById("antalSpel").innerHTML)
            this.game_rounds = Number(document.getElementById("antalRounds").innerHTML)
            this.checkbox = document.getElementsByClassName("check-input")

            this.current_points = []
            for (let i=0; i < 15; i++){

                this.current_points[i] = Number(this.tdShowPoints[i].innerHTML)
            }
            //this.current_points =
        }

        turnControl(){
            let dice_rolls = this.dice_rolls
            console.log(dice_rolls)

            // if(dice_rolls == 1){
            //     console.log(dice_rolls)
            //     Array.from(this.checkbox).map(element => element.checked = false)
            //     Array.from(this.checkbox).map(element => element.style.display = "none")
            // } else if (dice_rolls != 1){
                
            //     Array.from(this.checkbox).map(element => element.style.display = "block")
            // }
            dice_rolls--
             
            document.getElementById("antalSpel").innerHTML = dice_rolls
            
            let startButton = document.getElementById("startGameButton")
            if (dice_rolls === 0){
                startButton.style.display = "none"
            }
            this.tdShowPoints.map(e=>{
                e.addEventListener("click",()=>{
                    Array.from(this.checkbox).map(element => element.checked = false)
                    Array.from(this.checkbox).map(element => element.style.display = "none")
                    let game_rounds = this.game_rounds // Update number of rounds
                    game_rounds++ // Update number of rounds 
                    document.getElementById("antalRounds").innerHTML = game_rounds // Update number of rounds

                    startButton.style.display = "initial"
                    document.getElementById("antalSpel").innerHTML = 3 // Reset number of Dice Throws
                })
            })
        }

        // tellUserToChoosePoints(){   
        //   let divWithButton = document.getElementById("calculateButton")
        //   let message = document.createElement("H3")
        //   message.innerHTML = "Choose Your Points on the Side of the Table"
        //   divWithButton.appendChild(message) 
        // }

        writePointsOnSide(){
            //do your thing
        }
    }



    startGameButton.addEventListener("click", () => { 

        let newThrow = new Dices();
        newThrow.printUpperTableResults();

        newThrow.confirmPoints();

        let game = new Game();

        game.turnControl()

       
    })
})
