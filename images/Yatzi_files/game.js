// Eventually will remove these global variable declarations from here
// I don't need any global variable and they only cause confusion. :) 

let tdShowPoints = document.getElementsByClassName("pointsDisplay")
let playButton = document.getElementById("startGameButton")
let antalSpel = document.getElementById("antalSpel")


//This event listener starts the whole thing. It triggers the 
// countThedices() function
playButton.addEventListener("click", countTheDices)

// This function manipulateCheckboxes() exists only to remove the checkBoxes
// from screen when the user first loads the page. If the user clicks the playButton
// then the checkboxes pop back on the screen
manipulateCheckboxes = () =>{
  let checkBox = []
  for (let i=0; i<5; i++){
    checkBox[i] = document.getElementById("save-input-"+(i+1))
    checkBox[i].style.display = "none"
  }
}

manipulateCheckboxes()

// This is the main function. This is what it does:
// 1) I first callback the rollTheDices() function to fire the random dice generator
// 2) I generate theat array with the number of counts for each dice result [0,0,0,3,0,2,0] -> this is a Kåk - 3 and 5
// 3) Then I write the results on screen on a <td></td> element on the right side of the table 
//    so the user can choose their points. This is where I calculate all the points of the game
// 4) This function returns the count array 

function countTheDices(){

  dices=rollTheDice()
  
  count = [0,0,0,0,0,0,0]
  dices.forEach(element => {
    count[element]++
  })

  writeResultOnScreen(count)
  
  return count
}

// This is the function that starts the process. Here is where I set the functionality of the checkboxes. 
// Where I remove, add and read the dice results from the dice pictures. 

function rollTheDice(){

  let antalSpel = document.getElementById("antalSpel")
  let antalSpelNumber = Number(antalSpel.innerText)
  let btnPlaceHolder = document.getElementById("calculateButton")

  // Here I choose to not show (display = "none") the <td> element which shows the points on the right 
  // in case that pointField is already populated with the user's point for the category.
  // Ex.: if the user already got a Kåk, then the option to get points from a Kåk are NOT going to show anymore!

  for (let i=0;i<15;i++){
    let pointField = document.getElementById("player1-"+(i+1))
    if (pointField.innerText == "") tdShowPoints[i].style.display="inline"
    else tdShowPoints[i].style.display="none"
  }

  // Start a checkbox array and store their checked property in the array (only true or false)
  checkboxArray=[]
  for (let j=0; j<5; j++){
    checkboxArray[j]=document.getElementById("save-input-"+(j+1)).checked
  }

  let nofsides = 6
  let dice = []

  // Here I choose when to run the random dices and when to simply keep them depending on the checked property
  // of the checkboxes!!!
  if (antalSpelNumber>0){
    for (let i=0; i<5; i++){
      if(!checkboxArray[i]){          // Will only run dices for the unchecked checkboxes (checkboxArray[i]===false)
        dice[i]=Math.floor(Math.random() * nofsides) +1
        let updatefield = `<img src='./images/Alea_${dice[i]}.png'><input id="save-input-${(i+1)}" type="checkbox">`
        document.getElementById("dice-show-"+(i+1)).innerHTML=updatefield
      }else {
        // If the checkboxes are checked then I will simply read the result of the dice[i] from the image above that checkbox
        let imgstr = document.getElementById("dice-show-"+(i+1)).firstChild.src
        dice[i] = Number(imgstr.split("_")[1].slice(0,1)) // It doesn't work to just slice the string. We don't always know the full address       
      }
    }
    antalSpel.innerHTML = antalSpelNumber-1  // Here I update the number of plays a user has 
  }
if (antalSpelNumber == 1){
    for(let i=0; i<5; i++){
   //   playbox__title.innerHTML = "Pick Your Points"
      let imgstr = document.getElementById("dice-show-"+(i+1)).firstChild.src
      dice[i] = Number(imgstr.split("_")[1].slice(0,1))
    }
    
    btnPlaceHolder.style.display= "none" // I remove the button after the 3 plays are done.
    //btnPlaceHolder.firstChild.setAttribute("disabled", "")
}
 // console.log(dice)
  return dice
}


function writeResultOnScreen(count){
  let sum = [0,0,0,0,0,0]
// console.log(Number(tmp1))
  //let tmp2 = 0
  roundSpan = document.getElementById("antalRounds")
  roundSpanNumber = Number(roundSpan.innerText)
  antalSpel = document.getElementById("antalSpel")
  antalSpelNumber = Number(antalSpel.innerText)

  
  console.log(count)

  let isYatzy = count.includes(5)
  let isFourCounts = count.includes(4) 
  let isThreeCounts = count.includes(3) 
  let isTwoCounts = count.includes(2) 

  let straightTest = [1,1]
  
  let isFH = isThreeCounts && isTwoCounts
  let fhPoints = [0,0]
 
  count.forEach((element,index)=>{
    
    if (index!=0){
   
      
      if(element == 2){
        fhPoints[0]=index
      }
      
      
      if(element >= 3){
        fhPoints[1]=index
        tdShowPoints[8].innerHTML = "+"+index*3
      }
      let atLeastThree = isThreeCounts||isFourCounts||isYatzy
      if (!atLeastThree){
        tdShowPoints[8].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
        
      }

      if((element >= 4) && isFourCounts){
        tdShowPoints[9].innerHTML = "+"+index*4
      }
      let atLeastFour = isFourCounts||isYatzy
      if (!atLeastFour)tdShowPoints[9].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
      
      
      if ((element == 5) && isYatzy){
        tdShowPoints[14].innerHTML = "+"+50
      }else if (!isYatzy) tdShowPoints[14].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"     

    }

  })

  /*
  /* 
  /* END OF THE FOREACH LOOP
  /* 
  */

for (let index=0;index<15; index++){
  let antalRounds = Number(document.getElementById("antalRounds").innerHTML)
  tdFieldToWrite = document.getElementById(`player1-${index+1}`).innerHTML      
  let element = count[index+1]
  if (index<6){
        if (tdFieldToWrite=="" && element!=0){
      tdShowPoints[index].innerHTML = `+${element * (index+1)}`
    }else if (tdFieldToWrite=="" && element == 0){
      tdShowPoints[index].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
    }
  }

  tdShowPoints[index].addEventListener("click", () => {
    let btnPlaceHolder = document.getElementById("calculateButton")
    btnPlaceHolder.style.display = "block"
    !isNaN(Number(tdShowPoints[index].innerHTML))? 
    pointTableNumber = Number(tdShowPoints[index].innerHTML):
    pointTableNumber = 0

    document.getElementById("player1-"+(index+1)).innerHTML= pointTableNumber
    document.getElementById("player1-"+(index+1)).classList.add("info-row-point")
    roundSpan.innerText = roundSpanNumber + 1
    antalSpel.innerText = "3"


    if (roundSpanNumber==15){
      btnPlaceHolder.style.display="none"
    } 
    for (let i = 0; i<15; i++){
      tdShowPoints[i].style.display="none"
      
      

      if (i<5) document.getElementById("save-input-"+(i+1)).checked = false
   }
    tdShowPoints[index].style.display = "none"
    

    //tdShowPoints[index].remove()
    if(antalRounds==15){
      calculateTotal()
    }
    
    manipulateCheckboxes()


  }) 

}

  if (isFH) tdShowPoints[12].innerHTML = "+"+Number(fhPoints[0]*2+fhPoints[1]*3)
  else tdShowPoints[12].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
  

  parCase=[0,0]
  let j=0
  let sumCount = 0
  for (let i = 0; i<7; i++){
   
    if (count[i] >= 2){
      parCase[j] = 2*i 
      j++ 
    }
   sumCount += i*count[i]
   if (i>0 && i < 6)straightTest[0]*=count[i]
   if (i > 1)straightTest[1]*=count[i]
   
  }
  straightTest[0] == 1? 
  tdShowPoints[10].innerHTML = "+"+15 :
  tdShowPoints[10].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"

  straightTest[1] == 1? 
  tdShowPoints[11].innerHTML = "+"+20 :
  tdShowPoints[11].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
  

  tdShowPoints[13].innerHTML = "+"+sumCount
  

  parCase[0]>parCase[1] ? 
  tdShowPoints[6].innerHTML = "+"+parCase[0] : 
  tdShowPoints[6].innerHTML = "+"+parCase[1]

  if ((parCase[0]+parCase[1])==0){
    tdShowPoints[6].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
  }

  if (parCase[0]*parCase[1] != 0){
    tdShowPoints[7].innerHTML = "+"+(parCase[1]+parCase[0])
  }else tdShowPoints[7].innerHTML = "<img src='/images/x.png' width= 15px height= 15px/>"
/*

  for(i=0; i<6; i++){
    let read = document.getElementById(`player1-${i + 1}`).innerText
   // console.log(read)
    if (!isNaN(Number(read))){
      sum[i] = Number(read)
    }   
  }

  count.forEach((element, index) => {
    
    if(index>0){
//      tmp1 = document.getElementById("summa").value
        let i = index - 1
        sum[i] += element 
//      console.log(tmp2)
        document.getElementById("player1-"+(index)).innerHTML=sum[i]
    }
  })

    let totalSumma = 0
    let bonus = 50
    for(let i=0; i<6; i++){
      totalSumma += sum[i]*(i+1)
    }
    if (totalSumma >= 63){
      totalSumma += bonus
      document.getElementById("bonus").innerHTML=bonus;
    }else document.getElementById("bonus").innerHTML=0;
  
    document.getElementById("summa").innerHTML=totalSumma
    */
   // console.log("soma total é: " + totalSumma)

}

function calculateTotal (){
  let sum = 0
  let underSum = 0    
  let bonus = 50
  let upperRowValue=0
  let underRowValue=0
  for (let i=0; i<14; i++){
    if (i<6) {
      upperRowValue = Number(document.getElementById(`player1-${i+1}`).innerHTML)
      sum += upperRowValue
    } else{
      underRowValue = Number(document.getElementById(`player1-${i+1}`).innerHTML)
      underSum += underRowValue
    } 
   
    
  }
  if (sum>=63) {
    sum += bonus
    document.getElementById("bonus").innerHTML=bonus    
  }else document.getElementById("bonus").innerHTML="0"
  
  document.getElementById("summa").innerHTML=sum
  document.getElementById("totalSumma").innerHTML=sum + underSum
  

}
