// Main method
$(document).ready(function() {
    
});

// Whenever the textbox is updated, update the results of the test:
//   1. Run the parser
//   2. Pass the parser results to test.js
//   3. Put the resulting message somewhere

// Also define some helper functions for test.js to use:
// assertHas
// assertHasNot
// assertIn

function apply_tests(tree) {
    // tree :: Javascript AST, as per https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
    // return :: { passes: boolean,
    //             message: string }
    
    return { passes: true, message: "All tests passed."}
}

// To-ask: To what extent should this be an API, and to what extent is the method I have chosen (Javascript function) acceptable for that?
