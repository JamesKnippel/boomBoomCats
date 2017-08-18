module.exports = {

  seeTheFuture: function (cardPosition, cb) {
    console.log('future being seen')
    let nextThreeCards;
    if (this.state.deck.length > 3) {
      nextThreeCards = this.state.deck.slice(this.state.deck.length - 3) //FROM THE END OF THE DECK
    } else {
      nextThreeCards = this.state.deck.slice();
    }
    let nextCardsString = ''
    for (let i = nextThreeCards.length - 1; i >= 0; i--) {
      nextCardsString += ':: ' + nextThreeCards[i].name + ' :: '
    }
    this.setState({
      seeFutureCards: nextThreeCards
    }, () => {
      alert(nextCardsString)
    })
    this.discardCard(cardPosition)
    cb();
  },

  changeTheFuture: function (cardPosition, cb) {

    let order = null;

    if (this.state.deck.length > 3) {
      let nextThreeCards = this.state.deck.slice(this.state.deck.length - 3) //FROM THE END OF THE DECK
      while (order === null) {
        order = prompt('Please enter the new order for the first 3 cards e.g. 312 or 231 or etc', '123')
      }
      order = order.split('');
      let newOrder = []
      for (let i = 0; i < 3; i++) {
        newOrder.push(nextThreeCards[order.pop()]);
      }
      this.setState({
        deck: this.state.deck.slice(0, this.state.deck.length - 3).concat(newOrder)
      }, () => {
        this.discardCard(cardPosition);
        cb();
        this.endTurn();
      });

    } else if (this.state.deck.length === 1) {
      alert('There is only one card remaining so the order can\'t be changed!');
      this.discardCard(cardPosition);
      cb();
      this.endTurn();

    } else if (this.state.deck.length === 2) {
      let nextTwoCards = this.state.deck.slice();
      while (order === null) {
        order = prompt('Please enter the new order for the first 2 cards e.g. 12 or 21', '21')
      }
      order = order.split('');
      let newOrder = []
      for (let i = 0; i < 2; i++) {
        newOrder.push(nextTwoCards[order.pop()]);
      }
      this.setState({
        deck: this.state.deck.slice(0, this.state.deck.length - 3).concat(newOrder)
      }, () => {
        this.discardCard(cardPosition);
        cb();
        this.endTurn();
      });
    } else {
      console.log('Wow what went wrong here?');
      this.discardCard(cardPosition);
      cb();
    },
    attackNextPlayer: function(cardPosition, cb){ //add extra turn on first element
        let gameTurns = this.state.turn.slice()
        let myself = gameTurns[0];
        let attackedPlayerTurnIndex = 1
        console.log('attack')
        for(let i = 1; i < gameTurns.length; i++){
            if(myself !== gameTurns[i]){
                attackedPlayerTurnIndex = i;
                break;
            }
        }
        let attackedPlayer = this.state.turn.slice(attackedPlayerTurnIndex,attackedPlayerTurnIndex+1)
        gameTurns.splice( attackedPlayerTurnIndex,0, attackedPlayer[0] )
        let newTurns = gameTurns.slice()
        this.setState({
            turn: newTurns
        }, () => {
            this.discardCard(cardPosition); 
            cb();
            this.endTurn(); 
            })
    },
    skipATurn: function (cardPosition) {
        console.log('skip')
        this.discardCard(cardPosition)
        this.endTurn()
    },
    reverseTurnOrder: function (cardPosition, cb) {
        let reverseTurnOrder = this.state.turn.slice().reverse()
        let lastBecomeFirst = reverseTurnOrder.pop()
        reverseTurnOrder.unshift(lastBecomeFirst)
        this.setState({
          turn: reverseTurnOrder
        }, () => {
            this.discardCard(cardPosition);
            cb(reverseTurnOrder)
            this.endTurn();
        })
    }
  },

  shuffleDeck: function (cardPosition, cb) {

    let unshuffledDeck = this.state.deck.slice()
    let shuffledDeck = []
    console.log('shuffling');

    while (unshuffledDeck.length > 0) {
      let min = 0
      let max = unshuffledDeck.length - 1
      let randomIndex = Math.floor(Math.random() * (max - min + 1)) + min
      shuffledDeck.push(unshuffledDeck[randomIndex])
      unshuffledDeck.splice(randomIndex, 1)
    }

    this.setState({
      deck: shuffledDeck
    }, () => {
      this.discardCard(cardPosition)
      cb()
    })
  },

  attackNextPlayer: function (cardPosition, cb) { //add extra turn on first element
    let gameTurns = this.state.turn.slice()
    let myself = gameTurns[0];
    let attackedPlayerTurnIndex = 1
    console.log('attack')
    for (let i = 1; i < gameTurns.length; i++) {
      if (myself !== gameTurns[i]) {
        attackedPlayerTurnIndex = i;
        break;
      }
    }
    let attackedPlayer = this.state.turn.slice(attackedPlayerTurnIndex, attackedPlayerTurnIndex + 1)
    gameTurns.splice(attackedPlayerTurnIndex, 0, attackedPlayer[0])
    let newTurns = gameTurns.slice()
    this.setState({
      turn: newTurns
    }, () => {
      this.discardCard(cardPosition);
      cb();
      this.endTurn();
    })
  },

  skipATurn: function (cardPosition) {
    console.log('skip')
    this.discardCard(cardPosition)
    this.endTurn()
  }

}