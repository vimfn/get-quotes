const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newquote');
const loader = document.getElementsByClassName('loader');

// Show Loading 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoading() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}



// Quote from our API -> http://api.forismatic.com/api/1.0/
// async ensures that the function returns a promise, and wraps non-promises in it before getting executed.

async function getQuote() {
    loading();
    const proxyUrl = 'https://jacinto-cors-proxy.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // console.log(data);
        // if Author Blank add 'Unknow'
        if (data.quoteAuthor === '') {
            quoteAuthor.innerText = '~ Unknown'
        } else {
            quoteAuthor.innerText = '~ ' + data.quoteAuthor;
        }
        // Reduce Font Size
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote
        hideLoading();
    } catch (error) {
        getQuote();
        // console.log('Cant get any quote :(', error)
    }

}

// Tweet Quote
function quoteTweet() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Added event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', quoteTweet);
// After Load
getQuote();
