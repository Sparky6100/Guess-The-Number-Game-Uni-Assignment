let random;
let maxTurns;
const guessesArray = [];

document.getElementById("startbutton").disabled = true;


document.getElementById('startbutton').addEventListener('click', function() {
    document.getElementById('style1').style.display = 'none';
    document.getElementById('style2').style.display = 'block';
    document.getElementById('style3').style.display = 'block';
    document.getElementById('style4').style.display = 'block';
});

function numberClicked() {
    document.getElementById('startbutton').disabled = false;
    let guessesLeft = maxTurns - guessesArray.length;
    document.getElementById("startbutton").disabled = false;
    if (document.getElementById('number10').checked) {
        whichOne = 10;
        maxTurns = 3;
        random = Math.floor((Math.random() * 10) + 1);
    } else if (document.getElementById('number100').checked) {
        whichOne = 100;
        maxTurns = 7;
        random = Math.floor((Math.random() * 100) + 1);
    } else if (document.getElementById('number1000').checked) {
        whichOne = 1000;
        maxTurns = 10;
        random = Math.floor((Math.random() * 1000) + 1);
    }
    document.getElementById('num').innerHTML = whichOne;
    guessesArray.length = 0;
    guessesRemaining();
    updateAttempts();
}

function guessesRemaining() {
    let guessesLeft = maxTurns - guessesArray.length;
    document.getElementById('guessesLeft').textContent = guessesLeft;
}

function updateAttempts() {
    document.getElementById('attempts').textContent = guessesArray.length.toString();
}

document.getElementById('number10').addEventListener('click', numberClicked);
document.getElementById('number100').addEventListener('click', numberClicked);
document.getElementById('number1000').addEventListener('click', numberClicked);

function displayGuesses() {
    const guessesList = document.getElementById('guessesDisplay');
    guessesList.innerHTML = '';
    guessesArray.forEach(function(guess) {
        let li = document.createElement('li');
        li.textContent = guess;
        
        if (parseInt(guess) < random) {
            li.classList.add('tooLow'); 
        } 
        else if (parseInt(guess) > random) {
            li.classList.add('tooHigh'); 
        }
        else{
            li.classList.add('correct');
        }

        guessesList.appendChild(li);
    }
    );
    updateAttempts();
}


document.getElementById('submitbutton').addEventListener('click', function() {
    let guess = document.getElementById('guess').value;
    let intGuess = parseInt(guess);

    // Check if the guess is a valid number within the range
    if (isNaN(intGuess)) {
        document.getElementById('result').textContent = 'Please enter a valid number.';
        document.getElementById('result').className = 'error'; 
        return;
    } else if (intGuess < 1 || intGuess > whichOne) {
        document.getElementById('result').textContent = 'Please enter a number within the chosen range.';
        document.getElementById('result').className = 'error';
        return;
    } else {
        document.getElementById('result').textContent = ''; 
        document.getElementById('result').className = ''; 
    }

    guessesArray.push(intGuess);
    guessesRemaining();
    displayGuesses();
    document.getElementById('attempts').textContent = guessesArray.length;

    // Check if the game should end
    if (guessesArray.length >= maxTurns) {
        if (intGuess != random) {
            document.getElementById('result').textContent = 'No more guesses left.';
            document.getElementById('result').className = 'error';
            document.getElementById('submitbutton').disabled = true; 
            document.getElementById('style6').style.display = 'block';
            return; 
        }
    }

    // Check if the guess is too low, too high, or correct
    if (intGuess < random) {
        document.getElementById('result').textContent = 'Too low';
        document.getElementById('result').classList.add('tooLow');
    } else if (intGuess > random) {
        document.getElementById('result').textContent = 'Too high';
        document.getElementById('result').classList.add('tooHigh');
    } else if (intGuess == random) {
        document.getElementById('result').textContent = 'You guessed it!';
        document.getElementById('result').classList.add('correct');
        document.getElementById('submitbutton').disabled = true; // Disable the submit button
        document.getElementById('style5').style.display = 'block';
    }

});

// Restart the game at any time
document.getElementById('restartbutton').addEventListener('click', function() {
    location.reload();
});
