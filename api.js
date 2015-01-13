/**
 * The API presents some helper functions for test.js to use.
 */


////////////////////// PUBLIC FUNCTIONS /////////////////////////////

function parseText(text) {
    /**
     * Use Esprima to parse the text.
     * text :: JavaScript string
     * tree :: JavaScript AST, as per the Mozilla Parser API
     */
    return esprima.parse(text);
}

function hasNode(tree, feature) {
    /**
     * tree :: JavaScript AST, as per the Mozilla Parser API
     * feature :: string
     * return :: boolean
     */
    return subtreeHasNode(tree, feature);
}

function nestedIn(tree, innerFeature, outerFeature) {
    /**
     * tree :: JavaScript AST, as per the Mozilla Parser API
     * feature :: string
     * return :: { passes: boolean,
     *             message: string }
     */
    // TODO
    return true;
}

////////////////////// PRIVATE FUNCTIONS /////////////////////////////


function subtreeHasNode(tree, feature) {
    /**
     * tree :: JavaScript AST, as per Mozilla Parser API
     * return :: true if tree contains something of type
     */
    if (tree.type == feature) {
	return true;
    }
    
    function checkSubtrees(subtrees) {
	//$.each should work in IE8, unlike foreach
	$.each(subtrees, function(index, subtree) {
	    if (subtreeHasNode(subtree, feature)) {
		return true;
	    }
	});
    }

    if (tree.type == 'Program') {
	if (checkSubtrees(tree.body)) {return true;}
    }
    if (tree.type == 'Function') {
	if (checkSubtrees(tree.body)) {return true;}
	//TODO this check
    }
    //TODO more checks
	
    return false;
}
