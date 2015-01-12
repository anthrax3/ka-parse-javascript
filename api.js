/**
 * The API presents some helper functions for test.js to use:
 * assertHas
 * assertHasNot
 * assertNestedIn
 */

var cached_text = '';
var cached_tree = null;

function parseText(text) {
    /**
     * Use Esprima to parse the text. If the text has been parsed recently,
     * use the cached parse result instead of calling Esprima again.
     * text :: JavaScript string
     * tree :: JavaScript AST, as per the Mozilla Parser API
     */
    if (cached_tree == null || cached_text != text) {
	var tree = esprima.parse(tree);
	cached_tree = tree;
	return tree;
    }
    else {
	return cached_tree;
    }
}

function assertHas(text, feature) {
    /**
     * text :: JavaScript string
     * feature :: string
     * return :: boolean
     */
    var tree = parseText(text);

}

function assertHasNot(text, feature) {
    /**
     * text :: JavaScript string
     * feature :: string
     * return :: boolean
     */
    var tree = parseText(text);

}

function assertNestedIn(text, innerFeature, outerFeature) {
    /**
     * text :: JavaScript string
     * feature :: string
     * return :: boolean
     */
    var tree = parseText(text);

}
