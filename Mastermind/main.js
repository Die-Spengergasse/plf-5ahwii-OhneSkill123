"use strict";
class Main {
    master = null;
    guesses = null;

    domMasterField = null;
    domGuessesField = null;
    domNotifyBox = null;

    constructor(master, guesses, notify) {
        this.domMasterField = master;
        this.domGuessesField = guesses;
        this.domNotifyBox = notify;
    }

    newGame() {
        this.initMaster();
        this.domNotifyBox.value = "";
        this.notify("Neues Spiel gestartet");
        this.initGuesses();
    }

    initGuesses() {
        this.domGuessesField.innerHTML = "";

        this.guesses = [new Guess(this, this.master.getPossibilities())];
        this.domGuessesField.prepend(this.guesses[0].domObj);
    }

    initMaster() {
        this.domMasterField.innerHTML = "";

        this.master = new Master(this);
        this.domMasterField.appendChild(this.master.domObj);
    }

    prependGuess() {
        let guess = new Guess(
            this,
            this.guesses[this.guesses.length - 1].getPossibilities()
        );
        this.guesses.push(guess);
        this.domGuessesField.prepend(
            this.guesses[this.guesses.length - 1].domObj
        );
    }

    prependWin() {
        this.guesses.push(new RowWin(this));
        this.domGuessesField.prepend(
            this.guesses[this.guesses.length - 1].domObj
        );
    }
    notify() {
        let t = new Date().toLocaleTimeString();
        for (let i = 0; i < arguments.length; i++) {
            this.domNotifyBox.value =
                `${t}: ${arguments[i]}\n` + this.domNotifyBox.value;
        }
    }

    startComputerGuessMode() {
    this.domGuessesField.innerHTML = "";
    this.domNotifyBox.value = "";
    this.notify("Computer Guess Mode gestartet");
    this.notify("Denke dir einen Code aus und bewerte die Versuche des Computers");
    
    let allPossibilities = [];
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            for (let k = 0; k < 6; k++) {
                for (let l = 0; l < 6; l++) {
                    allPossibilities.push([i, j, k, l]);
                }
            }
        }
    }
    
    this.guesses = [new ComputerGuess(this, allPossibilities)];
    this.domGuessesField.prepend(this.guesses[0].domObj);
}

prependComputerGuess() {
    let guess = new ComputerGuess(
        this,
        this.guesses[this.guesses.length - 1].getPossibilities()
    );
    this.guesses.push(guess);
    this.domGuessesField.prepend(
        this.guesses[this.guesses.length - 1].domObj
    );
}

}

