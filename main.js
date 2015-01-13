$(document).ready(function() {

    // For the text editor
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

    // This check from http://stackoverflow.com/questions/2388629/
    $('#editor').on('input propertychange paste', function() {
	/**
	 * Keep the error message up-to-date based on the code the
	 * user has typed in so far, by running the tests and fetching
	 * the result.
	 */
	var user_text = editor.getValue();
	result = apply_tests(user_text);
	update_message(result.passes, result.message);
    });
});



