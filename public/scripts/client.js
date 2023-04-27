/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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
    const timestamp = timeago.format(tweetData.created_at);
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
      <p class="timestamp">${timestamp}</p>
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

  // fetch data from /tweets
  function loadTweets() {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
      dataType: "json",
    }.then((tweets) => {
      console.log('tweets: ', tweets);
      renderTweets(tweets);
    })
    );
  }
  loadTweets();
});
