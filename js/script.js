// Declare variables
const inProgress = true
const body = document.querySelector('body')
const notice = document.getElementById('notice')
const numberInput = document.getElementById('number')
const submitGuess = document.getElementById('guess')
const clue = document.getElementById('clue')
const hiddenNumberBox = document.getElementById('hidden-number')
const numberOfTries = document.getElementById('tries')
let hiddenNumber
let guessedNumber
let isCorrect

// Window onload
window.onload = event => {

    // Project in progress... notice
    // ( inProgress == true ) ? alert('This mini-project is still ongoing... not complete yet! 😄') : null

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
        notice.textContent = `You did not get it right! Try again! ❌`
        notice.dataset.correct = 'false'
    }

}

// Handle result
function handleResult() {

    if ( isCorrect ) {

        hiddenNumberBox.innerHTML = `<div class="text-green">${hiddenNumber}</div>`
        
        setTimeout(() => {
            ( confirm('Congratulations! You won! 🥳 Want to try again?') ) && location.reload()
        }, 2500);

    } else {

        hiddenNumberBox.innerHTML = '<div class="text-red">X</div>'

        setTimeout(() => {
            hiddenNumberBox.innerHTML = `?`
            notice.style.display = 'none'
            notice.setAttribute( 'aria-hidden', 'true' );
            ( notice.hasAttribute('data-correct') ) && notice.removeAttribute( 'data-correct' )
        }, 2500);

        reduceTries()

    }

}

// Reduce tries after every mistake
function reduceTries() {
    const howManyTries = parseInt( numberOfTries.textContent )
    numberOfTries.textContent = howManyTries - 1;
    ( numberOfTries.textContent == 0 ) && alert(`You lost! 😥 You have finished all your 5 tries. The hidden number is: ${hiddenNumber}. Better luck next time! 💪`)
}