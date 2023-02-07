// Declare variables
const body = document.querySelector('body')
const notice = document.getElementById('notice')
const numberInput = document.getElementById('number')
const submitGuess = document.getElementById('guess')
const clue = document.getElementById('clue')
const hiddenNumberBox = document.getElementById('hidden-number')
const numberOfTries = document.getElementById('tries')
const additionalClue = document.getElementById('additional-clue')
const welcomeModal = document.getElementById('welcome-modal')
let hiddenNumber
let guessedNumber
let isCorrect

// Sounds
let winSound = new Audio('./audio/success-fanfare-trumpets-6185.mp3');
let loseSound = new Audio('./audio/080047_lose_funny_retro_video-game-80925.mp3');
let lostTrySound = new Audio('./audio/failure-drum-sound-effect-2-7184.mp3');
let entrySound = new Audio('./audio/happy-logo-version-2-13399.mp3');
let exitSound = new Audio('./audio/warm-tech-logo-21474.mp3');

// Welcome message
entrySound.playbackRate = 1.3
entrySound.play();
// ( confirm('Hi there and welcome to this mini-project: "Guess-My-Number" game! 🥳 Do you want to start?  -  Hart') == false ) && byeMessage()
welcomeModal.modal('show')

// Window onload
window.onload = event => {

    // Empty guess input field
    numberInput.value = ''

    // Generate a random number from 1000 and below
    hiddenNumber = Math.floor(Math.random() * 1001)

    // Display Clue on front-end
    displayClue()

}

// Check if guessed number and hidden number are equal
const isEqual = ( val ) => {

    if ( val == hiddenNumber ) {
        console.log('correct')
        isCorrect = true
    } else {
        console.log('wrong')
        isCorrect = false
    }

}

// When guess is submitted
submitGuess.addEventListener('click', e => {
    
    e.preventDefault()

    // Get guessed number and compare to hidden number
    guessedNumber = parseInt(numberInput.value)
    isEqual(guessedNumber)

    // Announcement
    winOrLoseAnnouncement()

    // More result handlers
    handleResult()

    // Additonal Clue
    handleAdditionalClue()

})

// Display clue
function displayClue() {

    // Generate random range
    const range1 = Math.floor(Math.random() * 23)
    const range2 = Math.floor(Math.random() * 14)
    
    // Margin or range
    const lowerMargin = hiddenNumber - range1
    const higherMargin = hiddenNumber + range2
    clue.textContent = `${ lowerMargin - 1 } to ${ higherMargin + 1 }`
    
    console.log(`between ${ hiddenNumber - range1 } & ${ hiddenNumber + range2 } | hidden number is ${hiddenNumber}`)
}

// Win or Lose announcement
function winOrLoseAnnouncement() {

    notice.style.display = ''
    notice.setAttribute( 'aria-hidden', 'false' )
    notice.setAttribute( 'data-correct', '' )

    if ( isCorrect ) {
        notice.textContent = `You got it right! 👏`
        notice.dataset.correct = 'true'
    } else {
        lostTrySound.play()
        notice.textContent = `You did not get it right! Try again! ❌`
        notice.dataset.correct = 'false'
    }

}

// Handle result
function handleResult() {

    submitGuess.setAttribute( 'disabled', '' )

    if ( isCorrect ) {

        winSound.play()
        hiddenNumberBox.innerHTML = `<div class="text-green">${hiddenNumber}</div>`
        
        setTimeout(() => {

            if ( confirm('Congratulations! You won! 🥳 Want to try again?') ) {
                location.reload()
            } else {
                byeMessage()
            }

            submitGuess.removeAttribute('disabled')

        }, 2500)

    } else {

        hiddenNumberBox.innerHTML = '<div class="text-red">X</div>'

        setTimeout(() => {
            hiddenNumberBox.innerHTML = `?`
            notice.style.display = 'none'
            notice.setAttribute( 'aria-hidden', 'true' );
            ( notice.hasAttribute('data-correct') ) && notice.removeAttribute( 'data-correct' )
            submitGuess.removeAttribute('disabled')
        }, 2500)

        reduceTries()

    }

}

// Reduce tries after every mistake
function reduceTries() {
    const howManyTries = parseInt( numberOfTries.textContent )
    numberOfTries.textContent = howManyTries - 1;
    if ( numberOfTries.textContent == 0 ) {
        loseSound.play()
        if ( confirm(`You lost! 😥 You have finished all your 5 tries. The hidden number is: ${hiddenNumber}. Do you want to try again? 💪`) ) {
            location.reload()
        } else {
            byeMessage()
        }
    }
}

// Message before leaving
function byeMessage() {
    exitSound.playbackRate = 1.25
    exitSound.play();
    const html = `
    <div class="container text-center">
        <h1 class="fw-bolder">Guess My Number!</h1>
        <h2 id="exit-message">Thanks for stopping by! 👋</h2>
        <div class="w-100 d-flex justify-content-end"><small>- Hart Pableo</small></div>
    </div>
    `
    body.setAttribute( 'class', 'd-flex flex-column justify-content-center align-items-center' )
    body.innerHTML = html
}

// Additional Clue (Higher or Lower)
function handleAdditionalClue() {
    if ( guessedNumber < hiddenNumber ) {
        additionalClue.textContent = 'Go Higher!'
    } else if ( guessedNumber > hiddenNumber ) {
        additionalClue.textContent = 'Go Lower!'
    } else {
        additionalClue.textContent = 'You got it!'
    }
}