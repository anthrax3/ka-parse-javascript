// Main method
$(document).ready(function() {
    // Whenever the textbox is updated, update the results of the test:
    //   1. Run the parser
    //   2. Pass the parser results to test.js
    //   3. Put the resulting message somewhere
    var user_text = 'var answer = 42;'; //TODO hook up textarea
    results = apply_tests(user_text);
    results.passes
    results.message
});



