/**
 * The API presents some helper functions for test.js to use:
 * assertHas
 * assertHasNot
 * assertNestedIn
 */

var cached_text = '';
var cached_tree = null;


////////////////////// PUBLIC FUNCTIONS /////////////////////////////

function has(text, feature) {
    /**
     * text :: JavaScript string
     * feature :: string
     * return :: { passes: boolean,
     *             message: string }
     */
    try {
	var tree = parseText(text);
    } catch(err) {
	return {
	    passes: false,
	    message: "Syntax error."
	};
    }

    success = subtreeHas(tree, feature);

    if (success) {
	return {
	    passes: success,
	    message: "Good."
	};
    } else {
	return {
	    passes: success,
	    message: "Does not contain " + feature + "."
	};
    }
}

function hasNot(text, feature) {
    /**
     * text :: JavaScript string
     * feature :: string
     * return :: { passes: boolean,
     *             message: string }
     */
    try {
	var tree = parseText(text);
    } catch(err) {
	return {
	    passes: false,
	    message: "Syntax error."
	};
    }

    success = !subtreeHas(tree, feature);

    if (success) {
	return {
	    passes: success,
	    message: "Good."
	};
    } else {
	return {
	    passes: success,
	    message: "Contain " + feature + "."
	};
    }
}

function nestedIn(text, innerFeature, outerFeature) {
    /**
     * text :: JavaScript string
     * feature :: string
     * return :: { passes: boolean,
     *             message: string }
     */
    try {
	var tree = parseText(text);
    } catch(err) {
	return {
	    passes: false,
	    message: "Syntax error."
	};
    }
    // TODO
    return {
	passes: true,
	message: ""
    };
}

////////////////////// PRIVATE FUNCTIONS /////////////////////////////

function parseText(text) {
    /**
     * Use Esprima to parse the text. If the text has been parsed
     * recently, use the cached parse result instead of calling
     * Esprima again.
     * text :: JavaScript string
     * tree :: JavaScript AST, as per the Mozilla Parser API
     */


    if (cached_tree === null || cached_text != text) {
	var tree = esprima.parse(text);
	cached_tree = tree;
	cached_text = text; //TODO: Possible concurency issue if globals are updated concurrently -- need to lock tree, lock text
	console.log("Tree recomputed"); //TODO delete this
	return tree;
    }
    else {
	console.log("Tree cached"); //TODO delete this
	return cached_tree;
    }
}

function subtreeHas(tree, feature) {
    /**
     * tree :: JavaScript AST, as per Mozilla Parser API
     * return :: true if tree contains something of type
     */
    if (tree.type == feature) {
	return true;
    }
    for (subtree in tree.body) {
    // TODO: not all node types have a body
	if (subtreeHas(subtree, feature)) {
	    return true;
	}
    }
    return false;
}
