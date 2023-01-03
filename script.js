//Quotes
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

//List of words
var words = [];

//Index of the word currently being typed
var wordIndex = 0;

//starting time
var startingTime = Date.now();


//page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const startBtn = document.getElementById('start');
const elapsedTimeElement = document.getElementById('elapsed-time')

startBtn.addEventListener('click',  () => {
    //select a quote randomly
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
     
    words = quote.split(' ');
    wordIndex = 0;

    const spanWords = words.map(function (word) { return `<span>${word} </span>` });

    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';

    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler

    // Start the timer
    startingTime = new Date().getTime();
});

typedValueElement.addEventListener('input', () => {
    // Get the current word
    const currentWord = words[wordIndex];
    // get the current value
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        // end of sentence
        // Display success
        const elapsedTime = new Date().getTime() - startingTime;
        const message = `You finished in ${elapsedTime / 1000} seconds.`;
        messageElement.innerText = message;
        elapsedTimeElement.innerText = elapsedTime / 1000;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        // clear the typedValueElement for the new word
        typedValueElement.value = '';
        // move to the next word
        wordIndex++;
        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        // highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        // currently correct
        // highlight the next word
        typedValueElement.className = '';
    } else {
        // error state
        typedValueElement.className = 'error';
    }
});