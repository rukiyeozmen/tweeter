/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const maxTweetLength = 140;
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
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
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
      <p>${escape(tweetData["content"].text)} </p>
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

  const $form = $('#new-tweet-form');
  $form.on('submit', (event) => {
    event.preventDefault();
    const $tweetText = $('#tweet-text');
    const tweetContent = $tweetText.val().trim();
    if (!tweetContent) {
      $('#error-message').text('Tweet content cannot be empty.').slideDown();
      return false;
    }
    if (tweetContent.length > maxTweetLength) {
      $('#error-message').text(`Error: tweet content is too long (max ${maxTweetLength} characters).`).slideDown();
      return false;
    }
    const data = $form.serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: data
    }).then(() => {
      fetchTweets();
      $tweetText.val('');
    });
  });

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
    }).then((tweets) => {
      console.log('tweets: ', tweets);
      renderTweets(tweets);
    });
  }
  loadTweets();
});
