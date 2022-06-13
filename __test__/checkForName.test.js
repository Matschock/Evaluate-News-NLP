// Import the js file to test
import { checkForName } from '../src/client/js/nameChecker'

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the input checker functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the input check function", () => {
        // create the document for testing
        document.body.innerHTML = `<div id="results" />`;
        document.getElementById('results').innerHTML = 'test test test';
        // Define the input for the function, if any, in the form of variables/array
        const input = "The restaurant was great even though it is not near Madrid.";
        // Define the expected output, if any, in the form of variables/array
        const output = true;
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(checkForName(input)).toEqual(output);
    })
});