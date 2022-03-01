function ageInDays(){

    var birthyear = prompt("Rnter birthyear")

    var ageInDays = (2022 - birthyear) * 365;

    var h1 = document.createElement("hi");
    var textAnswer = document.createTextNode("You are " + ageInDays + " day");

    h1.setAttribute("id","ageInDays");
    h1.appendChild(textAnswer);

    document.getElementById('flex-box-result').appendChild(h1);

}

function reset(){
    document.getElementById('ageInDays').remove();
}

function generateCat(){
    var image = document.createElement("img");
    var div = document.getElementById("flex-cat-gen");

    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

function rpsGame(yourChoice){
    console.log(yourChoice);
    console.log(yourChoice.src);
    console.log(yourChoice.height);

    var humanChoice,botChoice;
    var status;

    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());

    console.log(botChoice);

    
    
     results = decideWinner(humanChoice,botChoice);

     console.log(results);

     message = finalMessage(results);

     console.log(message);

     rpsFrontEnd(yourChoice.id,botChoice,message);

}

function randToRpsInt(){
    return Math.floor(Math.random()*3)
}

function numberToChoice(number){
    return ["rock","paper","scissors"][number]
}

function decideWinner(humanChoice,botChoice){

    var rpsDatabase = {
        "rock":{"scissors": 1, "rock":0.5 ,"paper":0},
        "paper":{"scissors": 0, "rock":1 ,"paper":0.5},
        "scissors":{"scissors": 0.5, "rock":0 ,"paper":1}
    }

    console.log("human choice" , humanChoice)
    console.log("bot choice" , botChoice)

    var yourScore = rpsDatabase[humanChoice][botChoice];
    var botScore = rpsDatabase[botChoice][humanChoice];

    return[yourScore,botScore]

}

function finalMessage([yourScore,botScore]){

    if(yourScore === 0){
        return {"message":"You lost" , "color":"red"}
    }

    else if(yourScore === 1){
        return {"message":"You Won" , "color":"green"}
    }

    else{
        return {"message":"You tied" , "color":"yellow"}
    }

}

function rpsFrontEnd(humanImageChoice , botImageChoice,finalMessage){
    var imagesDatabase = {
        "rock":document.getElementById("rock").src, 
        "paper":document.getElementById("paper").src, 
        "scissors":document.getElementById("scissors").src 
    }

    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humanDiv = document.createElement("div");
    var botDiv = document.createElement("div");
    var messageDiv = document.createElement("div");

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);' >";
    messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size:60px; padding:30px; '> " + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);' >";

    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(messageDiv);
    document.getElementById("flex-box-rps-div").appendChild(botDiv);

}

var all_buttons = document.getElementsByTagName("button");

console.log(all_buttons)

var copyAllButtons = [];

for(let i = 0; i < all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function changeTheColorOfAllButtons(){
}

function buttonColorChange(buttonThingy){
    if(buttonThingy.value === 'red'){
        buttonRed();
    }

    else if(buttonThingy.value === 'green'){
        buttonGreen();
    }

    else if(buttonThingy.value === 'reset'){
        buttonReset();
    }

    else if(buttonThingy.value === 'random'){
        buttonRandom();
    }

}

function buttonRed(){
    for(let i = 0; i < all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    }

    for(let i = 0; i < all_buttons.length;i++){
        all_buttons[i].classList.add("btn-danger");
    }
}

function buttonGreen(){
    for(let i = 0; i < all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    }

    for(let i = 0; i < all_buttons.length;i++){
        all_buttons[i].classList.add("btn-success");
    }
}

function buttonReset(){
    for(let i = 0; i < all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonRandom(){

    var choices = ["btn-primary","btn-danger","btn-success","btn-warning"]

    for(let i = 0; i < all_buttons.length;i++){
        randomNumber = Math.floor(Math.random()*choices.length)
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

let blackjackGame = {
    "you":{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0} ,
    "dealer":{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    "cards":["2","3","4","5","6","7","8","9","10","K","J","Q","K"],
    "cardsMap": {"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"K":10,"J":10,"Q":10,"A":[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,

}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3");

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);


function blackjackHit(){

    if(blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer){

    if(activePlayer['score'] <=21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}


function blackjackDeal(){

    if(blackjackGame['turnsOver'] === true){

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector(YOU["div"]).querySelectorAll('img');
        let dealerImages = document.querySelector(DEALER['div']).querySelectorAll('img');
    
        console.log(yourImages);
        
        for(let i = 0; i < yourImages.length;++i){
            yourImages[i].remove();
        }
    
        for(let i = 0; i < dealerImages.length;++i){
            dealerImages[i].remove();
        }
    
        YOU['score'] = 0;
        DEALER['score'] = 0;
    
        document.querySelector(YOU['scoreSpan']).textContent = YOU['score'];
        document.querySelector(DEALER['scoreSpan']).textContent = DEALER['score'];
        document.querySelector(YOU['scoreSpan']).style.color = "white";
        document.querySelector(DEALER['scoreSpan']).style.color = "white";
    
        document.querySelector('#blackjack-result').textContent = "Lets Play";
        document.querySelector('#blackjack-result').style.color = "black";

        blackjackGame['turnsOver'] = true;

    }
}

function updateScore(card,activePlayer){

    if(card === 'A'){
        if(activePlayer['score'] + blackjackGame['cardsMap'][card] <= 21 ){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }

    else{
        activePlayer["score"] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST";
        document.querySelector(activePlayer['scoreSpan']).style.color = "red"
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer["score"];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){

    blackjackGame['isStand'] = true;
    
    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);

        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;
    showResult(computeWinner());
}

function computeWinner(){
    let winner;

    if(YOU['score'] <= 21){

        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21 ){
            winner = YOU;
            blackjackGame['wins']+=1;
        }

        else if(YOU['score'] < DEALER['score']) {
            blackjackGame['losses']+=1;
            winner = DEALER;
        }

        else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']+=1;
        }
    }

    else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']+=1;
        winner = DEALER;
    }

    else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']+=1;
    }

    console.log("Winner is ", winner);

    return winner;
}

function showResult(winner){

    if(blackjackGame['turnsOver'] === true){

        let message,messageColor;

        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = "You Win";
            messageColor = "green";
            winSound.play();
        }
    
        else if(winner === DEALER){
            document.querySelector('#draws').textContent = blackjackGame['losses'];
            message = "You Lose";
            messageColor = "red";
            lossSound.play();
        }
    
        else{
            document.querySelector('#losses').textContent = blackjackGame['draws'];
            message = "You Drew";
            messageColor = "black";
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;

    }

}