/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
console.log('hello');
// Test / driver code (temporary). Eventually will get this from the server.
//database
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

$(document).ready(function() {


  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    // loops through tweets
    for (const t of tweets) {
      let $tweet = createTweetElement(t);
      $('#tweets-container').prepend($tweet);
    }
  };

  const createTweetElement = function(tweetData) {
    const $tweet = $(`
  <article class="tweet">
    <header>
      <span>
        <img src="${tweetData["user"].avatars}">
        <p> ${tweetData["user"].name} </p>
        </span>
        <p>${tweetData["user"].handle}</p>
    </header>
    <div class="tweet-content">
      <p>${tweetData["content"].text} </p>
    </div>
    <footer>
      <p class="date">${Math.floor((Date.now() - tweetData["created_at"]) / (60 * 60 * 24 * 1000))} days ago</p>
      <div class="icon-container">
        <i class="fa-solid fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);

    return $tweet;
  };

  const fetchTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).then((data) => {
      renderTweets(data);
    });
  };
  fetchTweets();


  // form from the DOM
  const $form = $('#new-tweet-form');
  $form.on('submit', (event) => {
    event.preventDefault();
    console.log('Form has submitted.');
    const data = $form.serialize();
    console.log(data);

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: data
    }).then(() => {
      console.log('request has resolved');
      fetchTweets();
    });
  });

  // $('#tweets-container').append($tweet);

  // const $tweet = createTweetElement(tweetData);
  // console.log($tweet);

  // renderTweets(data);
});
