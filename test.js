/**
 * Tests for the user-generated code go here. These are the properties
 * that we want to look for and give hints about.
*/

function apply_tests(text) {
    /**
     * text :: Javascript string
     * return :: { passes: boolean,
     *             message: string }
     */
    try {
        var tree = parseText(text);
    } catch(err) {
        return {
            passes: false,
            message: 'Syntax error.'
        };
    }
    if (! hasNode(tree, 'ForStatement')) {
        return {
            passes: false,
            message: 'You need to add a for statement.'
        };
    }
    if (! nestedIn(tree, 'VariableDeclaration', 'ForStatement')) {
        return {
            passes: false,
            message: 'Your solution needs a variable declaration inside the for statement.'
        };
    }
    if (hasNode(tree, 'WhileStatement')) {
        return {
            passes: false,
            message: 'Your solution may not use a while loop.'
        };
    }
    if (hasNode(tree, 'IfStatement')) {
        return {
            passes: false,
            message: 'Your solution may not contain an if statement.'
        };
    }
    return {
        passes: true,
        message: 'All tests passed.'
    };
}
