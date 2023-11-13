var gameState = 0;
var totalComputerCards = [];
var totalPlayerCards = [];
var playerName = "";
var nameEntered = false;

var getResults = function (totalCards) {
  var cardResult = [];
  for (var index = 0; index < totalCards.length; index += 1) {
    if (totalCards[index].rank === 1) {
      cardResult.push(11);
    } else if (
      totalCards[index].rank === 11 ||
      totalCards[index].rank === 12 ||
      totalCards[index].rank === 13
    ) {
      cardResult.push(10);
    } else {
      cardResult.push(totalCards[index].rank);
    }
  }
  var totalResult = [0, 0];
  for (var index = 0; index < cardResult.length; index += 1) {
    if (cardResult[index] === 11) {
      totalResult[0] += cardResult[index];
      totalResult[1] += 1;
    } else {
      totalResult[0] += cardResult[index];
      totalResult[1] += cardResult[index];
    }
  }

  return totalResult;
};

var makeDeck = function () {
  var cardDeck = [];

  var suits = ["hearts ♥️", "diamonds ♦️", "clubs ♣️", "spades ♠️"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName === 1) {
        cardName = "Ace";
      } else if (cardName === 11) {
        cardName = "Jack";
      } else if (cardName === 12) {
        cardName = "Queen";
      } else if (cardName === 13) {
        cardName = "King";
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }

  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }

  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffledDeck = makeDeck();

var displayPlayerCardsValue = function () {
  var playerResults = "";
  for (var index = 0; index < totalPlayerCards.length; index += 1) {
    playerResults +=
      totalPlayerCards[index].name +
      " of " +
      totalPlayerCards[index].suit +
      "<br>";
  }
  return playerResults;
};

var displayCompCardsValue = function () {
  var computerResults = "";
  for (var index = 0; index < totalComputerCards.length; index += 1) {
    computerResults +=
      totalComputerCards[index].name +
      " of " +
      totalComputerCards[index].suit +
      "<br>";
  }
  return computerResults;
};

var gameResults = function (compCard, playerCard) {
  return (
    " 🖥️ Computer drew: <br>" +
    compCard +
    "<br>Total score: " +
    checkResults(getResults(totalComputerCards)) +
    "<br><br>☠️☠️☠️<br><br> 👨 You drew: <br>" +
    playerCard +
    "<br>Total score: " +
    checkResults(getResults(totalPlayerCards))
  );
};
var checkResults = function (results) {
  return results[0] === results[1]
    ? results[0]
    : results[0] + " or " + results[1];
};
var getGreaterResult = function (results) {
  var greatest = 0;

  for (var index = 0; index < results.length; index++) {
    if (greatest > 21) {
      greatest = results[index];
    }
    if (results[index] > greatest) {
      greatest = results[index];
    }
  }
  return greatest;
};
var setPlayerName = function (name) {
  playerName = name;
  nameEntered = true;

  // Change the input placeholder
  var nameInput = document.querySelector("#input-field");
  nameInput.placeholder = "Type 'deal' to play the game";
};
var main = function (input) {
  if (!nameEntered) {
    // If the name hasn't been entered, set the player's name
    playerName = input;
    nameEntered = true;
    setPlayerName(playerName);
    return "Hi " + playerName + ", Type 'deal' to play game!";
  }
  if (gameState === 0 && input != "deal") {
    return "Error, I said type 'deal' to draw your cards!";
  }
  if (gameState === 0 && input === "deal") {
    var nameInput = document.querySelector("#input-field");
    nameInput.placeholder =
      'look at your results and choose wisely, type "hit" or "stand"';
    gameState = 1;
    gameState = 1;
    var showComputerCards = function () {
      totalComputerCards.push(shuffledDeck.pop(), shuffledDeck.pop());
    };
    var showPlayerCards = function () {
      totalPlayerCards.push(shuffledDeck.pop(), shuffledDeck.pop());
    };

    if (gameState != 0 && input === "deal") {
    }
    showComputerCards();
    showPlayerCards();
  }

  if (input === "hit" || totalPlayerCards < 17) {
    gameState = 2;
    var drawNewCardforPlayer = function () {
      totalPlayerCards.push(shuffledDeck.pop());
    };

    drawNewCardforPlayer();
  }

  if ((gameState === 1 || gameState === 2) && input === "stand") {
    while (getGreaterResult(getResults(totalComputerCards)) <= 16) {
      var drawNewCardforComputer = function () {
        totalComputerCards.push(shuffledDeck.pop());
      };
      drawNewCardforComputer();
    }

    var highestPlayerResult = getGreaterResult(getResults(totalPlayerCards));
    var highestComputerResult = getGreaterResult(
      getResults(totalComputerCards)
    );
    gameState === 5;
    if (highestComputerResult > 21 && !(highestPlayerResult > 21)) {
      return (
        gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
        "<br><br>Computer busted. you win! Type 'reset' to play again."
      );
    }
    if (highestPlayerResult > 21 && !(highestComputerResult > 21)) {
      return (
        gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
        "<br><br>You've busted. computer wins! Type 'reset' to play again."
      );
    }
    if (highestComputerResult > 21 && highestPlayerResult > 21) {
      return (
        gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
        "<br><br>Both busted! Type 'reset' to play again."
      );
    }
    if (highestComputerResult === highestPlayerResult) {
      return (
        gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
        "<br><br>It's a stand-off! Type 'reset' to play again."
      );
    }
    if (highestComputerResult > highestPlayerResult) {
      return (
        gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
        "<br><br>Computer wins! Type 'reset' to play again."
      );
    }
    if (highestPlayerResult > highestComputerResult) {
      return (
        gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
        "<br><br>You win! Type 'reset' to play again."
      );
    }
  }

  if (input === "reset") {
    gameState = 0;
    var reset = function () {
      totalComputerCards = [];
      totalPlayerCards = [];
    };
    reset();
    return "You've just reset the game! Afraid of losing? Type 'deal' to play again";
  }

  return (
    gameResults(displayCompCardsValue(), displayPlayerCardsValue()) +
    "<br><br>Choose wisely!."
  );
};
