var p1 = document.querySelector(".p1");
var p2 = document.querySelector(".p2");
var box = document.querySelectorAll(".box");
var btn = document.querySelector("#btn");
var teddyDiv=document.querySelector(".teddy")
var teddyimg=document.querySelector("#teddyImage")
var imageText=document.querySelector("#imageText")
var audioClick=new Audio("click.wav");
var audioOver=new Audio("over.mp3");


var currentP = "X";
var nextP = "O";
var playerTurn = currentP;
p1.textContent=`Player1: ${currentP}`
p2.textContent=`Player2: ${nextP}`

//FUNCTION FOR STARTING THE GAME....
function startGame() {
    box.forEach(item => {
        item.addEventListener('click',handel);
    })


}


//FUNCTION FOR CHANGING THE TURN...

function handel(e) {
    if (e.target.textContent === '') {
        e.target.textContent = playerTurn;
        if (winner()) {
            
            message(`${playerTurn} is the winner....`)
            over();
        }
        else if (tie()) {
            
            message("it is a tie.....")
            over();
        }
        else {
            audioClick.play();
            ChangePlayer();
            message(`Turn of Player : ${playerTurn}`)
        

        }

    }
}


function ChangePlayer() {
    if (currentP == playerTurn) {
        playerTurn = nextP;
    }
    else {
        playerTurn = currentP;
    }
}







//FUNCTION FOR FINDING THE WINNER...

function winner() {
    const winningArray = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8],
         [0, 3, 6]
    ];
    for (let i = 0; i < winningArray.length; i++) {
        const [position1, position2, position3] = winningArray[i];

        if (box[position1].textContent !== '' &&
            box[position1].textContent == box[position2].textContent
            && box[position2].textContent == box[position3].textContent) {
           var img=  document.createElement("img");
           img.setAttribute("src","over.gif");
            teddyimg.replaceWith(img);

            audioOver.play();
            return true;
          
            

        }

    }

    return false;
   
    
}


//FUNCTION FOR CHECKING IF THERE IS A TIE OR NOT

function tie() {
    let cell =true;
    box.forEach(item => {
        if (item.textContent === '') {    //-->item.textContent=='' ---> abhi cells bache hai aur cells bache hai to tie nhi ho skta hai.....
            cell=false;
        }
    })
    if (cell ===true && !winner()) {
        // teddyImg.setAttibute("src","over.gif");
        audioOver.play();
        return true;
       
    }
}


// GAME OVER

function over(){
    box.forEach(cell=>{
        cell.removeEventListener('click',handel);
        cell.classList.add('disable')
        
    })
}


//RESTARTING GAME
btn.addEventListener("click",function(){
  box.forEach(cell=>{
    cell.textContent='';
    cell.classList.remove('disable');
    imageText.innerHTML='';
    // var img=document.createElement("img");
    // img.setAttribute("src","teddy.gif");
    // teddyimg.replaceWith(img);

   
  })
  startGame();
})

//SHOWING MESSAGE

function message(msg){
    imageText.innerHTML=msg;
}