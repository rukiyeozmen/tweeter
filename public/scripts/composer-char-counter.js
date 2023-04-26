/*
$(document).ready(function() {
  console.log("Document is ready to be manipulated with jQuery");


 * when the textarea loses focus its triggered
  $('.new-tweet form textarea').on('blur', function() {
    console.log("Blur event triggered");
  });

  * when any key is pressed even for deleting its ttriggered
  $('.new-tweet form textarea').on('keydown', function() {
    console.log("Keydown event triggered");
  });

 * same as keydown when any key is pressed its triggered
  $('.new-tweet form textarea').on('keyup', function() {
    console.log("Keyup event triggered");
  });

  * does its job expect for when the user would paste anything on the textarea 
  $('.new-tweet form textarea').on('keypress', function() {
    console.log("Keypress event triggered");
  });

  * event is triggered when clicking outside the textarea after adding things
  $('.new-tweet form textarea').on('change', function() {
    console.log("Change event triggered");
  });

  * whenever user types or pastes something into the texarea
  $('.new-tweet form textarea').on('input', function() {
    console.log("Input event triggered with value:", $(this).val().length);
  });
});
*/
$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    const textLength = this.value.length; //length of the input text
    const counter = $(this).parent().find('.counter'); //assigns counter class to counter
    counter.text(140 - textLength); //updates count length 
    counter.toggleClass('negative', textLength > 140); // changes to red when there is more than 140 char
  });
});





