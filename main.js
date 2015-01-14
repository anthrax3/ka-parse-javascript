/**
 * Set up the code editor. set up the tests to run whenever the code
 * editor is updated. Update the message box with the test results.
 */

$(document).ready(function() {

    // For the text editor.
    // This snippet from http://ace.c9.io/#nav=embedding
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().setUseWorker(false);

    function update_message(success, message) {
        /**
         * success :: boolean
         * message :: string
         * return :: Nothing; as a side effect, changes error message
         */
        if (success) {
            $('.success').html(message);
            $('.failure').html("");
        } else {
            $('.failure').html(message);
            $('.success').html("");
        }
    }

    function runTests() {
        /**
         * Keep the error message up-to-date based on the code the
         * user has typed in so far, by running the tests and fetching
         * the result.
         */
        var user_text = editor.getValue();
        var result = apply_tests(user_text);
        update_message(result.passes, result.message);
    }

    // For small user inputs, this doesn't lag. If larger user inputs
    // are expected, consider making this change to use a setInterval
    // only when the user input is too large.
    editor.getSession().on('change', runTests);
    
    runTests();

});



