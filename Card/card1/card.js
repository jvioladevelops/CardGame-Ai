var cards = ["1/11","1/11","1/11","1/11", "2","2","2","2", "3", "3","3","3", "4","4","4","4", "5","5","5","5", "6","6","6","6", "7","7","7","7", "8","8","8","8", "9","9","9","9", "10","10","10","10","10","10","10","10","10","10","10","10","10","10","W","W"];
var deck = new Array();
var totalCountSpan = 52;






function getDeck()
{
    var deck = new Array();
    
		for(var x = 0; x < cards.length; x++)
		{
			var card = {Value: cards[x]};
			deck.push(card);
		}


	return deck;
}


function renderDeck()
{
	document.getElementById('deck').innerHTML = '';
	for(var i = 0; i < deck.length; i++)
	{
		var card = document.createElement("button");
		var value = document.createElement("button");
		card.className = "card";
		value.className = "value";

		value.innerHTML = deck[i].Value;
		card.appendChild(value);

        var clicker = document.getElementById("deck").appendChild(card);
        clicker.onclick = function() {
            console.log(Value);
        }
        
	}
}

function renderCount() {
    //var clicker = document.getElementById("deck");
    //clicker.onclick = function() {
     //   console.log(card);
    //}


    //clicker.addEventListener('click', function(event) {
    //totalCountSpan - 1;
    


    //speedSpan = select('#totalcount');

//    });
    //console.log(clicker);
    //console.log(totalCountSpan);
}

function load()
{
	deck = getDeck();
    renderDeck();
    renderCount();
}

window.onload = load;
                