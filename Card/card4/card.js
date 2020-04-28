

// an object to hold all of the variables for the blackjack app
// to avoid global variable drama
var jsbApp = {};

// Store important elements in variables for later manipulation
jsbApp.pcards = document.getElementById('pcards');
jsbApp.row1cards = document.getElementById('row1cards');
jsbApp.row2cards = document.getElementById('row2cards');
jsbApp.row3cards = document.getElementById('row3cards');
jsbApp.row4cards = document.getElementById('row4cards');
jsbApp.hitButton = document.getElementById('hit');
jsbApp.row1Button = document.getElementById('row1');
jsbApp.row2Button = document.getElementById('row2');
jsbApp.row3Button = document.getElementById('row3');
jsbApp.row4Button = document.getElementById('row4');
jsbApp.stayButton = document.getElementById('stay');
jsbApp.playButton = document.getElementById('play');
jsbApp.textUpdates = document.getElementById('textUpdates');
jsbApp.buttonBox = document.getElementById('buttonBox');
jsbApp.phandtext = document.getElementById('phand');
jsbApp.row1text = document.getElementById('row1score');
jsbApp.row2text = document.getElementById('row2score');
jsbApp.row3text = document.getElementById('row3score');
jsbApp.row4text = document.getElementById('row4score');
jsbApp.tracker = document.getElementById('tracker');
jsbApp.newgame = document.getElementById('newgame');
jsbApp.choice = document.getElementById('choice');

// initialize variables to track hands/cards/etc.
jsbApp.playerHand = [];
jsbApp.deck = [];
jsbApp.suits = ['clubs <span class="bold">&#9827</span>', 'diamonds <span class="redcard">&#9830</span>', 'hearts <span class="redcard">&#9829</span>', 'spades <span class="bold">&#9824</span>'];
jsbApp.values = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
jsbApp.gameStatus = 0; // flag that game has not yet been won
jsbApp.wins = 0; // flag that game has not yet been won
jsbApp.draws = 0; // flag that game has not yet been won
jsbApp.losses = 0; // flag that game has not yet been won
jsbApp.games = 0; // flag that game has not yet been won




// Object Constructor for a card. !!! ALWAYS USE NEW WHEN MAKING A NEW CARD!!!
function card(suit, value, name) {
    this.suit = suit; // string of c/d/h/s
    this.value = value; // number 1 - 10
    this.name = name; // string of the full card name
};






var newGame = function () {
    jsbApp.newgame.classList.add("hidden");
    jsbApp.playerHand = [];
    jsbApp.gameStatus = 0;
    // Create the new deck
    jsbApp.deck = createDeck();
    jsbApp.buttonBox.classList.remove("hidden"); // show hit/stay buttons
    
};





var createDeck = function () {
    var deck = [];
    // loop through suits and values, building cards and adding them to the deck as you go
    for (var a = 0; a < jsbApp.suits.length; a++) {
        for (var b = 0; b < jsbApp.values.length; b++) {
            var cardValue = b + 1;
            var cardTitle = "";            
            if (cardValue > 10){
                cardValue = 10;
            }
            if (cardValue != 1) {
                cardTitle += (jsbApp.values[b] + " of " + jsbApp.suits[a] + " (" + cardValue + ")");
            }
            else
            {
                cardTitle += (jsbApp.values[b] + " of " + jsbApp.suits[a] + " (" + cardValue + " or 11)");
            }
            var newCard = new card(jsbApp.suits[a], cardValue, cardTitle);
            deck.push(newCard);
            

        }
    }
    deck = shuffle(deck);
    return deck;
};





// Update the screen with the contents of the player and dealer hands
var drawHands = function () {    
    var htmlswap = "";
    var ptotal = handTotal(jsbApp.playerHand);
    htmlswap += "<ul>";
    for (var i = 0; i < jsbApp.playerHand.length; i++)
    {
        htmlswap += "<li>" + jsbApp.playerHand[i].name + "</li>";
    }
    htmlswap += "</ul>"
    jsbApp.pcards.innerHTML = htmlswap;
    jsbApp.phandtext.innerHTML = "Your Hand (" + ptotal + ")"; // update player hand total
};





/**
 * WE technically do not need this right, but will definitely need it when making new piles
 * 
 * @param {*} hand 
 */

// return the total value of the hand 
var handTotal = function (hand) {
    var total = 0;
    var aceFlag = 0; // track the number of aces in the hand
    for (var i = 0; i < hand.length; i++) {
        //console.log("Card: " + hand[i].name);
        total += hand[i].value;
        if (hand[i].value == 1)
        {
            aceFlag += 1;
        }
    }
    // For each ace in the hand, add 10 if doing so won't cause a bust
    // To show best-possible hand value
    for (var j = 0; j < aceFlag; j++)
    {
        if (total + 10 <= 21)
        {
            total +=10;
        }
    }
       // if (total == 340){
        //newGame();
    //}
    // console.log("Total: " + total);
    return total;

}





// Shuffle the new deck
var shuffle = function (deck) {
    var shuffledDeck = [];
    var deckL = deck.length;
    for (var a = 0; a < deckL; a++)
    {
        var randomCard = getRandomInt(0, (deck.length));        
        shuffledDeck.push(deck[randomCard]);
        deck.splice(randomCard, 1);        
    }
    return shuffledDeck;
}

var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    // code based on sample from MDN
}




var victory = function () {
    jsbApp.wins += 1;
    jsbApp.games += 1;
    var explanation = "";
    jsbApp.gameStatus = 2; // flag that the game is over
    var playerTotal = handTotal(jsbApp.playerHand);
   // var dealerTotal = handTotal(jsbApp.dealerHand);
    if (playerTotal === 21)
    {
        explanation = "Your hand's value is 21!";
    }
    else
    {
        explanation = "You had " + playerTotal;
    }
    jsbApp.textUpdates.innerHTML = "You won!<br>" + explanation + "<br>Press 'New Game' to play again.";
    track();
}

var bust = function () {
    jsbApp.games += 1;
    jsbApp.losses += 1;
    var explanation = "";
    jsbApp.gameStatus = 2; // flag that the game is over
    var playerTotal = handTotal(jsbApp.playerHand);
    if (playerTotal > 21)
    {
        explanation = "You busted with " + playerTotal + ".";
    }
    jsbApp.textUpdates.innerHTML = "You lost.<br>" + explanation + "<br>Press 'New Game' to play again.";
    track();
}

var tie = function () {    
    jsbApp.games += 1;
    jsbApp.draws += 1;
    var explanation = "";
    jsbApp.gameStatus = 2; // flag that the game is over
    var playerTotal = handTotal(jsbApp.playerHand);
    jsbApp.textUpdates.innerHTML = "It's a tie at " + playerTotal + " points each.<br>Press 'New Game' to play again.";
    track();
}


// check the player hand for an ace
var softCheck = function (hand) {    
    var total = 0;
    var aceFlag = 0; // track the number of aces in the hand
    for (var i = 0; i < hand.length; i++) {
        //console.log("Card: " + hand[i].name);
        total += hand[i].value;
        if (hand[i].value == 1) {
            aceFlag += 1;
        }
    }
    // For each ace in the hand, add 10 if doing so won't cause a bust
    // To show best-possible hand value
    for (var j = 0; j < aceFlag; j++) {
        if (total + 10 <= 21) {
            return true; // the hand is soft, i.e. it can be multiple values because of aces
        }
    }    
    return false; // the hand is hard, i.e. it has only one possible value
}

jsbApp.playButton.addEventListener("click", newGame);

// Hit button pressed:
jsbApp.hitButton.addEventListener("click", function () {
    // disable if the game has already been won
    // deal a card to the player and draw the hands
    jsbApp.playerHand.push(jsbApp.deck.pop());
    drawHands();
    var handVal = handTotal(jsbApp.playerHand);
    if (handVal > 21)
    {
        return;
    }
    else if (handVal === 21)
    {
        return;
    }
    return;      
});