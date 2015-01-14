/**
 * The API presents some helper functions for test.js to use.
 */


////////////////////// PUBLIC FUNCTIONS /////////////////////////////

function parseText(text) {
    /**
     * Use Esprima to parse the text.
     * If the text is not valid JavaScript, throw an error.
     * text :: JavaScript string
     * tree :: root of a JavaScript AST, as per the Mozilla Parser API
     */
    return esprima.parse(text);
}

function hasNode(tree, feature) {
    /**
     * tree :: root of a JavaScript AST, as per the Mozilla Parser API
     * feature :: string -- e.g. 'ForStatement'
     * return :: boolean
     */
    return findSubtreeWithFeature(tree, feature).exists;
}

function nestedIn(tree, innerFeature, outerFeature) {
    /**
     * tree :: root of a JavaScript AST, as per the Mozilla Parser API
     * outerFeature :: string
     * return :: boolean
     */
    var outerFeatureResults = findSubtreeWithFeature(tree, outerFeature);
    if (outerFeatureResults.exists) {
	var subtree = outerFeatureResults.subtree;
	var innerFeatureResults = findSubtreeWithFeature(subtree, innerFeature);
	if (innerFeatureResults.exists) {
	    return true;
	} else {
	    return false;
	}
    } else {
	return false;
    }
    
}

////////////////////// PRIVATE FUNCTIONS /////////////////////////////

function findSubtreeWithFeature(tree, feature) {
    /**
     * For finding a subtree-node with type `feature` in an AST.
     * tree :: root Node of a JavaScript AST, as per Mozilla Parser API, *or* null
     * return :: { exists: boolean --
                           true if tree contains feature as a Statement within it
	           subtree: root Node of a JavaScript AST subtree }
     */
    if (tree === null || tree === undefined || !tree.type) {
        return {
	    exists: false,
	    subtree: null
	};
    }
    if (tree.type == feature) {
        return {
	    exists: true,
	    subtree: tree
	};
    }
    function checkSubtrees(subtrees) {
	var output = {
	    exists: false,
	    subtree: null
	};
        //$.each should work in IE8, unlike foreach
        $.each(subtrees, function(index, subtree) {
	    var subtreeResults = findSubtreeWithFeature(subtree, feature);
	    if (subtreeResults.exists) {
		output = subtreeResults;
	    }
        });
        return output;
    }

    // return true if any in subtrees, false otherwise
    return checkSubtrees(children(tree));
}

function children(tree) {
    /**
     * For AST traversal.
     * tree :: root of a JavaScript AST, as per Mozilla Parser API
     * return :: array containing all sub-trees of this tree
     *           that are statements AND/OR expressions, with some null entries OK
     */

    // Written while referring to
    // developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
    // Ignores all of the SpiderMonkey-specific features.

    switch(tree.type) {
        case esprima.Syntax.Program:
            return tree.body;
        case esprima.Syntax.EmptyStatement:
            return [];
        case esprima.Syntax.BlockStatement:
            return tree.body;
        case esprima.Syntax.ExpressionStatement:
            return [tree.expression];
        case esprima.Syntax.IfStatement:
            return [tree.test, tree.consequent, tree.alternate];
        case esprima.Syntax.LabeledStatement:
            return [tree.body];
        case esprima.Syntax.BreakStatement:
            return [];
        case esprima.Syntax.ContinueStatement:
            return [];
        case esprima.Syntax.WithStatement:
            return tree.body.concat([tree.object]);
        case esprima.Syntax.SwitchStatement:
            return tree.cases.concat([tree.discriminant]);
        case esprima.Syntax.ReturnStatement:
            return [tree.argument];
        case esprima.Syntax.ThrowStatement:
            return [tree.argument];
        case esprima.Syntax.TryStatement:
            // The Mozilla spec has tree.handler, a single element, but Esprima
            // uses tree.handlers, an array of statements.
            return tree.guardedHandlers.concat(tree.handlers).concat([tree.block, tree.finalizer]);
        case esprima.Syntax.WhileStatement:
             return [tree.body, tree.test];
        case esprima.Syntax.DoWhileStatement:
            return [tree.body, tree.test];
        case esprima.Syntax.ForStatement:
            return [tree.init, tree.test, tree.update, tree.body];
        case esprima.Syntax.ForInStatement:
            return [tree.left, tree.right, tree.body];
        case esprima.Syntax.ForOfStatement:
            return [tree.left, tree.right, tree.body];
        case esprima.Syntax.DebuggerStatement:
            return [];
        case esprima.Syntax.FunctionDeclaration:
            return [tree.body].concat(tree.defaults).concat(tree.params);
        case esprima.Syntax.VariableDeclaration:
            return tree.declarations;
	case esprima.Syntax.VariableDeclarator:
            return [tree.id, tree.init];
	case esprima.Syntax.ThisExpression:
	    return [];
	case esprima.Syntax.ArrayExpression:
	    return tree.elements;
	case esprima.Syntax.ObjectExpression:
	    return tree.properties;
        case esprima.Syntax.FunctionExpression:
            return [tree.body].concat(tree.defaults).concat(tree.params);
	case esprima.Syntax.ArrowExpression:
	    return tree.params.concat(tree.defaults).concat([tree.body]);
	case esprima.Syntax.SequenceExpression:
	    return tree.expressions;
	case esprima.Syntax.UnaryExpression:
	    return tree.argument;
	case esprima.Syntax.BinaryExpression:
	    return [tree.left, tree.right];
	case esprima.Syntax.AssignmentExpression:
	    return [tree.left, tree.right];
	case esprima.Syntax.UpdateExpression:
	    return [tree.argument];
	case esprima.Syntax.LogicalExpression:
	    return [tree.left, tree.right];
	case esprima.Syntax.ConditionalExpression:
	    return [tree.test, tree.alternate, tree.consequent];
	case esprima.Syntax.NewExpression:
	    return [tree.callee].concat(tree.arguments);
	case esprima.Syntax.CallExpression:
	    return [tree.callee].concat(tree.arguments);
	case esprima.Syntax.MemberExpression:
	    return [tree.object, tree.property];
	case esprima.Syntax.ObjectPattern:
	    return extractExpressions(tree.properties);
	case esprima.Syntax.ArrayPattern:
	    return elements;
	case esprima.Syntax.SwitchCase:
	    return [tree.test].concat(tree.consequent);
	case esprima.Syntax.CatchClause:
	    return [tree.param, tree.guard, tree.body];
	case esprima.Syntax.Identifier:
	    return [];
	case esprima.Syntax.Literal:
	    return [];
	case esprima.Syntax.Property:
	    return [];
	default:
            console.log("Warning: case not found -- "+tree.type);
            return [];
    }
}
function extractExpressions(props) {
    /**
     * Small helper function for one of the cases above.
     * properties :: [ { key: Parser API Literal | Identifier,
     *                   value: Parser API Pattern } ]
     * return :: [ Parser API Literal | Identifier | Pattern ]
     */
    output = [];
    $.each(props, function(index, prop) {
	output.concat([prop.key, prop.value]);
    });
    return output;
}
