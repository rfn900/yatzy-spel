window.addEventListener("DOMContentLoaded", ()=>{
    
    startGameButton = document.getElementById("startGameButton");

    // We create a class here...

    class Dices {
        constructor(size = 5){
            this.dice = [];
            this.dice_values = [0, 0, 0, 0, 0, 0, 0];
            for (let i = 0; i < size; i++) {
                this.dice.push(new Dice());
            }
            this.calculateDiceValues();
        }

        calculateDiceValues(){
            this.dice.map(current_value => {
                this.dice_values[current_value.value]++;
            })
        }

        upperTablePoints(){
            let pointsArray = [0, 0, 0, 0, 0, 0, 0];
            //[0, 2, 1, 0, 0, 2, 0] -> 2*1 + 1*2 + 2*5 = 14
            // pointsArray = [0, 2, 2, 0, 0, 10, 0]
            this.dice_values.forEach((element,index)=>{
                pointsArray[index] = element * index;
            })
            return pointsArray;
        }

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
            tdShowPoints.forEach(element =>{ //Behövs för att få tillbaka poängen nästa runda
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
            let player1Sum = document.getElementById("summa");            
            console.log(player1Points)

            return player1Points.reduce((previous_value, current_die) => {
                return player1Sum.innerHTML = previous_value + current_die;
            }, 0);    
    }
        checkForBonus(){
            let player1Sum = document.getElementById("summa").innerHTML;
            let player1Bonus = document.getElementById("bonus");

            if (Number(player1Sum)>=63){
                player1Bonus.innerHTML = 50
            }
        }

}
    // Creating a new object with one property,
    // the property is a random value between 1-6.
    class Dice {
        constructor() {
            this.value = this.new_value();
        }
        new_value() {
            return Math.floor(Math.random() * 6) + 1;
        }
    }
    
    startGameButton.addEventListener("click", () => { 

        let newThrow = new Dices();

        newThrow.printUpperTableResults();

        newThrow.confirmPoints();
    })


})
